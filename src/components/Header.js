import React, { useState, useEffect } from 'react'
import { useLazyQuery, gql, useQuery, useApolloClient } from '@apollo/client'
import { useHistory, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import get from 'lodash/get'

import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

import CURRENT_USER from 'core/gql/user/currentUser'
import { getToken } from 'kit/login/utils'

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
          color: 'white'
        },

        '&:hover': {
          // textDecoration: 'underline',
        },
      },

      '&:hover': {
        opacity: .7
      }
    },
  },
  large: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  profile: {
    width: '100%', 
    textDecoration: 'none',

    '&:hover': {
      opacity: .7,
    },
  }
}))

const Header = () => {
  const apolloClient = useApolloClient()
  const history = useHistory()
  const classes = useStyles()
  // const dia = dayjs().format('DD-MM-YYYY')
  const dia = dayjs().format('YYYY-MM-DD')

  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)

  const [getUser, { data: dataUser, loading: loadingUser }] = useLazyQuery(CURRENT_USER, {
    ssr: false,
    fetchPolicy: 'cache',
  })

  useEffect(() => {
    const querySubscription = apolloClient
      .watchQuery({
        query: CURRENT_USER,
        fetchPolicy: 'cache-only',
      })
      .subscribe({
        next: ({ data }) => {
          setUser(get(data, 'currentUser', null) || null)
        },
        error: e => {
          console.error('jose error subscribe', e)
        },
      })

    return () => {
      querySubscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (dataUser) {
      setUser(get(dataUser, 'currentUser'))
    }
  }, [dataUser])

  useEffect(() => {
    if (getToken()) {
      getUser()
    }
  }, [dataUser])

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
            <SimpleImage
              alt='Alamar - Balnearios Costa Atlantica'
              height={30}
              alt='Alamar'
              image={LogoAlamar}
              onClick={() => history.push('/')}
            />
          </Link>
        </div>
        <SwipeableTemporaryDrawer>
          <ul className={classes.nav}>
            {user ? (
              <React.Fragment>
                  <Link to='/profile' className={classes.profile}>
                    <ListItem style={{ 
                      height: 100,
                      display: 'flex',
                      alignItems: 'cemter!important'
                      }}>
                      <Avatar
                        className={classes.large}
                        alt={get(user, 'name')}
                        src={get(user, 'image')}
                      />
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
                  </Link>
                <li>
                  <Link to='/logout'>
                    <ListItem alignItems='flex-start'>
                        <Typography variant='p' textAlign='left' color='white' fontWeight={400}>
                          Cerrar Sesion
                        </Typography>
                    </ListItem>
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <li>
                <Link to='/login' className={classes.login}>
                  <AccountCircleIcon />
                  <Typography variant='p' textAlign='left' color='white' fontWeight={400}>
                    Login
                  </Typography>
                </Link>
              </li>
            )}
            <li>
              <Link to={`/list/${dia}/${dia}`}>
                <SimpleImage alt='Alquilar Balneario Costa Atlantica' height={28} image={IconPlaya} />
                <Typography variant='p' textAlign='left' color='white' fontWeight={400}>
                  Balnearios
                </Typography>
              </Link>
            </li>
            <li>
              <a className="flex row" onClick={handleClickOpen}>
                <SimpleImage alt='Alquilar Balneario Costa Atlantica' height={28} image={Accepted} />
                <Typography variant='p' color='white'>
                  Terminos y Condiciones
                </Typography>
              </a>
            </li>
            <li>
              <a className="flex row" onClick={handleClickOpen2}>
                <SimpleImage alt='Alquilar Balneario Costa Atlantica' height={28} image={Conversation} />
                <Typography variant='p' color='white'>
                  Preguntas Frecuentes
                </Typography>
              </a>
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
