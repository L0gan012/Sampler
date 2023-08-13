import React, { useState, useContext } from "react";
import { AppContext } from "../../AppContext";

import search from "../../api/search";

import { Typography, Box, TextField, Autocomplete } from "@mui/material";

import ITrackResult from "../../interfaces/ITrackResult";

import "./SearchField.css";
import "../../index.css";
import { playSong } from "../../api/player";

export default function SearchField() {
  const { token, setSelectedSongInfo, setIsPlaying } = useContext(AppContext);

  const [results, setResults] = useState<Array<ITrackResult>>([]);

  const handleSelectChange = (e: React.SyntheticEvent, value: any, reason: string) => {
    switch (reason) {
      case "selectOption":
        console.log(value);
        setSelectedSongInfo(value);
        playSong(value.uri);
        setIsPlaying(true);
        break;
      case "clear":
        setResults([]);
        setSelectedSongInfo(undefined);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    token !== '' && search(e.target.value, setResults);
  };

  return (
    <Box className="diff-flex flex-child">
      <Autocomplete
        sx={{width: 3/5}}
        className='flex-end'
        getOptionLabel={(option) => option.name}
        onChange={handleSelectChange}
        options={results}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            onChange={handleInputChange}
          />
        )}
        renderOption={(props, option) => {
          return (
            <Box
              {...props}
              key={option.uri}
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            >
              <img
                loading="lazy"
                width="20"
                src={option.album.images[option.album.images.length - 1].url}
                alt=""
              />
              <Typography>{`${option.name} - ${option.artists[0].name}`}</Typography>
            </Box>
          );
        }}
      />
    </Box>
  );
}
