import React from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function LoginButton() {
  return (
    <Box className="flex-child">
      <Button variant="contained" href={"/api/auth/login"}>
        Login
      </Button>
    </Box>
  );
}
