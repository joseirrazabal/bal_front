import React, { useContext, useEffect } from 'react'

import { Snackbar, Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

const Offline = ({ open }) => {
  return (
    <Dialog maxWidth='xs' aria-labelledby='confirmation-dialog-title' open={open}>
      <DialogContent dividers>- Sin coneccion a internet -</DialogContent>
    </Dialog>
  )
}

const Reload = ({ open, onClick }) => {
  return (
    <Snackbar
      open={open}
      message='Una nueva version esta disponible'
      onClick={onClick}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      action={
        <Button color='primary' size='small' onClick={onClick}>
          Recargar
        </Button>
      }
    />
  )
}

export { Offline, Reload }
