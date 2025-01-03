import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteProjectDialog = ({ isOpen, onClose,setData,id }) => {

    const handleDelete = async (values) => {
        try {
            const response = await axios.delete(`http://localhost:5000/project/${id}`);
            if (response.data) {
                setData(response.data.data)
                handleClose()
            }
        } catch (error) {
            alert(error.message)
        }

    }

    const handleClose = () => {
        onClose()
    };

    return (
        <React.Fragment>

            <Dialog
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "500px",
                            maxWidth: "500px",
                        },
                    },
                }}
            >
                <DialogTitle sx={{textAlign:'center',fontWeight:700}}>{"Delete project"}</DialogTitle>
                <DialogContent>
                    <Typography sx={{textAlign:'center'}}>Are you sure you want to delete this project !</Typography>
                    <Box sx={{display:'flex',gap:2,width:'100%',mt:2}}>
                        <Button sx={{flex:1}} onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' sx={{background:'#FB4141',flex:1}} onClick={handleDelete}>Delete</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteProjectDialog;
