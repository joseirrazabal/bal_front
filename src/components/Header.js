import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import { useHistory, Link } from 'react-router-dom'
import dayjs from 'dayjs'

import SimpleImage from './SimpleImage'
import LogoAlamar from '../assets/alamar-logo-2.svg'
import Typography from './Typography'

import SwipeableTemporaryDrawer from './Drawer'

import IconPlaya from '../assets/icon-playa2.svg'
import Accepted from '../assets/accepted.svg'
import Conversation from '../assets/conversation.svg'

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
            {/* <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Luiciano Recchini" src="/static/images/avatar/1.jpg" />
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
            </ListItem> */}
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
              <Link to='/'>
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
              <Link to='/'>
                <SimpleImage alt="Alquilar Balneario Costa Atlantica" height={28} image={Conversation} />
                <Typography variant='p' color='white'>
                  Preguntas Frecuentes
                </Typography>
              </Link>
            </li>
          </ul>
        </SwipeableTemporaryDrawer>
      </div>
    </div>
  )
}
export default Header
