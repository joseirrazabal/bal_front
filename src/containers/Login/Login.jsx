import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useLocation, Redirect } from 'react-router-dom'
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
    height: 420,
    maxWidth: 400,
    padding: 20,
  },
}))

const Login = () => {
  const classes = useStyles()
  const location = useLocation()

  const { from } = location.state || { from: { pathname: '/' } }

  const [user, setUser] = useState()

  const [login, { data, error }] = useMutation(LOGIN_MUTATION)

  const handleLogIn = provider => {
    const msg = loginTab(`${process.env.LOGIN_URL ? process.env.LOGIN_URL: ''}/auth/${provider}`)
    msg.then(user => {
      signIn(get(user, 'jwt'), get(user, 'refreshToken'))
      setUser(user)
    })
  }

  if (user) {
    return <Redirect to={from} />
  }

  return (
    <React.Fragment>
      <Header />
      <div className={classes.contentFull}>
        <div className={classes.centerMode}>
          <form className={classes.form}>
            <div className={classes.contentProfile}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography fontWeight={400} textAlign='center'>
                    Iniciar Sesion
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='email'
                    id='email'
                    label='Email'
                    color='secondary'
                    defaultValue='ejemplo@gmail.com'
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='password'
                    type='password'
                    id='password'
                    label='password'
                    color='secondary'
                    defaultValue='password'
                    variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    fullWidth
                    size='big'
                    color='secondary'
                    style={{ color: 'white' }}
                  >
                    ENTRAR
                  </Button>
                  <Button variant='outline' fullWidth size='big' color='secondary'>
                    olvidaste la clave?
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
                    className={classes.google}
                  >
                    GOOGLE
                  </Button>

                  {/* <Button variant="contained" fullWidth size="big" style={{ background: '#3664a2', color: 'white' }}> */}
                  {/*   Google */}
                  {/* </Button> */}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    fullWidth
                    size='big'
                    style={{ background: '#ea4335', color: 'white' }}
                  >
                    Facebook
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Login
