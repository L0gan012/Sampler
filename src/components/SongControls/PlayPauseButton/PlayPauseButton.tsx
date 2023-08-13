import { useContext } from "react";
import { AppContext } from "../../../AppContext";

import { getDevices, pauseSong, playSong } from "../../../api/player";

import { PauseCircle, PlayCircle } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";

export default function PlayPauseButton() {
  const { isPlaying, setIsPlaying } = useContext(AppContext);

  const handleClick = async () => {
    isPlaying ? await pauseSong() : await playSong();
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const handleDeviceClick = () => {
    getDevices();
  };

  return (
    <>
      <IconButton aria-label="play-pause" onClick={handleClick}>
        {isPlaying ? <PauseCircle /> : <PlayCircle />}
      </IconButton>
      {/* <Button aria-label="play-pause" onClick={handleDeviceClick}>
        Devices
      </Button> */}
    </>
  );
}
