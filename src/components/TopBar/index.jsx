import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import models from "../../modelData/models";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ selectedUser, typeDisplay }) {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" color="inherit">
          Nguyễn Viết Nam
        </Typography>
        <Typography variant="h5" color="inherit">
          {typeDisplay != null ? typeDisplay === "user" ?
            models.userModel(selectedUser).first_name + " " + models.userModel(selectedUser).last_name : `Photo of 
          ${models.userModel(selectedUser).first_name} ${models.userModel(selectedUser).last_name}` : ""}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
