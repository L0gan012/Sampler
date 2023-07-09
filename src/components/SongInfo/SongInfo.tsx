import React, { useContext } from "react";
import { AppContext } from "../../App";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import "./SongInfo.css";

export default function SongInfo() {
  const { selectedSongInfo } = useContext(AppContext);

  return (
    <Card className="card" sx={{padding: 1}} >
      <CardContent className="container">
        <Typography variant="h2" sx={{ fontSize: 24 }}>
          {selectedSongInfo!.name}
        </Typography>
        <CardMedia
          component="img"
          sx={{ width: "10vw", minWidth: 100, marginTop: 3 }}
          image={selectedSongInfo!.album.images[0].url}
          alt={selectedSongInfo!.name}
        />
        <Typography variant="subtitle1">
          {selectedSongInfo!.artists[0].name}
        </Typography>
      </CardContent>
    </Card>
  );
}
