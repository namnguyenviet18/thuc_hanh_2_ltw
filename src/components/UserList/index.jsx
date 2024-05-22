import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";


function UserList() {
  const { setViewMode, notify, userList, setUserList, isLogin } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedUser, setSelectedUser] = useState(0);

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
          notify(result.msg);
          return;
        }


        if (res.status === 200) {
          setUserList([{ _id: user._id, first_name: "My", last_name: "Profile" }, ...result]);
        }
      } catch (err) {
        notify("Failed to fetch users");
      }

    };

    fetchUser();
  }, [isLogin]);



  return (
    <div>
      <Typography style={{ marginLeft: "16px", fontWeight: "bold" }} variant="body1">
        Danh sách người dùng:
      </Typography>
      <List component="nav">

        {userList && userList.map((item, index) => (
          <div key={item._id}>
            <Link to={`/users/${item._id}`} onClick={() => {
              setViewMode(item.first_name + " " + item.last_name + "'s profile"); setSelectedUser(index);
            }} className={selectedUser === index ? "user-item selected" : "user-item"}>
              <ListItem>
                <ListItemText primary={item.first_name + " " + item.last_name} className="user-item-text" />
              </ListItem>
            </Link>
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;