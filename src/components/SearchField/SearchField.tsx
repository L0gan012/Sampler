import React, { useState, useContext } from "react";
import { AppContext } from "../../App";

import search from "../../api/search";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import ITrackResult from "../../interfaces/ITrackResult";

import "./SearchField.css";
import "../../index.css";

export default function SearchField() {
  const { setSelectedSongInfo } = useContext(AppContext);

  const [results, setResults] = useState<Array<ITrackResult>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    search(e.target.value, setResults);
  };

  return (
    <Box className="diff-flex flex-child">
      <Autocomplete
        sx={{width: 3/5}}
        className='flex-end'
        disableClearable
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => {
          setSelectedSongInfo(value);
        }}
        options={results}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
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
              {`${option.name} - ${option.artists[0].name}`}
            </Box>
          );
        }}
      />
    </Box>
  );
}
