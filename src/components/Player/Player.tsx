import { useState, useEffect } from "react";

interface IPlayer {
    token: string;
};

export default function Player({token}: IPlayer) {

    const [player, setPlayer] = useState(undefined);
    
useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    //@ts-ignore
    window.onSpotifyWebPlaybackSDKReady = () => {

        //@ts-ignore
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: (cb: Function) => { cb(token); },
            volume: 0.5
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }: {device_id: string}) => {
            console.log('Ready with Device ID', device_id);
        });

        player.addListener('not_ready', ({ device_id }: {device_id: string}) => {
            console.log('Device ID has gone offline', device_id);
        });


        player.connect();

    };
}, []);

    return <div>Player</div>
}