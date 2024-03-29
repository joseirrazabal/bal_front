import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import { useHistory } from 'react-router-dom'

import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import SimpleImage from './SimpleImage'
import Typography from './Typography'
import ItemSelected from './ItemSelected'

import Succesfull from '../assets/icon-checked.svg'
import Error from '../assets/icon-error.svg'

const useStyles = makeStyles({
  loadingStyle: {
    position: 'absolute',
    zIndex: 3,
    width: '100vw',
    height: `100%`,
    top: 0,
    background: 'rgba(0,0,0,.9)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  centerContent: {
    width: '100%',
    padding: 20,
    maxWidth: 300,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',

    '& h2': {
      color: 'white',
      textTransform: 'uppercase',
    },
  },
  detalleMessage: {
    width: '100vw',
    height: '100vh',
    background: '#55C443',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (max-width: 960px)': {
      paddingTop: 20,
      justifyContent: 'flex-start',
      // alignItems: 'flex-start',
    },
  },
  detalleMessageError: {
    width: '100vw',
    height: '100vh',
    background: 'red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (max-width: 960px)': {
      paddingTop: 20,
      justifyContent: 'flex-start',
      // alignItems: 'flex-start',
    },
  },
  submit: {
    marginTop: 20,
  },
  column: {
    boxSizing: 'border-box',
    background: '#FFFFFF',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: 500,
    padding: '40px 10px',
    marginTop: 15,
    borderRadius: 10,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',

    '@media (max-width: 680px)': {
      margin: 5,
      width: `calc(100% - 10px)`,
    },
  },
})

const Message = ({ pagoStatus, pagoMessage }) => {
  if (!pagoStatus) {
    return (
      <Typography fontSize={20} fontWeight={700} textAlign='center' variant='p' color='red'>
        No se pudo realizar el pago
      </Typography>
    )
  }

  if (pagoStatus === 'rejected') {
    return (
      <Typography fontSize={20} fontWeight={700} textAlign='center' variant='p' color='red'>
        {pagoMessage}
      </Typography>
    )
  }

  if (pagoStatus === 'in_process') {
    return (
      <Typography fontSize={20} fontWeight={700} textAlign='center' variant='p' color='yellow'>
        {pagoMessage}
      </Typography>
    )
  }

  if (pagoStatus === 'approved') {
    return (
      <Typography fontSize={20} fontWeight={700} textAlign='center' variant='p' color='green'>
        {pagoMessage}
      </Typography>
    )
  }

  return <div></div>
}

const MessageGeneric = ({
  isError = false,
  precio = false,
  loading = false,
  data,
  ciudad,
  direccion,
  categoria,
  pagoStatus = false,
  pagoMessage = null,
}) => {
  const history = useHistory()
  const classes = useStyles()

  if (isError) {
    return (
      <div className={classes.detalleMessageError}>
        <div style={{ marginBottom: 20 }}>
          <SimpleImage height={60} title='Desafio de escape' image={Error} />
        </div>
        <Typography fontSize={25} textAlign='center' color='white' variant='h3'>
          LO LAMENTAMOS!
        </Typography>
        <Typography fontSize={20} textAlign='center' color='white' variant='h3'>
          {pagoMessage || 'ERROR AL EFECTUARL EL PAGO'}
        </Typography>
        <div className={classes.column}>
          <Button
            onClick={() => {
              history.push('/')
            }}
            color='secondary'
          >
            VOLVER A LA HOME
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.detalleMessage}>
      <div style={{ marginBottom: 20 }}>
        <SimpleImage height={60} title='Desafio de escape' image={Succesfull} />
      </div>
      <Typography fontSize={25} textAlign='center' color='white' variant='h3'>
        ¡FELICITACIONES!
      </Typography>
      <Typography fontSize={20} textAlign='center' color='white' variant='h3'>
        ALQUILADO CORRECTAMENTE
      </Typography>
      <div className={classes.column}>
        <div style={{ marginBottom: 10 }}>
          <Typography fontSize={21} fontWeight={700} textAlign='center' variant='h4'>
            RESUMEN DE ALQUILER
          </Typography>
          <Divider />
        </div>
        <Typography fontSize={20} textAlign='center' className={classes.subTitle} variant='h4'>
          {categoria}
        </Typography>
        <Typography fontSize={18} textAlign='center' color='grey' variant='p'>
          {ciudad}
        </Typography>
        <Typography fontSize={16} textAlign='center' variant='p' color='grey'>
          {direccion}
        </Typography>
        <div style={{ marginTop: 10 }}>
          <Typography fontSize={16} fontStyle={'italic'} textAlign='center' variant='p' color='grey'>
            precio final
          </Typography>
          <Typography fontSize={20} fontWeight={700} textAlign='center' variant='p' color='grey'>
            {`$${precio}`}
          </Typography>
          <Message pagoStatus={pagoStatus} pagoMessage={pagoMessage} />
        </div>
        <div style={{ marginTop: 10, marginBottom: 20 }}>
          <ItemSelected className={classes.item} checkout title={data} />
        </div>
        <Button
          onClick={() => {
            history.push('/')
          }}
          color='secondary'
        >
          VOLVER A LA HOME
        </Button>
      </div>
    </div>
  )
}

export default MessageGeneric
