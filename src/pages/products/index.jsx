import { Box, Button, Grid, MenuItem, Select, SwipeableDrawer, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, FormControl, InputLabel, FormControlLabel, useFormControl } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Switch from '@mui/material/Switch';



import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useLoad, usePatchRequest, usePostRequest } from '../../hook/request';
import { brandsList, categoriesList, productsDelete, productsList, productsPatch, productsPost } from '../../constants/urls';
import { useStore } from '../../store/store';
import { DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from '@mui/joy';
import { useForm } from 'react-hook-form';
import Axios from '../../api';
import UseDeleteModal from '../../hook/useDeleteModal';



function ProductsPage() {
  const [discount, setDiscount] = useState(null)
  const postRequest = usePostRequest({ url: productsPost })
  const patchRequest = usePatchRequest()
  const { response: products, productsLoading, request: reload } = useLoad({ url: productsList })
  const { response: brands, brandsLoading } = useLoad({ url: brandsList })
  const { response: categories, categoriesLoading } = useLoad({ url: categoriesList })

  const [openModal, setOpenModal] = useState(false)
  const [isUpdate, setIsUpdate] = useState(null)
  const deleteModal = UseDeleteModal()
  const { openDeleteModal, setOpenDeleteModal } = useStore()
  const { register, handleSubmit, setValue, reset, formState, formState: { isSubmitSuccessful }, } = useForm({ defaultValues: { data: {} } });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ data: {} })
    }
  }, [formState, reset])



  const handleModal = () => {
    setOpenModal(!openModal)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 50, editable: true, },
    { field: 'name', headerName: 'Name', width: 300, editable: true },
    { field: 'categorieId', headerName: 'Categorie', width: 220, editable: true },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 120, align: 'left', headerAlign: 'left', editable: true },
    { field: 'sold', headerName: 'Sold', type: 'number', width: 120, align: 'left', headerAlign: 'left', editable: true },
    { field: 'price', headerName: 'Price', type: 'number', width: 140, align: 'left', headerAlign: 'left', editable: true },
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
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteModal(productsDelete(item.id), reload)}
          />,
        ];
      },
    },
  ];

  const addProduct = async (data) => {
    const { success } = isUpdate ? await patchRequest.request({ url: productsPatch(isUpdate), data }) : await postRequest.request({ data })
    if (success) {
      setOpenModal(false)
      reload()
      reset({ data })
    }
  }



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

      <SwipeableDrawer
        anchor='right'
        open={openModal}
        onClose={() => setOpenModal(false)
        }
        onOpen={() => setOpenModal(true)}
      >
        <Box sx={{ width: 800, py: 4, px: 2 }}>
          <FormControl component='form' onSubmit={handleSubmit(addProduct)}>
            <Grid container spacing={3}>
              <Grid item xs={6} md={12}>
                <TextField {...register('name')} type='text' fullWidth label='Product Name' size='small' ></TextField>
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField {...register('price')} fullWidth label='Product Price' size='small' ></TextField>
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField {...register('discount_price')} fullWidth label='Product Discount Price' size='small' ></TextField>
              </Grid>
              <Grid item xs={6} md={12}>
                <TextField {...register('image')} fullWidth label='Product Main Image' size='small' ></TextField>
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField {...register('images')} fullWidth label='Product Images' size='small' ></TextField>
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField {...register('images')} fullWidth label='Product Images' size='small' ></TextField>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl fullWidth size='small' >
                  <InputLabel id="demo-simple-select-label" >Product Categories</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Product Categorie"
                    {...register('categorieId')}
                    onChange={(e) => handleChangeCategory(e.target.value)}
                  >
                    {
                      categories?.map((item, i) => (
                        <MenuItem key={i} value={item.slug}>{item.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl fullWidth size='small' >
                  <InputLabel id="demo-simple-select-label">Product Brand</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Product Brand"
                    {...register('brandId')}
                    defaultValue={null}
                    onChange={(e) => handleChangeBrand(e.target.value)}
                  >
                    {
                      brands?.map((item, i) => (
                        <MenuItem key={i} value={item.id}>{item.title}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={10} sx={{ display: 'flex' }}>
                <Box>
                  <FormControlLabel
                    control={<Switch onChange={(e) => (e.target.checked)} color="primary" />}
                    label="Popular"
                    labelPlacement="start"
                    {...register('popular')}
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Switch onChange={(e) => (e.target.checked)} color="primary" />}
                    label="Discount"
                    labelPlacement="start"
                    {...register('discount')}
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Switch onChange={(e) => (e.target.checked)} color="primary" />}
                    label="Best seller"
                    labelPlacement="start"
                    {...register('best_seller')}
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={<Switch onChange={(e) => (e.target.checked)} color="primary" />}
                    label="New"
                    labelPlacement="start"
                    {...register('new')}
                  />
                </Box>
              </Grid>
            </Grid>
            <Button type='submit' variant='contained'>ADD</Button>
          </FormControl>
        </Box>
      </SwipeableDrawer >
    </>
  )
}

export default ProductsPage