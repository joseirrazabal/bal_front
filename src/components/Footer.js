import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import SimpleImage from './SimpleImage'
import Typography from './Typography'
import FullScreenDialog from './Dialog'

import Facebook from '../assets/icon-facebook.svg'
import Phone from '../assets/icon-phone.svg'
import Instagram from '../assets/icon-instagram.svg'
import Whatsapp from '../assets/icon-whatsapp.svg'
import Location from '../assets/icon-pin-white.svg'

import Term from '../containers/TyC/Term'

const useStyles = makeStyles(theme => ({
  footer: {
    width: '100%',
    height: 'auto',
    background: theme.palette.secondary.dark,
    position: 'relative',
    zIndex: 2,
    boxSizing: 'border-box'
  },
  content: {
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',

    '& ul': {
      padding: 0,
      display: 'flex',
      listStyle: 'none',

      '& a': {
        cursor: 'pointer'
      },

      '& li': {
        display: 'flex',
        alignItems: 'center',
        margin: 5
      }
    }
  },
  itemFooter: {
    display: 'flex',

    '& p': {
      paddingLeft: 10
    }
  }
}))

const Footer = () => {

  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.footer}>
      <div className={classes.content}>
        <div>
          <Typography variant="h4" color="white">Info de contacto:</Typography>
          <ul style={{flexDirection: 'column'}}>
            <a>
              <li className={classes.itemFooter}><SimpleImage image={Phone} height={20} /> <Typography variant="p" color="white" fontSize={12}>(011) - 119998-4567</Typography></li>
            </a>
            <a>
              <li className={classes.itemFooter}><SimpleImage image={Location} height={25} /> <Typography variant="p" color="white" fontSize={12}>Direccion de ejmplo 123 - Buenos Aires</Typography></li>
            </a>
          </ul>
        </div>
        <div>
          <Typography variant="h4" color="white">Nos podes encontrar en:</Typography>
          <ul>
            <a ><li className={classes.itemFooter}><SimpleImage image={Facebook} height={25} /></li></a>
            <a ><li className={classes.itemFooter}><SimpleImage image={Instagram} height={25} /></li></a>
            <a ><li className={classes.itemFooter}><SimpleImage image={Whatsapp} height={25} /></li></a>
          </ul>
        </div>
        <div>
          <Typography variant="h4" color="white">¿Dudas?</Typography>
          <ul style={{flexDirection: 'column'}}>
            <li><Typography variant="p" color="white" fontSize={12}>sobre nosotros</Typography></li>
            <li onClick={handleClickOpen}><Typography variant="p" color="white" fontSize={12}>terminos y condicioness</Typography></li>
          </ul>
        </div>
      </div>
      <FullScreenDialog title='Terminos y condiciones' open={open} handleClose={handleClose}>
        <Term />
      </FullScreenDialog>
    </div>
  )
}

export default Footer
