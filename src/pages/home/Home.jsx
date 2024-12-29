import { Box, CircularProgress, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuTable from '../../components/MenuTable';

const Home = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:5000/project");
            if (response.data?.data?.length > 0) {
                setData(response.data.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])


    return (
        <Box sx={{ width: '100vw', minHeight: '100vh', background: '#E9EFEC' }}>
            {isLoading ? (
                <Box sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress size={50} />
                </Box>
            ) : <Box sx={{mx:{base:'1rem',sm:'2rem',md:'3rem',lg:'5rem'},py:'5rem'}}>
                <Typography component={'h1'} sx={{fontSize:'30px',fontWeight:700,mb:2}}>Projects List</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Done Tasks</TableCell>
                                <TableCell>In progress tasks</TableCell>
                                <TableCell>Not started tasks</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.finished_tasks}</TableCell>
                                    <TableCell>{row.in_progress_tasks}</TableCell>
                                    <TableCell>{row.not_started_tasks_tasks}</TableCell>
                                    <TableCell><MenuTable /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>}
        </Box>
    )
}

export default Home