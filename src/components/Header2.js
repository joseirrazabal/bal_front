import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import get from 'lodash/get'
import { useHistory, Link, NavLink } from 'react-router-dom'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ListItem from '@material-ui/core/ListItem'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Badge from '@material-ui/core/Badge'

import SimpleImage from './SimpleImage'
import LogoAlamar from '../assets/alamar-logo-2.svg'
import Typography from './Typography'
import SwipeableTemporaryDrawer from './Drawer'
import IconPlaya from '../assets/icon-playa2.svg'
import Accepted from '../assets/accepted.svg'
import Conversation from '../assets/conversation.svg'
import Notification from '../assets/notification.svg'
import FullScreenDialog from './Dialog'
import Term from '../containers/TyC/Term'
import Faqs from '../containers/Faqs/Faqs'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.dark,
    height: '100vh',
    width: 300,
  },
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
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
    padding: 0,
    margin: 0,
    height: '100vh',
    boxSizing: 'border-box',

    '& li': {
      margin: '1px 0',
      padding: 0,
      width: '100%',
      background: theme.palette.secondary.light,
      padding: '0 10px',
      boxSizing: 'border-box',
      // color: 'white',

      '& hr': {
        // background: 'white',
      },

      '& a': {
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        height: 50,

        '& img': {
          marginRight: 15,
        },

        '& svg': {
          marginRight: 15,
          color: 'white',
        },

        '&:hover': {
          // textDecoration: 'underline',
        },
      },

      '&:hover': {
        opacity: 0.7,
      },
    },
  },
  large: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  profile: {
    width: '100%',
    textDecoration: 'none',

    '&:hover': {
      opacity: 0.7,
    },
  },
}))

const Header = ({ notifications = 0, user = {} }) => {
  const history = useHistory()
  const classes = useStyles()
  // const dia = dayjs().format('DD-MM-YYYY')
  const dia = dayjs().format('YYYY-MM-DD')

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

  const [state, setState] = useState({
    right: false,
  })

  const toggleDrawer =
    (open, anchor = 'right') =>
    event => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <div className={classes.contentLogo}>
          <Link to='/'>
            <SimpleImage
              alt='Alamar - Balnearios Costa Atlantica'
              height={30}
              alt='Alamar'
              image={LogoAlamar}
              onClick={() => history.push('/')}
            />
          </Link>
        </div>
        <Button onClick={toggleDrawer(true)}>
          {notifications ? (
            <Badge color='primary' badgeContent={notifications}>
              <MenuIcon />
            </Badge>
          ) : (
            <MenuIcon />
          )}
        </Button>
        <SwipeableDrawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div className={classes.root}>
            {user ? (
              <React.Fragment>
                <ListItem
                  className={classes.profile}
                  activeClassName='Mui-selected'
                  component={NavLink}
                  to={`/profile`}
                  style={{
                    height: 100,
                    display: 'flex',
                    alignItems: 'cemter!important',
                    backgroundColor: '#4dabf5',
                    margin: '1px',
                  }}
                >
                  <Avatar className={classes.large} alt={get(user, 'name')} src={get(user, 'image')} />
                  <ListItemText
                    primary='Biuenvenido'
                    style={{ marginRight: 10 }}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component='span'
                          variant='span'
                          className={classes.inline}
                          color='white'
                        >
                          {get(user, 'name')}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem
                  alignItems='flex-start'
                  component={NavLink}
                  to={`/logout`}
                  activeClassName='Mui-selected'
                  onClick={() => {}}
                >
                  <Typography variant='p' textAlign='left' color='white' fontWeight={400}>
                    Cerrar Sesion
                  </Typography>
                </ListItem>
              </React.Fragment>
            ) : (
              <ListItem
                alignItems='flex-start'
                component={NavLink}
                to={`/login`}
                activeClassName='Mui-selected'
                onClick={() => {}}
                className={classes.login}
              >
                <AccountCircleIcon
                  style={{
                    marginRight: '15px',
                  }}
                />
                <Typography variant='p' textAlign='left' color='white' fontWeight={400}>
                  Entrar
                </Typography>
              </ListItem>
            )}
            <ListItem
              component={NavLink}
              to={`/list/${dia}/${dia}`}
              activeClassName='Mui-selected'
              onClick={() => {}}
            >
              <SimpleImage
                alt='Alquilar Balneario Costa Atlantica'
                height={28}
                image={IconPlaya}
                style={{
                  marginRight: '15px',
                }}
              />
              <Typography variant='p' textAlign='left' color='white' fontWeight={400}>
                Balnearios
              </Typography>
            </ListItem>
            {user && (
              <ListItem
                component={NavLink}
                to='/notifications'
                activeClassName='Mui-selected'
                onClick={() => {}}
              >
                <SimpleImage
                  alt='Alquilar Balneario Costa Atlantica'
                  height={28}
                  image={Notification}
                  style={{
                    marginRight: '15px',
                  }}
                />
                {notifications ? (
                  <Badge
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    color='primary'
                    badgeContent={notifications}
                  >
                    <Typography variant='p' textAlign='left' color='white' fontWeight={400}>
                      Notificaciones
                    </Typography>
                  </Badge>
                ) : (
                  <Typography variant='p' textAlign='left' color='white' fontWeight={400}>
                    Notificaciones
                  </Typography>
                )}
              </ListItem>
            )}
            <ListItem
              alignItems='flex-start'
              // component={NavLink}
              // to={`/login`}
              activeClassName='Mui-selected'
              onClick={() => {}}
              // className={classes.login}
            >
              {/* <a className='flex row' onClick={handleClickOpen}> */}
              <SimpleImage
                alt='Alquilar Balneario Costa Atlantica'
                height={28}
                image={Accepted}
                style={{
                  marginRight: '15px',
                }}
              />
              <Typography variant='p' color='white'>
                Terminos y Condiciones
              </Typography>
              {/* </a> */}
            </ListItem>
            <ListItem
              alignItems='flex-start'
              // component={NavLink}
              // to={`/login`}
              activeClassName='Mui-selected'
              onClick={() => {}}
              // className={classes.login}
            >
              {/* <a className='flex row' onClick={handleClickOpen2}> */}
              <SimpleImage
                alt='Alquilar Balneario Costa Atlantica'
                height={28}
                image={Conversation}
                style={{
                  marginRight: '15px',
                }}
              />
              <Typography variant='p' color='white'>
                Preguntas Frecuentes
              </Typography>
              {/* </a> */}
            </ListItem>
          </div>
        </SwipeableDrawer>
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

export default React.memo(Header)
