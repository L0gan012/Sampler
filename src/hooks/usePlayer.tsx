import { useState, useEffect } from "react";
import axios from "axios";

import { transferPlayback } from "../api/player";

export default function usePlayer(
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>
) {
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    if (token !== "") {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      //@ts-ignore
      window.onSpotifyWebPlaybackSDKReady = () => {
        //@ts-ignore
        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb: Function) => {
            try {
              cb(token);
            } catch {
              axios.get("/api/auth/refresh_token").then((response) => {
                setToken(response.data.access_token);
              });
            }
          },
          volume: 0.5,
        });

        player.addListener("ready", ({ device_id }: { device_id: string }) => {
          console.log("Ready with Device ID", device_id);
          setDeviceId(device_id);
        });

        player.addListener(
          "not_ready",
          ({ device_id }: { device_id: string }) => {
            console.log("Device ID has gone offline", device_id);
            setDeviceId("");
          }
        );

        player.connect();
      };
    }
  }, [token]);

  useEffect(() => {
    if (deviceId !== "") {
      transferPlayback(deviceId);
    }
  }, [deviceId]);
}
