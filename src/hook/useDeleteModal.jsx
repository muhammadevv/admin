import Button from '@mui/joy/Button';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useDeleteRequest } from './request'
import React, { Fragment } from 'react';
import { useStore } from '../store/store';

function UseDeleteModal() {
  const { openDeleteModal, setOpenDeleteModal } = useStore()
  const deleteRequest = useDeleteRequest()

  return async (deleteUrl, reload) => (
    <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(true)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          Confirmation
        </DialogTitle>
        <DialogContent>
          Are you sure you want to discard all of your notes?
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={async () => await (deleteRequest.request({ url: deleteUrl }), reload())}>
            Delete
          </Button>
          <Button variant="plain" color="neutral">
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
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
