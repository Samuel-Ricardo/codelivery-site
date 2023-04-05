import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import {BluetoothDrive} from "@mui/icons-material"

export const Navbar:FunctionComponent = () => (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" >
          <BluetoothDrive/>
        </IconButton>
        <Typography variant="h6"></Typography>
      </Toolbar>
    </AppBar>
  )
