import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList({ setSelectedUser, setTypeDisplay }) {
  const users = models.userListModel();

  // const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user_id) => {
    setSelectedUser(user_id);
  };
  const handleTypeSelect = (user_id) => {
    setTypeDisplay("user");
  };
  return (
    <div>
      <Typography variant="body1">
        Danh sách người dùng:
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <div key={item._id}>
            <Link to={`/users/${item._id}`} onClick={() => {
              handleTypeSelect(); handleUserSelect(item._id)
            }}>
              <ListItem >
                <ListItemText primary={item.first_name} />
              </ListItem>
            </Link>
            <Divider />
          </div>
        ))}
      </List>
      <Typography variant="body1">

      </Typography>
    </div>
  );
}

export default UserList;
