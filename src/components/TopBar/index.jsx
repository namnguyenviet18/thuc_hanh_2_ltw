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
function TopBar({ typeDisplay }) {
  const navigation = useNavigate();
  const { setLgr, selectedUser } = useContext(UserContext);
  function logout() {
    setLgr(true);
    localStorage.removeItem("token");
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
            {(typeDisplay != null && typeDisplay === "user") ?
              `${selectedUser}'s profile` : `Photos of ${selectedUser}`}
          </Typography>

          {localStorage.getItem('token') &&
            <Link style={{ textDecoration: 'none' }} to={`/uploadImage`} onClick={() => {
              setLgr(false)
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
              setLgr(false)
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
