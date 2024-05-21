import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";


function UserList({ setTypeDisplay }) {
  const { setSelectedUser } = useContext(UserContext);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/admin/userList",
          {
            headers: {
              authorization: localStorage.getItem('token')
            }
          }
        );

        const result = await res.json();

        if (!res.ok) {
          toast(result.msg);
          return;
        }

        if (res.status === 200) {
          setUserList(result); // Assume the whole result is the user list
        }
      } catch (err) {
        toast("Failed to fetch users");
      }

    };

    fetchUser();
  }, []); // Add dependency array to run useEffect once

  const handleTypeSelect = () => {
    setTypeDisplay("user");
  };

  return (
    <div>
      <Typography variant="body1">
        Danh sách người dùng:
      </Typography>
      <List component="nav">
        {userList && userList.map((item) => (
          <div key={item._id}>
            <Link to={`/users/${item._id}`} onClick={() => {
              handleTypeSelect(); setSelectedUser(item.first_name + " " + item.last_name);
            }} className="user-item">
              <ListItem>
                <ListItemText primary={item.first_name + " " + item.last_name} className="user-item-text" />
              </ListItem>
            </Link>
            {/* <Divider /> */}
          </div>
        ))}
      </List>
      <ToastContainer />
    </div>
  );
}

export default UserList;