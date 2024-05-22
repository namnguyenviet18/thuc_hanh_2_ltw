import React, { useEffect, useState, useContext } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import Photo from "../Photo/Photo";
import LoadingPhoto from "./LoadingPhoto";

import { UserContext } from "../../App";

function UserPhotos({ setTypeDisplay }) {
  const { userId } = useParams();
  const [photoList, setPhotoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useContext(UserContext);
  useEffect(() => {
    const getPhotosOfUser = async () => {
      if (!userId) {
        notify("User not found!");
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(
          `http://localhost:8080/photos/photoOfUser/${userId}`,
          {
            headers: {
              authorization: localStorage.getItem('token')
            },
          }
        );
        setIsLoading(false);

        const result = await res.json();

        if (res.status === 400) {
          notify(result.message);
          return;
        }

        setPhotoList(result);


      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    getPhotosOfUser();

  }, [userId, notify]);

  const deletePhoto = async (photo_id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/photos/delete/${photo_id}`,
        {
          headers: {
            authorization: localStorage.getItem('token')
          },
        }
      );

      const result = await res.json();

      console.log("result", result);

      if (res.status === 400) {
        notify(result.msg);
        return;
      }

      if (res.status === 500) {
        notify("Failed");
        return;
      }
      notify(result.msg);
      setPhotoList(prev => prev.filter(photo => photo._id !== photo_id));

    } catch (err) {

    }
  }

  return (
    <div>
      {isLoading && Array(10).fill().map((_, index) => <LoadingPhoto key={index}></LoadingPhoto>)}
      {(photoList.length === 0 && !isLoading) && <h1>No images</h1>}
      {photoList.map((item) => (<Photo key={item._id} photo={item} deletePhoto={deletePhoto} />))}
    </div>
  );
}

export default UserPhotos;
