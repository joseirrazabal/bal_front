import React from 'react'

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
    flexDirection: 'column'
  },
  form: {
    width: '100%'
  },
  listItemText: {
    textAlign: 'center',
    color: theme.palette.secondary.main
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    marginRight: 10
  },
}))

const Profile = () => {

  const classes = useStyles()
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <React.Fragment>
      <Header />
        <div className={classes.contentFull}> 
          <form className={classes.form}>  
            <div className={classes.contentProfile}>
              <ListItem alignItems="center" className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar className={classes.large} alt="Luiciano Recchini" src="https://media-exp1.licdn.com/dms/image/C4D03AQHJFBIXlYUrtw/profile-displayphoto-shrink_200_200/0/1615833330750?e=1623888000&v=beta&t=lPpLvHG1iD5SRWswy1R9bdiUEAtkVMvsxPv8Zg12dMU" />
                </ListItemAvatar>
                <ListItemText
                  primary="Biuenvenido"
                  className={classes.listItemText}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="black"
                      >
                        Luciano Recchini
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
            <div className={classes.contentProfile}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>
                      Datos personales
                    </Typography>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      // error
                      fullWidth
                      name="name"
                      id="name"
                      label="Nombre"
                      color="secondary"
                      defaultValue="Nombre"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      // error
                      fullWidth
                      name="apellido"
                      id="apellido"
                      label="Apellido"
                      color="secondary"
                      defaultValue="Apellido"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      // error
                      fullWidth
                      name="email"
                      id="email"
                      label="Email"
                      color="secondary"
                      defaultValue="Email"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      // error
                      fullWidth
                      type="number"
                      name="telefono"
                      id="telefono"
                      label="Telefono"
                      color="secondary"
                      defaultValue="Telefono"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>           
            </div>
            <div className={classes.contentProfile}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography fontWeight={700}>
                      Configuracion
                    </Typography>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControlLabel
                      control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                      label="Activar Notificaciones"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.checkedB}
                          onChange={handleChange}
                          name="checkedB"
                          color="secondary"
                        />
                      }
                      label="Quiero recibir Novedades a mi correo"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Button color="secondary">
                      Eliminar Cuenta
                    </Button>
                  </Grid>
                </Grid>           
            </div>
            <div className={classes.contentProfile}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button variant="contained" size="small" disabled color="secondary">
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