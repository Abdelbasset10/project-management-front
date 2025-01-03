import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Field, FieldArray, Formik } from 'formik';
import { Box, FormControl, IconButton, Input, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
    name: Yup.string().required('Project name is required'),
    tasks: Yup.array()
        .of(Yup.string().required('Name is required'))
        .min(1, 'At least one name is required'),

});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditProjectDialog = ({ isOpen, onClose,setData,project }) => {

    const onSubmit = async (values) => {
        try {
            const response = await axios.patch(`http://localhost:5000/project/${project.id}`, values);
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

    console.log(project)

    const initialValues = {
        name: project?.name || "",
        tasks: project?.tasks  && project?.tasks?.map((task) => task.name) || [''],
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
                <DialogTitle>{"Create project"}</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({
                            values,
                            touched,
                            errors,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Field
                                        name="name"
                                        as={TextField}
                                        label="Project name"
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        di
                                        margin="normal"
                                        disabled={isSubmitting}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                    <FieldArray name={`tasks`}>
                                        {({ push, remove }) => (
                                            < >
                                                <Typography sx={{ mt: 2, mb: -1 }}>Tasks:</Typography>
                                                <Stack direction={'column'} alignItems={'start'} gap={0.5}>
                                                    {values?.tasks?.map((_, index) => (
                                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', }} >
                                                            <Box sx={{ flex: 1 }}>
                                                                <Field
                                                                    name={`tasks[${index}]`}
                                                                    as={TextField}
                                                                    label="Task name"
                                                                    variant="outlined"
                                                                    size="small"
                                                                    fullWidth
                                                                    margin="normal"
                                                                    disabled={isSubmitting}
                                                                    error={touched.tasks?.[index] && Boolean(errors.tasks?.[index])}
                                                                    helperText={touched.tasks?.[index] && errors.tasks?.[index]}
                                                                />
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Tooltip title={"Remove"}>
                                                                    <IconButton onClick={() => remove(index)}>
                                                                        <Delete color='warning`' />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                {index === values?.tasks?.length - 1 && (
                                                                    <Tooltip title={"Add new task"}>
                                                                        <IconButton onClick={() => push('')}>
                                                                            <Add color='warning`' />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                )}
                                                            </Box>
                                                        </Box>
                                                    ))}
                                                </Stack>

                                            </>
                                        )}
                                    </FieldArray>
                                    <Button type='submit' variant='contained' sx={{ mt: 2 }}>Edit</Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}

export default EditProjectDialog;
