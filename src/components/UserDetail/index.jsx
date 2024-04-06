import React from "react";
import models from "../../modelData/models";
import "./styles.css";
import { useParams, Link } from "react-router-dom";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail({ setTypeDisplay }) {
  const { userId } = useParams();
  const user = models.userModel(userId);
  return (
    <div>
      <div>Họ và tên: {user.first_name} {user.last_name}</div>
      <div>Id: {user._id}</div>
      <div>Địa chỉ: {user.location}</div>
      <div>Giới thiệu: {user.description}</div>
      <div>Nghề nghiệp: {user.occupation}</div>


      <Link to={`/photos/${userId}`} onClick={() => setTypeDisplay("image")}><p>Xem ảnh</p></Link>
    </div>
  );
}

export default UserDetail;
