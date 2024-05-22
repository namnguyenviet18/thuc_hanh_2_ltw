
import './UploadImage.css';
import noPhoto from '../../images/no-photo.jpg';
import { useState, useContext } from 'react';
import { UserContext } from "../../App";

const UploadImage = () => {
    const { notify } = useContext(UserContext);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = (e) => {
        if (isUploading) {
            return;
        }
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setPreview(null);
            alert('Please select a valid image file (JPEG, PNG, GIF)');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!image) {
            notify("Please choose a image");
            return;
        }
        if (isUploading) {
            return;
        }
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', image);
            const res = await fetch(
                "http://localhost:8080/photos/new",
                {
                    body: formData,
                    headers: {
                        authorization: localStorage.getItem('token')
                    },
                    method: "POST"
                },

            );

            setIsUploading(false);

            const result = await res.json();
            if (res.status === 400) {
                notify(result.msg);
                return;
            }
            if (res.status === 500) {
                notify('Error uploading photo');
            }
            if (res.status === 200) {
                notify(result.msg);
                setPreview(null);
                setImage(null);
            }


        } catch (err) {
            setIsUploading(false);
            notify('Error uploading photo');
        }
    };

    return (
        <div className="upload-container">
            <form onSubmit={handleSubmit}>
                <div className="file-input">
                    <label htmlFor="image-upload" className="file-label">
                        Choose an image
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input-field"
                    />
                </div>
                {preview != null ? (
                    <div className="image-preview">
                        <img src={preview} alt="Preview" />
                    </div>
                ) : (
                    <div className='no-image-preview'>
                        <img src={noPhoto} alt='' />
                    </div>
                )}
                {image && <p className="file-name">Selected image: {image.name}</p>}
                <button type="submit" className="upload-button">
                    {isUploading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </div>
    );
};

export default UploadImage;