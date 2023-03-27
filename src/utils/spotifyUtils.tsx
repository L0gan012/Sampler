import refresh from "../api/refresh";


const LOCALSTORAGE_KEYS: {[key: string]: string} = {
    loggedIn : 'spotify_logged_in',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

const LOCALSTORAGE_VALUES = {
    loggedIn: window.localStorage.getItem(LOCALSTORAGE_KEYS.loggedIn),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

const getIsLoggedIn = () => {
    const queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.loggedIn]: urlParams.get('logged_in'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const hasError = urlParams.get('error');
    
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.loggedIn === 'undefined')
        refreshToken();
    if(LOCALSTORAGE_VALUES.loggedIn && LOCALSTORAGE_VALUES.loggedIn !== 'undefined')
        return LOCALSTORAGE_VALUES.loggedIn === 'true';
    if(queryParams[LOCALSTORAGE_KEYS.loggedIn]) {
        for(const property in queryParams){
            window.localStorage.setItem(property, queryParams[property]!);
        }
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now().toString());
        return queryParams[LOCALSTORAGE_KEYS.loggedIn] === 'true';
    }
    return false;
}

const hasTokenExpired = () => {
    const {loggedIn, timestamp, expireTime} = LOCALSTORAGE_VALUES;
    if(!loggedIn || !timestamp)
        return false;
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed/1000) > Number(expireTime);
}

const refreshToken = () => {
    try {
        if((Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000){
            console.error('No refresh token available');
            logout();
        }

        refresh().then((expiresIn) => window.localStorage.setItem(LOCALSTORAGE_KEYS.expireTime, expiresIn));
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now().toString());

        window.location.reload();

    } catch (e) {
        console.error(e);
    }
}

export const logout = () => {
    for(const propery in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[propery]);
    }
}

export const loggedIn = getIsLoggedIn();