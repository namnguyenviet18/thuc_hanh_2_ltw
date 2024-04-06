import React from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos({ setTypeDisplay }) {
  const { userId } = useParams();
  const userImages = models.photoOfUserModel(userId);

  function formatTime(dateString) {
    const date = new Date(dateString);
    return `${addZero(date.getHours())}h${addZero(date.getMinutes())} 
    ${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${addZero(date.getFullYear())}`
  }

  function addZero(aim) {
    return aim < 10 ? `0${aim}` : aim;
  }

  function imageItem(image) {
    return (
      <div>
        <h2>Create date: {formatTime(image.date_time)}</h2>
        <div className="image">
          <img src={require(`../../images/${image.file_name}`)} alt="Ảnh" />
        </div>
        <div>
          {buildComments(image)}
          <div className="divider"></div>
        </div>
      </div>
    )
  }

  function buildComments(image) {
    const comments = image.comments;
    if (!comments || comments.length === 0) {
      return;
    }
    return (
      <div className="comment-container">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <Link
              to={`/users/${comment.user._id}`}
              onClick={() => setTypeDisplay("user")}><p className="creator-cmt">{comment.user.first_name} {comment.user.last_name}</p></Link>
            <p>{formatTime(comment.date_time)}</p>
            <p>{comment.comment}</p>
          </div>

        ))}
      </div>
    )
  }

  return (
    <div>
      {userImages.map((image) => <div key={image._id}>{imageItem(image)}</div>)}
    </div>
  );
}

export default UserPhotos;
