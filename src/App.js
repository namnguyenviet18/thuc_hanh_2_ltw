import './App.css';

import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [typeDisplay, setTypeDisplay] = useState(null);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar selectedUser={selectedUser} typeDisplay={typeDisplay} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList setSelectedUser={setSelectedUser} setTypeDisplay={setTypeDisplay} />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/users/:userId"
                  element={<UserDetail setTypeDisplay={setTypeDisplay} />}
                />
                <Route
                  path="/photos/:userId"
                  element={<UserPhotos setTypeDisplay={setTypeDisplay} />}
                />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
