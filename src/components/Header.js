import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, Link } from 'react-router-dom'
import dayjs from 'dayjs'

import SimpleImage from './SimpleImage'
import LogoAlamar from '../assets/alamar-logo-white.svg'
import Typography from './Typography'

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    height: 60,
    top: 0,
    left: 0,
    background: theme.palette.secondary.main,
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
    listStyle: 'none',
    color: 'black',
    alignItems: 'center',
    padding: 0,

    '& li': {
      margin: '0 10px',

      '& a': {
        textDecoration: 'none',
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
            <SimpleImage height={40} alt='Alamar' image={LogoAlamar} onClick={() => history.push('/')} />
          </Link>
        </div>
        <ul className={classes.nav}>
          <li>
            <Link to={`/list/${dia}/${dia}`}>
              <Typography variant='p' color='white'>
                balnearios
              </Typography>
            </Link>
          </li>
          <li>
            <Link to='/'>
              <Typography variant='p' color='white'>
                ayuda
              </Typography>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Header
