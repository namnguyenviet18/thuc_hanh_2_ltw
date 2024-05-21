import './Photo.css';
import { useState, useContext } from 'react';
import { UserContext } from "../../App";
import { Link } from 'react-router-dom';
import iconDelete from '../../images/trash.svg';

function Photo({ photo, deletePhoto }) {
    const { toast } = useContext(UserContext);
    const [comments, setComments] = useState(photo.comments || []);
    const [commentText, setCommentText] = useState("");

    const handleAddComment = async () => {
        if (commentText === "") {
            toast("Please enter your comment!");
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/photos/commentsOfPhoto/${photo._id}`, {
                headers: {
                    authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ comment: commentText })
            });

            const result = await res.json();

            if (res.status === 404 || res.status === 500) {
                toast(result.msg ?? "Comment submission failed");
                return;
            }

            const newComment = {
                comment: commentText,
                date_time: new Date(),
                _id: result.cmtid,
                user_id: {
                    _id: JSON.parse(localStorage.getItem('user'))._id,
                    first_name: JSON.parse(localStorage.getItem('user')).first_name,
                    last_name: JSON.parse(localStorage.getItem('user')).last_name
                }
            };
            setComments(prev => [newComment, ...prev]);
            setCommentText("");
            toast(result.msg ?? "Comment added successfully");


        } catch (err) {
            console.error("Error adding comment:", err);
            toast("Error adding comment");
        }
    };

    const deleteComment = async (commentID) => {
        try {
            const res = await fetch('http://localhost:8080/photos/deleteComment', {
                headers: {
                    authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ photo_id: photo._id, comment_id: commentID })
            });

            const result = await res.json();

            if (res.status === 404) {
                toast(result.msg ?? "Error! An error occurred. Please try again later");
                return;
            }

            if (res.status === 500) {
                toast("Error! An error occurred. Please try again later");
                return;
            }

            toast(result.msg ?? "Deleted successfully");
            setComments(prev => prev.filter(comment => comment._id !== commentID));

        } catch (err) {
            toast("Error deleting comment");
        }
    };


    function formatTime(dateString) {
        const date = new Date(dateString);
        return `${addZero(date.getHours())}h${addZero(date.getMinutes())} ${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${addZero(date.getFullYear())}`;
    }

    function addZero(aim) {
        return aim < 10 ? `0${aim}` : aim;
    }

    return (
        <div className="container-photo">
            <img src={photo.file_name} alt="" />
            <div className="time-download">
                <p className='time'>Posting time: {formatTime(photo.date_time)}</p>
                <div className='icon-text-download' onClick={() => deletePhoto(photo._id)}><img src={iconDelete} alt='' /> <p>Delete</p></div>
            </div>
            <p className='number-comment'>{comments.length > 0 ? `comments on this photo (${comments.length})` : "This photo has no comments yet"}</p>

            <div className="comment-section">
                <div className="comment-input-container">
                    <input
                        type="text"
                        value={commentText}
                        placeholder='Add a comment'
                        onChange={(event) => setCommentText(event.target.value)}
                        className="comment-input"
                    />
                    <button className="comment-button" onClick={handleAddComment}>Send</button>
                </div>
                {comments.length > 0 && comments.map((item) =>
                    <div key={item._id} className='container-comment'>
                        <div className='lead-comment'>
                            <Link style={{ textDecoration: "none" }} to={`/users/${item.user_id._id}`}>
                                <p className='name-user'>{item.user_id.first_name + " " + item.user_id.last_name}</p>
                            </Link>
                            {item.user_id._id === JSON.parse(localStorage.getItem('user'))._id &&
                                <img alt='' src={iconDelete} onClick={() => deleteComment(item._id)} />}
                        </div>
                        <p className='time'>{formatTime(item.date_time)}</p>
                        <p className='comment-text'>{item.comment}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Photo;