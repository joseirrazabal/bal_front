import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { useLocation, Redirect, Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Typography from '../../components/Typography'

import loginTab from './tab'

import { signIn } from 'kit/login/utils'

import RESET_MUTATION from 'src/gql/user/reset'

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'cemter',
    backgroundImage: 'url(https://hoteldion.com.ar/wp-content/uploads/2020/06/Las-5-mejores-playas.jpg)',
    backgroundSize: 'cover',
    paddingTop: 85,
    minHeight: '100vh',
  },
  centerMode: {
    background: 'white',
    borderRadius: 6,
    width: '100%',
    height: 250,
    maxWidth: 400,
    padding: 20,
  },
  envioCorrecto: {
    background: '#55C443',
    borderRadius: 6,
    height: 70,
    width: '100%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const Recuperacion = () => {
  const classes = useStyles()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const [resetPassword, { data, error, loading }] = useMutation(RESET_MUTATION)

  const [info, setInfo] = useState()

  const onSubmit = data => {
    var host = window.location.protocol + '//' + window.location.host + '/recuperacion/password'
    resetPassword({ variables: { ...data, url: host } })
  }

  useEffect(() => {
    if (get(data, 'resetPassword')) {
      setInfo('Se envio un email de recuperacion')
    } else if (error) {
      setInfo(error.message)
    }
  }, [data, error])

  return (
    <React.Fragment>
      <Header />
      <div className={classes.contentFull}>
        <div className={classes.centerMode}>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
            <div className={classes.contentProfile}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label='Email'
                    // autoComplete='off'
                    fullWidth
                    color='secondary'
                    defaultValue=''
                    variant='outlined'
                    {...register('email', {
                      required: 'Campo requerido',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Valor invalido',
                      },
                    })}
                  />
                  {errors.email && <span role='alert'>{errors.email.message}</span>}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    fullWidth
                    size='big'
                    color='secondary'
                    style={{ color: 'white' }}
                    type='submit'
                    disabled={loading}
                  >
                    Enviar
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    fullWidth
                    size='big'
                    color='link'
                    style={{ color: 'white' }}
                    disabled={loading}
                    component={RouterLink}
                    to='/'
                  >
                    Cancelar
                  </Button>
                </Grid>
                
                {info && <div variant="span" className={classes.envioCorrecto}><p>{info}</p></div>}
              </Grid>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Recuperacion
