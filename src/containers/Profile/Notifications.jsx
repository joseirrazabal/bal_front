import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
/* import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'; */

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Typography from '../../components/Typography';
import SimpleImage from '../../components/SimpleImage';

import NotiImage from '../../assets/campana.svg';

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100%',
    maxWidth: 800,
    margin: 'auto',
    paddingTop: 85,
    minHeight: '100vh',
    background: '#f2f2f2',
  },
  contentProfile: {
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    boxSizing: 'border-box',
    borderRadius: 6,
    marginBottom: 15,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    /* '&:hover': {
      'box-shadow': '0 3px 6px 0 rgba(0,0,0,.1)',
    }, */
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
  contentNoti: {
    background: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    boxSizing: 'border-box',
    borderRadius: 6,
    marginBottom: 15,
    cursor: 'pointer',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    '&:hover': {
      'box-shadow': '0 3px 9px 0 rgba(0,0,0,.1)',
    },

    '&.new': {
      border: '2px solid #55C443',
    },

    '&.old': {
      background: '#fcfcfc',
      opacity: 0.5,

      /* '& img': {
        opacity: 0.2,
      }, */
    },

    '& .image': {
      //width: 100,,
      paddingRight: 40
    },
  },
}))

const Notifications = () => {

  const classes = useStyles()

  return (
    <React.Fragment>
      <Header />
      <div className={classes.contentFull}>
        <form className={classes.form}>
          <div className={classes.contentProfile}>
            <Typography>Notificaciones</Typography>
          </div>
          <div className={`${classes.contentNoti} new`}>
            <div className="image">
              <SimpleImage height={60} image={NotiImage} />
            </div>
            <div className="content">
              Califica tu experiencia con nostros
            </div>
          </div>
          <div className={`${classes.contentNoti} old`}>
            <div className="image">
              <SimpleImage height={60} image={NotiImage} />
            </div>
            <div className="content">
              Promo Imperdible
            </div>
          </div>
          <div className={`${classes.contentNoti} old`}>
            <div className="image">
              <SimpleImage height={60} image={NotiImage} />
            </div>
            <div className="content">
              Promo Imperdible
            </div>
          </div>
          <div className={`${classes.contentNoti} old`}>
            <div className="image">
              <SimpleImage height={60} image={NotiImage} />
            </div>
            <div className="content">
              Promo Imperdible
            </div>
          </div>
          {/* <div className={classes.contentProfile}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button variant='contained' size='small' disabled color='secondary'>
                  Guardar Cambios
                </Button>
              </Grid>
            </Grid>
          </div> */}
        </form>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Notifications
