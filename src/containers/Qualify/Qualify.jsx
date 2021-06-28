import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  contentFull: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'cemter',
    /* background: 'rgba(0,0,0,.6)', */
    background: theme.palette.secondary.dark,
    paddingTop: 85,
    minHeight: '100vh',
  },
  centerMode: {
    background: 'white',
    borderRadius: 6,
    width: '100%',
    height: 400,
    maxWidth: 500,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    '& svg': {
        height: 60,
        width: 60,
        //color: theme.palette.secondary.main
    },

    '& textarea': {
        width: '100%',
        minHeight: 120,
        height: 'auto',
        borderRadius: 6,
        border: '1px solid silver',
        boxSizing: 'border-box'
    }
  },
}))

const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: 'La experiencia fue muy mala',
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: 'No volveria a ir',
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: 'Fue buena, pero hay cosas a mejorar',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: 'buena experiencia',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: 'Super recomendable',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

const Qualify = () => {

  const classes = useStyles()

  return (
    <React.Fragment>
      <div className={classes.contentFull}>
        <div className={classes.centerMode}>
          <Typography variant="h4" textAlign="center">
            Califica tu experiencia
          </Typography>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Nos interesa tu opinión</Typography>
                <Rating
                    name="Qualify"
                    defaultValue={2}
                    getLabelText={(value) => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                />
            </Box>
            <Grid xs={12} style={{ width: '100%', paddingBottom: '20px'}}>
                <Divider />
            </Grid>
            <Grid style={{ width: '100%'}}>
                <Typography variant="h5">Que podemos mejorar?</Typography>
                <textarea>
                    hola
                </textarea>
            </Grid>
            <Button
                variant='contained'
                fullWidth
                size='big'
                color='secondary'
                disabled
                type='submit'
                style={{ color: 'white' }}
            >
            enviar calificacion
            </Button>
            <Button
                variant='link'
                fullWidth
                size='big'
                color='secondary'
                type='submit'
            >
            no calificar
            </Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Qualify
