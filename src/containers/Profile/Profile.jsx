import React, { useState, useEffect } from 'react'
import { useLocation, useParams, Redirect, Link as RouterLink } from 'react-router-dom'
import { useLazyQuery, gql, useQuery, useMutation, useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
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
import EditIcon from '@material-ui/icons/Edit'

import Loading from '../../components/Loading'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Typography from '../../components/Typography'

import CURRENT_USER from 'core/gql/user/currentUser'
import PROFILE_UPDATE from 'core/gql/user/update'
import SINGLE_UPLOAD_MUTATION from 'core/gql/image'

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
    // marginRight: 10,
  },
  editImage: {
    position: 'absolute',
    background: 'rgba(255,255,255,.7)',
    // padding: 10,
    boxSizing: 'border-box',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',

    '&:hover': {
      background: 'rgba(255,255,255,.9)',
    },

    '& svg': {
      color: theme.palette.secondary.main,
      cursor: 'pointer',
      padding: 10,
    },
  },
  input: {
    display: 'none',
  },
}))

const Profile = () => {
  const classes = useStyles()

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm()

  const [profileUpdate, { data: dataAdd }] = useMutation(PROFILE_UPDATE)
  const [uploadFileMutation, { data: dataFile, loading, error }] = useMutation(SINGLE_UPLOAD_MUTATION)
  const { data: dataUser, loading: loadingUser } = useQuery(CURRENT_USER, {
    ssr: false,
    fetchPolicy: 'network-only',
  })

  const [imagen, setImagen] = useState(false)
  const [user, setUser] = useState(null)
  const [state, setState] = useState({
    checkedA: false,
    checkedB: true,
  })

  useEffect(() => {
    if (dataUser) {
      setUser(get(dataUser, 'currentUser'))
      setImagen(get(dataUser, 'currentUser.image'))
    }
  }, [dataUser])

  useEffect(() => {
    if (dataFile) {
      setImagen(dataFile.uploadFile.url)
    }
  }, [dataFile])

  const onChangeImage = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && uploadFileMutation({ variables: { file } })

  const onSubmit = params => {
    console.log(params)

    profileUpdate({ variables: { extras: params, image: imagen } })
  }

  if (loadingUser) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <Header />
      <div className={classes.contentFull}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} method='post'>
          {dataAdd && 'Guardado'}
          <div className={classes.contentProfile}>
            <ListItem alignItems='center' className={classes.listItem}>
              <ListItemAvatar style={{ position: 'relative', borderRadius: 50, overflow: 'hidden' }}>
                <Avatar className={classes.large} src={imagen} alt={get(user, 'name')} />
                <div className={`${classes.contentLevel}`}>
                  <input
                    id='contained-button-file'
                    className={classes.input}
                    type='file'
                    onChange={onChangeImage}
                  />
                  {loading ? (
                    <label htmlFor='contained-button-file'>
                      <div className={classes.editImage}>
                        <div>Loading...</div>
                      </div>
                    </label>
                  ) : (
                    get(user, 'provider') === 'local' && (
                      <label htmlFor='contained-button-file'>
                        <div className={classes.editImage} onClick={onChangeImage}>
                          <EditIcon />
                        </div>
                      </label>
                    )
                  )}
                </div>
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
                  label='Nombre completo'
                  color='secondary'
                  //defaultValue={get(user, 'name')}
                  defaultValue={get(dataUser, 'currentUser.name')}
                  variant='outlined'
                  disabled
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  // error
                  fullWidth
                  label='Email'
                  color='secondary'
                  //defaultValue={get(user, 'email')}
                  defaultValue={get(dataUser, 'currentUser.email')}
                  variant='outlined'
                  disabled
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  // error
                  // type='text'
                  {...register('telefono')}
                  autoFocus
                  fullWidth
                  label='Telefono'
                  color='secondary'
                  variant='outlined'
                  defaultValue={get(dataUser, 'currentUser.extras.telefono')}
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
                <Controller
                  name='recibirEmail'
                  control={control}
                  defaultValue={get(dataUser, 'currentUser.extras.recibirEmail', true)}
                  rules={{}}
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label='Quiero recibir Novedades a mi correo'
                      />
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item sm={6} xs={12}>
                {/* <Button color='secondary'>Eliminar Cuenta</Button> */}
                <Button
                  variant='contained'
                  //fullWidth
                  //size='big'
                  color='secondary'
                  style={{ color: 'white' }}
                  disabled={loading}
                  component={RouterLink}
                  to='/profile/password'
                >
                  Cambiar password
                </Button>
              </Grid>
            </Grid>
          </div>
          <div className={classes.contentProfile}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant='contained' size='small' type='submit' color='secondary'>
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
