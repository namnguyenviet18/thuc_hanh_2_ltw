import './App.css';

import React, { useState, createContext } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RecommendLogin from './components/Login/RecomendLogin';
import UploadImage from './components/UploadImage/UploadImage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export const UserContext = createContext();
const App = (props) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [typeDisplay, setTypeDisplay] = useState(null);

  const [lgr, setLgr] = useState(true);
  console.log("rerender");

  return (
    <Router>
      <UserContext.Provider value={{ selectedUser, setSelectedUser, setLgr, toast }}>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar selectedUser={selectedUser} typeDisplay={typeDisplay} />
            </Grid>
            <div className="main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="user-list">
                <UserList setSelectedUser={setSelectedUser} setTypeDisplay={setTypeDisplay} />
              </Paper>
            </Grid>

            <Grid item sm={9}>
              <Paper className="main-grid-item">
                {(localStorage.getItem('token') == null && lgr) && <RecommendLogin></RecommendLogin>}
                <Routes>
                  <Route
                    path="/users/:userId"
                    element={<UserDetail setTypeDisplay={setTypeDisplay} />}
                  />
                  <Route
                    path="/photos/:userId"
                    element={<UserPhotos setTypeDisplay={setTypeDisplay} />}
                  />
                  <Route
                    path="/login"
                    element={<Login />}
                  />

                  <Route
                    path="/register"
                    element={<Register />}
                  />

                  <Route
                    path="/uploadImage"
                    element={<UploadImage />}
                  />

                  <Route path="/users" element={<UserList />} />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
          <ToastContainer />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
