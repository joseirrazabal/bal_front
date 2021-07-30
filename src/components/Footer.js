import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import SimpleImage from './SimpleImage'
import Typography from './Typography'

import Facebook from '../assets/icon-facebook.svg'
import Instagram from '../assets/icon-instagram.svg'

import Term from '../containers/TyC/Term'
import Faqs from '../containers/Faqs/Faqs'

const useStyles = makeStyles(theme => ({
  footer: {
    width: '100%',
    height: 'auto',
    background: theme.palette.secondary.dark,
    position: 'relative',
    zIndex: 2,
    boxSizing: 'border-box',
  },
  content: {
    padding: '40px 20px',
    display: 'flex',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',

    '& ul': {
      padding: 0,
      display: 'flex',
      listStyle: 'none',

      '& a': {
        cursor: 'pointer',
      },

      '& li': {
        display: 'flex',
        alignItems: 'center',
        margin: 5,
      },
    },

    '@media (max-width: 680px)': {
      flexDirection: 'column',
    },
  },
  itemFooter: {
    display: 'flex',

    /* '& p': {
      paddingLeft: 10
    } */
  },
}))

const Footer = ({ setContentModal = () => {} }) => {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <div className={classes.content}>
        <div>
          <Typography variant='h4' color='white'>
            Info de contacto:
          </Typography>
          <ul style={{ flexDirection: 'column' }}>
            <a alt='Alamar - Balnearios Costa Atlantica'>
              <li className={classes.itemFooter}>
                {/* <SimpleImage image={Phone} height={20} /> */}{' '}
                <Typography variant='p' color='white' fontSize={12}>
                  alamarargentina@gmail.com
                </Typography>
              </li>
            </a>
            {/*  <a>
              <li className={classes.itemFooter}><SimpleImage image={Location} height={25} /> <Typography variant="p" color="white" fontSize={12}>Direccion de ejmplo 123 - Buenos Aires</Typography></li>
            </a> */}
          </ul>
        </div>
        <div>
          <Typography variant='h4' color='white'>
            Nos podes encontrar en:
          </Typography>
          <ul>
            <a href='https://www.facebook.com/alamar.alamar.94064' target='_blank'>
              <li className={classes.itemFooter}>
                <SimpleImage image={Facebook} height={25} />
              </li>
            </a>
            <a href='https://www.instagram.com/alamar_ar/' target='_blank'>
              <li className={classes.itemFooter}>
                <SimpleImage image={Instagram} height={25} />
              </li>
            </a>
          </ul>
        </div>
        <div>
          <Typography variant='h4' color='white'>
            ¿Dudas?
          </Typography>
          <ul style={{ flexDirection: 'column' }}>
            <li
              onClick={() => {
                setContentModal(<Faqs />)
              }}
            >
              <Typography variant='p' color='white' fontSize={12}>
                Preguntas Frecuentes
              </Typography>
            </li>
            <li
              onClick={() => {
                setContentModal(<Term />)
              }}
            >
              <Typography variant='p' color='white' fontSize={12}>
                Terminos y condiciones
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
