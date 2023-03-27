import React, { useState, useEffect } from "react";

import authurl from "../../api/authurl";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function LoginButton() {
  const [url, setUrl] = useState();

  useEffect(() => {
    authurl().then((response) => setUrl(response));
  }, []);

  return (
    <Box className="flex-child">
      <Button variant="contained" href={url}>
        Login
      </Button>
    </Box>
  );
}
