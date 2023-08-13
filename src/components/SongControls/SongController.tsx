import PlayPauseButton from "./PlayPauseButton/PlayPauseButton";
import ProgressSlider from "./ProgressSlider/ProgressSlider";

export default function SongController() {
  return (
    <div>
      <ProgressSlider />
      <PlayPauseButton />
    </div>
  );
}
