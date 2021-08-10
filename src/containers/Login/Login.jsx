import React, { useContext, useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { useLocation, Redirect, Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import Typography from '../../components/Typography'

import loginTab from './tab'

import { signIn } from 'kit/login/utils'
import { ReconnectWSContext } from 'kit/shared/index'

import LOGIN_MUTATION from 'core/gql/user/login'

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
    height: 470,
    maxWidth: 400,
    padding: 20,
  },
}))

const Login = () => {
  const classes = useStyles()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const { setReconnectWS } = useContext(ReconnectWSContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION)

  // export default function Login() {
  //  const client = useApolloClient();
  //  const [login, { loading, error }] = useMutation(
  //   LOGIN_USER,
  //   {
  //    onCompleted({ login }) {
  //     localStorage.setItem('token', login);
  //     client.writeData({ data: { isLoggedIn: true } });
  //    }
  //   }
  //  );
  //
  //  if (loading) return <Loading />;
  //  if (error) return <p>An error occurred</p>;
  //
  //  return <LoginForm login={login} />;

  const [user, setUser] = useState()

  useEffect(() => {
    if (get(data, 'login.jwt')) {
      setReconnectWS(true) // reset webSocket
    }
  }, [data])

  const handleLogIn = provider => {
    const msg = loginTab(`${process.env.LOGIN_URL ? process.env.LOGIN_URL : ''}/auth/${provider}`)
    msg.then(user => {
      setReconnectWS(true) // reset webSocket
      signIn(get(user, 'jwt'), get(user, 'refreshToken'))
      setUser(user)
    })
  }

  const onSubmit = data => {
    login({ variables: data })
  }

  if (get(data, 'login.jwt')) {
    signIn(data.login.jwt, data.login.refreshToken)
    return <Redirect to={from} />
  }

  if (user) {
    return <Redirect to={from} />
  }

  return (
    <div className={classes.contentFull}>
      <div className={classes.centerMode}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <div className={classes.contentProfile}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography fontWeight={400} textAlign='center'>
                  Iniciar Sesion
                </Typography>
              </Grid>
              {error?.message}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Email'
                  color='secondary'
                  // defaultValue='ejemplo@gmail.com'
                  variant='outlined'
                  {...register('email', { required: 'Campo requerido' })}
                />
              </Grid>
              {errors.email && <p>{errors.email.message}</p>}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='password'
                  label='password'
                  color='secondary'
                  // defaultValue='password'
                  variant='outlined'
                  {...register('password', { required: 'Campo requerido' })}
                />
              </Grid>
              {errors.password && <p>{errors.password.message}</p>}
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
                  ENTRAR
                </Button>
                <Button
                  variant='outline'
                  fullWidth
                  size='big'
                  color='secondary'
                  component={RouterLink}
                  to='/recuperacion'
                >
                  olvidaste la clave?
                </Button>
                <Button
                  component={RouterLink}
                  to='/registro'
                  variant='outline'
                  fullWidth
                  size='big'
                  color='secondary'
                >
                  Registro
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography fontWeight={400} textAlign='center'>
                  Redes Sociales
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  // type='submit'
                  onClick={() => handleLogIn('google')}
                  fullWidth
                  variant='contained'
                  style={{ background: '#ea4335', color: 'white' }}
                >
                  GOOGLE
                </Button>
              </Grid>
              {/* <Grid item xs={12}>
                  <Button
                    variant='contained'
                    fullWidth
                    size='big'
                  >
                    Facebook
                  </Button>
                </Grid> */}
            </Grid>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
