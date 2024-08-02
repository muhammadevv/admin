import { Box, Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function CategoriesPage() {

  const handleClick = () => {

  }

  return (
    <>
      <Box sx={{ width: '100%', display: "flex", justifyContent: "space-between", mb: 2, p: 2, borderBottom: '1px solid #2a2d2c', color: 'white' }}>
        <Typography variant="h5" component="h5">Categories</Typography>
      </Box>
      <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
        <Box component='form' sx={{ p: 3, minWidth: 400, bgcolor: '#2a2d2c', borderRadius: 3 }}>
          <TextField sx={{ width: '100%', mt: 1 }} size='small' label="Title"></TextField>
          <TextField sx={{ width: '100%', mt: 2 }} size='small' label="Url"></TextField>
          <TextField sx={{ width: '100%', mt: 2 }} size='small' label="Slug"></TextField>
          <Button variant="outlined" sx={{ mt: 3 }}>Add category</Button>
        </Box>
        <TableContainer >
          <Table sx={{ width: '100%', bgcolor: '#2a2d2c', borderRadius: 2, }} aria-label="simple table">
            <TableHead >
              <TableRow >
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell>Calories</TableCell>
                <TableCell>Fat&nbsp;(g)</TableCell>
                <TableCell>Carbs&nbsp;(g)</TableCell>
                <TableCell>Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="column">
                    {row.name}
                  </TableCell >
                  <TableCell>{row.calories}</TableCell>
                  <TableCell>{row.fat}</TableCell>
                  <TableCell>{row.carbs}</TableCell>
                  <TableCell >{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box >
    </>
  )
}

export default CategoriesPage