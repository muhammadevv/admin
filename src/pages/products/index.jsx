import { Box, Button, Grid, MenuItem, Select, SwipeableDrawer, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, FormControl, InputLabel } from '@mui/material'
import React, { Fragment, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';



import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useLoad, usePatchRequest, usePostRequest } from '../../hook/request';
import { productsList, productsPost } from '../../constants/urls';
import useDeleteModal from '../../hook/useDeleteModal';
import { useStore } from '../../store/store';
import { DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from '@mui/joy';



function ProductsPage() {

  const postRequest = usePostRequest({ url: productsPost })
  const patchRequest = usePatchRequest()
  const { response: products, loading, request: reload } = useLoad({ url: productsList })
  const [openModal, setOpenModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(null)
  const deleteModal = useDeleteModal()
  const { openDeleteModal, setOpenDeleteModal } = useStore()


  const handleModal = () => {
    setOpenModal(!openModal)
  }

  // const [rows, setRows] = useState(products);
  // const [rowModesModel, setRowModesModel] = useState({});

  // const handleRowEditStop = (params, event) => {
  //   if (params.reason === GridRowEditStopReasons.rowFocusOut) {
  //     event.defaultMuiPrevented = true;
  //   }
  // };

  // const handleEdit = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  // };

  // const handleSaveClick = (id) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  // };

  // const handleDeleteClick = (id) => () => {
  //   setRows(rows.filter((row) => row.id !== id));
  // };

  // const handleCancelClick = (id) => () => {
  //   setRowModesModel({
  //     ...rowModesModel,
  //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
  //   });

  //   const editedRow = rows.find((row) => row.id === id);
  //   if (editedRow.isNew) {
  //     setRows(rows.filter((row) => row.id !== id));
  //   }
  // };

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'categorieId', headerName: 'Categorie', width: 220 },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 120, align: 'left', headerAlign: 'left' },
    { field: 'sold', headerName: 'Sold', type: 'number', width: 120, align: 'left', headerAlign: 'left' },
    { field: 'price', headerName: 'Price', type: 'number', width: 140, align: 'left', headerAlign: 'left' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (item) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            // onClick={handleEdit(item)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => setOpenDeleteModal(true)}
            color="inherit"
          />,
        ];
      },
    },
  ];





  return (
    <>

      <Box sx={{ width: '100%', display: "flex", justifyContent: "space-between", mb: 2, p: 2, borderBottom: '1px solid #2a2d2c', color: 'white' }}>
        <Typography variant="h5" component="h5">Products</Typography>
        <Button onClick={handleModal} size='medium' variant="contained">ADD +</Button>
      </Box>

      <Box sx={{ p: 2, }}>
        <DataGrid
          columns={columns}
          rows={products}
          disableColumnMenu
          disableColumnSorting
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          disableColumnResize={true}
          slots={{ toolbar: GridToolbar, }}
          slotProps={{ toolbar: { showQuickFilter: true, suppressHydrationWarning: false, } }}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
        />
      </Box>

      {/* <Modal sx={{ zIndex: 100 }} open={true} onClose={() => setOpenDeleteModal(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to discard all of your notes?
          </DialogContent>
          <DialogActions>
            {/* <Button variant="solid" color="danger" onClick={async () => { await deleteRequest.request({ deleteUrl }), reload() }}> */}
            {/* Discard notes */}
            {/* </Button> */}
            {/* <Button variant="plain" color="neutral" onClick={() => setOpen(false)}> */}
            {/* Cancel */}
            {/* </Button> */}
          {/* </DialogActions> */}
        {/* </ModalDialog> */}
      {/* </Modal> */} 


      <SwipeableDrawer
        anchor='right'
        open={openModal}
        onClose={() => setOpenModal(false)
        }
        onOpen={() => setOpenModal(true)}
      >
        <Box sx={{ width: 800, py: 4, px: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={6} md={12}>
              <TextField sx={{ width: '100%' }} label='Product Name' size='small'></TextField>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField sx={{ width: '100%' }} label='Product Name' size='small'></TextField>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField sx={{ width: '100%' }} label='Product Name' size='small'></TextField>
            </Grid>
            {/* <Grid item xs={6} md={8}>
              <TextField sx={{ width: '100%' }} label='Product Name' size='small'></TextField>
            </Grid> */}
            <Grid item xs={6} md={4}>
              <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">Product Brand</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value='Age'
                  defaultValue='nigga'
                  label="Product Brand"
                  // onChange={handleChange}
                  required
                >
                  <MenuItem value="">
                    <em>Select Brand</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">Product Categorie</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value='Age'
                  defaultValue='nigga'
                  label="Product Categorie"
                  // onChange={handleChange}
                  required
                >
                  <MenuItem value="">
                    <em>Select Brand</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControl fullWidth size='small'>
                <InputLabel id="demo-simple-select-label">Product Brand</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value='Age'
                  defaultValue='nigga'
                  label="Product Brand"
                  // onChange={handleChange}
                  required
                >
                  <MenuItem value="">
                    <em>Select Brand</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </SwipeableDrawer >
    </>
  )
}

export default ProductsPage