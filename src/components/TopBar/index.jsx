import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import './styles.css';
import gallery from '../../images/gallery.svg';

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  const navigation = useNavigate();
  const { setIsLogin, isLogin, viewMode, setViewMode, setUserList } = useContext(UserContext);
  function logout() {
    setViewMode("");
    setUserList([]);
    localStorage.removeItem("token");
    setIsLogin(false);
    navigation("/", { replace: true });
  }


  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="toolbar">
        <Typography className="text-name">

          {localStorage.getItem('token') !== null ? "Hi " + JSON.parse(localStorage.getItem('user')).first_name + " " +
            JSON.parse(localStorage.getItem('user')).last_name : "Photo Sharing App"}
        </Typography>

        <div className="container">
          <Typography>
            {!isLogin ? "Please log in to continue" : viewMode}
          </Typography>

          {localStorage.getItem('token') &&
            <Link style={{ textDecoration: 'none' }} to={`/uploadImage`} onClick={() => {
            }}>
              <div className="button"
              >
                <img src={gallery} alt="" />
                <p>Upload new photo</p>
              </div>
            </Link>

          }
          {localStorage.getItem('token') == null &&
            <Link style={{ textDecoration: 'none' }} to={`/login`} onClick={() => {
            }}>
              <div className="button">
                Login
              </div>
            </Link>
          }

          {localStorage.getItem('token') &&
            <div className="button"
              onClick={logout}
            >
              LogOut
            </div>
          }
        </div>
      </Toolbar>
    </AppBar >
  );
}

export default TopBar;
