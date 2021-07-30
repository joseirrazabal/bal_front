import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { useLocation, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import Typography from '../../components/Typography'

import loginTab from './tab'

import { signIn } from 'kit/login/utils'

import SIGNUP_MUTATION from 'src/gql/user/signup'

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
    height: 420,
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
    alignItems: 'center',
  },
}))

const Register = () => {
  const classes = useStyles()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const password = watch('password')

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION)

  const [info, setInfo] = useState()
  const [infoError, setInfoError] = useState()

  const onSubmit = data => {
    var host = window.location.protocol + '//' + window.location.host + '/registro/confirmacion'
    signup({ variables: { ...data, url: host } })
  }

  useEffect(() => {
    if (get(data, 'signup')) {
      setInfo('Se envio un email de verificacion')
    } else if (error) {
      setInfoError(error.message)
    }
  }, [data, error])

  return (
    <div className={classes.contentFull}>
      <div className={classes.centerMode}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <div className={classes.contentProfile}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label='Nombre'
                  // autoComplete='off'
                  fullWidth
                  color='secondary'
                  defaultValue=''
                  variant='outlined'
                  {...register('name', { required: 'Campo requerido' })}
                />
                {errors.name && <span role='alert'>{errors.name.message}</span>}
              </Grid>
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
                <TextField
                  label='Password'
                  // autoComplete='off'
                  inputProps={{
                    autoComplete: 'new-password',
                  }}
                  fullWidth
                  type='password'
                  id='password'
                  color='secondary'
                  defaultValue=''
                  variant='outlined'
                  {...register('password', { required: 'Campo requerido' })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Repetir password'
                  fullWidth
                  type='password'
                  color='secondary'
                  defaultValue=''
                  variant='outlined'
                  {...register('password_repeat', {
                    validate: value => value === password || 'las contraseñas no coinciden',
                  })}
                />
                {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
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
                  Registrar
                </Button>
              </Grid>
              {info && (
                <div variant='span' className={classes.envioCorrecto}>
                  <p>{info}</p>
                </div>
              )}
              {infoError && (
                <div variant='span' className={classes.envioCorrecto}>
                  <p>{infoError}</p>
                </div>
              )}
            </Grid>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
