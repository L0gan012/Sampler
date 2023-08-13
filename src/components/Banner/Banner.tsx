import React, { useContext } from "react";
import { AppContext } from "../../AppContext";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import SearchField from "../SearchField/SearchField";
import LoginButton from "../LoginButton/LoginButton";
import AccountMenu from "../AccountMenu/AccountMenu";

import './Banner.css';
import '../../index.css'

interface IBanner {
  title: string;
}

export default function Banner({ title }: IBanner) {

  const {token} = useContext(AppContext);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className="flex">
          {token !== '' ? <AccountMenu />: <LoginButton />}
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="flex-child center-text"
          >
            {title}
          </Typography>
          <SearchField />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
