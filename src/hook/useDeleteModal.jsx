import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useDeleteRequest } from './request'
import React, { Fragment } from 'react';
import { useStore } from '../store/store';

function UseDeleteModal() {
  const { openDeleteModal, setOpenDeleteModal } = useStore()
  const deleteRequest = useDeleteRequest()

  return async (deleteUrl, reload) => (
    <Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          {/* <Divider /> */}
          <DialogContent>
            Are you sure you want to discard all of your notes?
          </DialogContent>
          <DialogActions>
            {/* <Button variant="solid" color="danger" onClick={() => await(deleteRequest.request({ url: deleteUrl }), reload())}> */}
            {/* Discard notes */}
            {/* </Button> */}
            <Button variant="plain" color="neutral" onClick={() => setOpenDeleteModal(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Fragment>
  )
  // return async (deleteUrl, reload) => (
  //   confirm({
  //     title: 'Are you sure delete this Item?',
  //     // icon: <ErrorOutlineOutlinedIcon />,
  //     content: 'Some descriptions',
  //     okText: 'Yes',
  //     okType: 'danger',
  //     canclText: 'No',
  //     async onOk() {
  //       await deleteRequest.request({ url: deleteUrl })
  //       reload()
  //     },
  //     onCancel() {
  //     }
  //   })
  // )
}

export default UseDeleteModal
