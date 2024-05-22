import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Skeleton
} from "@mui/material";


function UserList() {
  const { setViewMode, notify, userList, setUserList, isLogin } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedUser, setSelectedUser] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      return;
    }

    setIsLoading(true);

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
          setSelectedUser(0);
          navigation(`/users/${user._id}`);
        }
      } catch (err) {
        notify("Failed to fetch users");
      }

    };

    setIsLoading(false);

    fetchUser();
  }, [isLogin]);



  return (
    <div>
      <Typography style={{ marginLeft: "22px", fontWeight: "bold" }} variant="body1">
        User list:
      </Typography>
      {isLoading ?? <Skeleton className="loading"></Skeleton>}
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