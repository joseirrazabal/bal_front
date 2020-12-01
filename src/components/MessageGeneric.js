import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import SimpleImage from './SimpleImage'

import MessageFalse from '../assets/invalid.svg'
import MessageTrue from '../assets/correct.svg'

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
  submit: {
    marginTop: 20
  }
})

const MessageGeneric = ({ isTrue = true, loading = false }) => {
  
  const classes = useStyles()

  if (loading) {
    return (
      <div className={classes.loadingStyle}>
        <div className={classes.centerContent}>
          <h2>Cargando...</h2>
          <SimpleImage
            height={60}
            title='Eureka Desafio de escape'
            image={'https://www.eurekaleg.com/assets/images/logo_2.png'}
          />
        </div>
      </div>
    )
  }

  if (isTrue) {
    return (
      <div className={classes.loadingStyle}>
        <div className={classes.centerContent}>
          <h2>Codigo Correcto</h2>
          <SimpleImage
            height={270}
            alt='cotizar aplicación gratis'
            title='Cotizar aplicación gratis'
            image={MessageTrue}
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={() => {
              window.location.reload()
            }}
          >
            siguiente nivel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.loadingStyle}>
      <div className={classes.centerContent}>
        <h2>Codigo Incorrecto</h2>
        <SimpleImage
          height={270}
          alt='cotizar aplicación gratis'
          title='Cotizar aplicación gratis'
          image={MessageFalse}
        />
        <Button
          fullWidth
          variant='contained'
          color='default'
          className={classes.submit}
          onClick={() => {
            window.location.reload()
          }}
        >
          volver a intentarlo
        </Button>
      </div>
    </div>
  )
}
export default React.memo(MessageGeneric)
