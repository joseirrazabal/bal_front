import React, { useState, useEffect } from 'react'
import { useLazyQuery, gql, useQuery, useApolloClient } from '@apollo/client'
import get from 'lodash/get'

import { makeStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Typography from '../../components/Typography'

import CURRENT_USER from 'core/gql/user/currentUser'

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100%',
    maxWidth: 800,
    margin: 'auto',
    paddingTop: 85,
    // paddingBottom: 50,
    minHeight: '100vh',
    background: '#f2f2f2',
  },
  contentProfile: {
    background: 'white',
    // minHeight: 200,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    boxSizing: 'border-box',
    borderRadius: 6,
    marginBottom: 15,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    '&:hover': {
      'box-shadow': '0 3px 6px 0 rgba(0,0,0,.1)',
    },
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  form: {
    width: '100%',
  },
  listItemText: {
    textAlign: 'center',
    color: theme.palette.secondary.main,
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    marginRight: 10,
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
    marginBottom: 15,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
  }
}))

const Profile = () => {
  const classes = useStyles()

  const { data: dataUser, loading: loadingUser } = useQuery(CURRENT_USER, {
    ssr: false,
    fetchPolicy: 'cache',
  })

  const [user, setUser] = useState(null)
  const [state, setState] = useState({
    checkedA: false,
    checkedB: true,
  })

  useEffect(() => {
    if (dataUser) {
      setUser(get(dataUser, 'currentUser'))
    }
  }, [dataUser])

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  if (loadingUser) {
    return false
  }

  return (
    <React.Fragment>
      <Header />
      <div className={classes.contentFull}>
        <form className={classes.form}>
          <div variant="span" className={classes.envioCorrecto}><p>Su Perfil ahora esta validado!</p></div>
          <div className={classes.contentProfile}>
            <ListItem alignItems='center' className={classes.listItem}>
              <ListItemAvatar>
                <Avatar className={classes.large} src={get(user, 'image')} alt={get(user, 'name')} />
              </ListItemAvatar>
              <ListItemText
                primary='Biuenvenido'
                className={classes.listItemText}
                secondary={
                  <React.Fragment>
                    <Typography component='span' variant='body2' color='black'>
                      {get(user, 'name')}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </div>
          <div className={classes.contentProfile}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>Datos personales</Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  // error
                  fullWidth
                  name='name'
                  id='name'
                  label='Nombre completo'
                  color='secondary'
                  defaultValue={get(user, 'name')}
                  variant='outlined'
                  disabled
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  // error
                  fullWidth
                  name='email'
                  id='email'
                  label='Email'
                  color='secondary'
                  defaultValue={get(user, 'email')}
                  variant='outlined'
                  disabled
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  // error
                  fullWidth
                  type='number'
                  name='telefono'
                  id='telefono'
                  label='Telefono'
                  color='secondary'
                  defaultValue='Telefono'
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.contentProfile}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography fontWeight={700}>Configuracion</Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControlLabel
                  control={<Switch checked={state.checkedA} onChange={handleChange} name='checkedA' />}
                  label='Activar Notificaciones'
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.checkedB}
                      onChange={handleChange}
                      name='checkedB'
                      color='secondary'
                    />
                  }
                  label='Quiero recibir Novedades a mi correo'
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button color='secondary'>Eliminar Cuenta</Button>
              </Grid>
            </Grid>
          </div>
          <div className={classes.contentProfile}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant='contained' size='small' disabled color='secondary'>
                  Guardar Cambios
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Profile
