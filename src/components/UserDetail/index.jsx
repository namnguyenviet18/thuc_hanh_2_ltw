import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
import { useParams, Link } from "react-router-dom";

import { UserContext } from "../../App";

function UserDetail() {
  const { userId } = useParams();
  const { setViewMode } = useContext(UserContext);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
    _id: "",
  });


  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `http://localhost:8080/admin/userDetail/${userId}`,
        {
          headers: {
            authorization: localStorage.getItem('token')
          }
        }
      );
      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        return;
      }

      setUser(result); // Assume the whole result is the user list
    }
    fetchUser();
  }, [userId]);

  return (
    <div className="user-detail-container">
      <div><span>Họ và tên:</span> {user.first_name} {user.last_name}</div>
      <div><span>Id:</span> {user._id}</div>
      <div><span>Địa chỉ:</span> {user.location}</div>
      <div><span>Giới thiệu:</span> {user.description}</div>
      <div><span>Nghề nghiệp:</span> {user.occupation}</div>
      <Link to={`/photos/${user._id}`} onClick={
        () => setViewMode(userId === JSON.parse(localStorage.getItem('user'))._id ?
          "My photos" : ("Photos of " + user.first_name + user.last_name))
      } className="user-detail-link">Xem ảnh</Link>
    </div>
  );
}

export default UserDetail;