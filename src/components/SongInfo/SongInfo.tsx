import React, { useContext } from "react";
import { AppContext } from "../../App";
import { useTheme } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import './SongInfo.css';

export default function SongInfo() {
  const { selectedSongInfo } = useContext(AppContext);

  return (
    <Card className="card">
        {selectedSongInfo && (
          <CardContent className="container">
            <Typography component="div" variant="h5">
              {selectedSongInfo.name}
            </Typography>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={selectedSongInfo.album.images[0].url}
              alt={selectedSongInfo.name}
            />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {selectedSongInfo.artists[0].name}
            </Typography>
          </CardContent>
        )}
    </Card>
  );
}
