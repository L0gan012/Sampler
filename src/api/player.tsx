import axios from "axios";

// TODO: Make this so it can switch with any device
export function getDevices() {
  axios.get("/api/devices").then((res) => {
    transferPlayback(res.data.devices[0].id)
  });
}

export function transferPlayback(deviceId: string) {
  axios
    .put("/api/transfer_playback", {id: deviceId})
    .then((res) => {
        console.log('playback transfered to device ', deviceId);
    });
}

export async function playSong(uri?: string) {
  uri ? await axios.put("/api/play_song", {uri: uri}) : await axios.put("/api/play_song");
}

export async function pauseSong() {
  await axios.put("/api/pause_song");
};