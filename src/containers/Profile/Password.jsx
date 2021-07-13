import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { useLocation, useParams, Redirect, Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Typography from '../../components/Typography'

import { signIn } from 'kit/login/utils'

import CHANGE_MUTATION from 'src/gql/user/changePasswordUser'
import CURRENT_USER from 'core/gql/user/currentUser'

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
}))

const Password = () => {
  const classes = useStyles()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const { token } = useParams()

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()
  const password = watch('password')

  const [changePassword, { data, error, loading }] = useMutation(CHANGE_MUTATION)

  const [getUser, { data: dataUser, loading: loadingUser }] = useLazyQuery(CURRENT_USER, {
    ssr: false,
    fetchPolicy: 'cache',
  })

  const [user, setUser] = useState(null)
  const [info, setInfo] = useState()

  useEffect(() => {
    if (dataUser) {
      setUser(get(dataUser, 'currentUser'))
    }
  }, [dataUser])

  useEffect(() => {
    if (get(data, 'changePasswordUser')) {
      setInfo('Se cambio la contraseña')
    } else if (error) {
      setInfo(error.message)
    }
  }, [data, error])

  useEffect(() => {
    getUser()
  }, [])

  const onSubmit = data => {
    changePassword({
      variables: { password: get(data, 'old_password'), newPassword: get(data, 'password') },
    })
  }

  return (
    <React.Fragment>
      <Header />
      <div className={classes.contentFull}>
        <div className={classes.centerMode}>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
            <div className={classes.contentProfile}>
              <Grid container spacing={2}>
                {user && <div>Cambiar password de {user.name}</div>}
                <Grid item xs={12}>
                  <TextField
                    label='Contraseña actual'
                    // autoComplete='off'
                    inputProps={{
                      autoComplete: 'old_password',
                    }}
                    fullWidth
                    type='password'
                    color='secondary'
                    defaultValue=''
                    variant='outlined'
                    {...register('old_password', { required: 'Campo requerido' })}
                  />
                  {errors.old_password && <p>{errors.old_password.message}</p>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='nueva contraseña'
                    // autoComplete='off'
                    inputProps={{
                      autoComplete: 'new-password',
                    }}
                    fullWidth
                    type='password'
                    color='secondary'
                    defaultValue=''
                    variant='outlined'
                    {...register('password', { required: 'Campo requerido' })}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label='Repetir contraseña'
                    fullWidth
                    type='password'
                    color='secondary'
                    defaultValue=''
                    variant='outlined'
                    {...register('password_repeat', {
                      validate: value => value === password || 'Las contraseñas deben ser iguales',
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
                    disabled={loading}
                    component={RouterLink}
                    to='/profile'
                  >
                    Cancelar
                  </Button>
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
                    Cambiar
                  </Button>
                </Grid>
                {info}
              </Grid>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Password
