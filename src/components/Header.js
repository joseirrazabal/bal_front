import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'

import { useHistory, Link } from 'react-router-dom'
import dayjs from 'dayjs'

import SimpleImage from './SimpleImage'
import LogoAlamar from '../assets/alamar-logo-2.svg'
import Typography from './Typography'

import SwipeableTemporaryDrawer from './Drawer'

import IconPlaya from '../assets/icon-playa2.svg'
import Accepted from '../assets/accepted.svg'
import Conversation from '../assets/conversation.svg'

import FullScreenDialog from './Dialog'

import Term from '../containers/TyC/Term'
import Faqs from '../containers/Faqs/Faqs'

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    height: 60,
    top: 0,
    left: 0,
    background: theme.palette.secondary.dark,
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    '-webkit-box-shadow': '0px 0px 9px 0px rgba(0,0,0,0.75)',
    '-moz-box-shadow': '0px 0px 9px 0px rgba(0,0,0,0.75)',
    'box-shadow': '0px 0px 9px 0px rgba(0,0,0,0.75)',

    '@media (max-width: 960px)': {
      justifyContent: 'center',
      position: 'relative',
      padding: '0 10px',
    },
  },
  container: {
    padding: 0,
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& svg': {
      color: 'white',
    },
  },
  contentLogo: {
    cursor: 'pointer',

    '@media (max-width: 680px)': {
      '& img': {
        height: '30px!important',
      },
    },
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    color: 'black',
    alignItems: 'center',
    padding: 10,

    '& li': {
      margin: 5,
      padding: 0,
      width: '100%',
      color: 'white',

      '& hr': {
        background: 'white',
      },

      '& a': {
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',

        '& img': {
          marginRight: 15
        },

        '&:hover': {
          textDecoration: 'underline',
        },
      },

      '@media (max-width: 960px)': {},
    },
  },
}))

const Header = () => {

  const history = useHistory()
  const classes = useStyles()
  const dia = dayjs().format('DD-MM-YYYY')
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickOpen2 = () => {
    setOpen2(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleClose2 = () => {
    setOpen2(false)
  }

  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <div className={classes.contentLogo}>
          <Link to='/'>
            <SimpleImage alt="Alamar - Balnearios Costa Atlantica" height={30} alt='Alamar' image={LogoAlamar} onClick={() => history.push('/')} />
          </Link>
        </div>
        <SwipeableTemporaryDrawer>
          <ul className={classes.nav}>
            <Link to='/profile'>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className={classes.large} alt="Luiciano Recchini" src="https://media-exp1.licdn.com/dms/image/C4D03AQHJFBIXlYUrtw/profile-displayphoto-shrink_200_200/0/1615833330750?e=1623888000&v=beta&t=lPpLvHG1iD5SRWswy1R9bdiUEAtkVMvsxPv8Zg12dMU" />
                </ListItemAvatar>
                <ListItemText
                  primary="Biuenvenido"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="white"
                      >
                        Luciano Recchini
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Link>
            <li>
              <Link to={`/list/${dia}/${dia}`}>
                <SimpleImage alt="Alquilar Balneario Costa Atlantica" height={28} image={IconPlaya} />
                <Typography variant='p' textAlign='left' color='white' fontWeight={400}>
                  Balnearios
                </Typography>
              </Link>
            </li>
            <li>
              <Divider />
            </li>
            <li>
              <Link onClick={handleClickOpen}>
                <SimpleImage alt="Alquilar Balneario Costa Atlantica" height={28} image={Accepted} />
                <Typography variant='p' color='white'>
                  Terminos y Condiciones
                </Typography>
              </Link>
            </li>
            <li>
              <Divider />
            </li>
            <li>
              <Link onClick={handleClickOpen2}>
                <SimpleImage alt="Alquilar Balneario Costa Atlantica" height={28} image={Conversation} />
                <Typography variant='p' color='white'>
                  Preguntas Frecuentes
                </Typography>
              </Link>
            </li>
          </ul>
        </SwipeableTemporaryDrawer>
      </div>
      <FullScreenDialog title='Terminos y condiciones' open={open} handleClose={handleClose}>
        <Term />
      </FullScreenDialog>
      <FullScreenDialog title='Preguntas Frecuentes' open={open2} handleClose={handleClose2}>
        <Faqs />
      </FullScreenDialog>
    </div>
  )
}
export default Header
