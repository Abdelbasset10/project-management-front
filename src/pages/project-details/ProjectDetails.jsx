import { Box, Card, CardContent, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams()
  const navigate = useNavigate()
  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/project/${id}`);
      if (response.data?.data) {
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProject()
  }, [])

  if(!data && !isLoading){
    navigate("/")
  }
  console.log(data)

  return (
    <Box sx={{ minHeight: '100vh', background: '#E9EFEC' }}>
      <Box sx={{pt:20}}>
        <Card sx={{ width: '80%', mx: 'auto' }}>
          <CardContent>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Typography sx={{ fontSize: '30px', fontWeight: 700 }}>{data?.name}</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.tasks.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.status}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
              </>

            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default ProjectDetails