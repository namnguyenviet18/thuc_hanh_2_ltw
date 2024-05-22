
import { Button, Modal } from '@mui/material';

import './DeleteConfirmation.css'

function DeleteConfirmation({ onDelete, open, setOpen, type }) {


    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        onDelete();
        handleClose();
    };

    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='dialog'>
                <h2 id="modal-modal-title">Xác nhận</h2>
                <p id="modal-modal-description">{`Are you sure you want to delete this ${type}?`}</p>
                <div className='line-button'>
                    <Button className='buttondl accept'
                        onClick={handleDelete}
                        sx={{ textTransform: 'none' }}>Đồng ý</Button>
                    <Button className='buttondl cancel'
                        onClick={handleClose}
                        sx={{ textTransform: 'none' }}>Hủy</Button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteConfirmation;