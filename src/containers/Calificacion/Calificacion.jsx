import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useLazyQuery, gql, useQuery, useMutation } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { useHistory, useLocation, useParams, Redirect, Link as RouterLink } from 'react-router-dom'
import get from 'lodash/get'

import Rating from '@material-ui/lab/Rating'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'

import Loading from '../../components/Loading'

import CALIFICACION_GET from 'src/gql/calificacion/getFront'
import CALIFICACION_ADD from 'src/gql/calificacion/add'

const useStyles = makeStyles(theme => ({
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
      boxSizing: 'border-box',
    },
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
}

function IconContainer(props) {
  const { value, ...other } = props
  return <span {...other}>{customIcons[value].icon}</span>
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
}

const Qualify = () => {
  const classes = useStyles()
  const history = useHistory()
  const { token } = useParams()

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm()

  const [calificacionAdd, { data: dataAdd, loading: loadingAdd, error: errorAdd }] =
    useMutation(CALIFICACION_ADD)

  const { data: data, loading: loading } = useQuery(CALIFICACION_GET, {
    variables: { token },
    ssr: false,
    fetchPolicy: 'network-only',
  })

  const [rating, setRating] = useState(2)
  const [info, setInfo] = useState(false)

  const onSubmit = params => {
    console.log({ ...params, rating })

    calificacionAdd({ variables: { token, ...params, calificacion: rating } })
  }

  useEffect(() => {
    if (get(data, 'calificacionGetFront')) {
      setInfo(get(data, 'calificacionGetFront'))
    }
  }, [data])

  useEffect(() => {
    if (get(dataAdd, 'calificacionAddFront')) {
      setTimeout(() => {
        history.push('/home')
      }, 5000)
    }
  }, [dataAdd])

  if (loading) {
    return <Loading />
  }

  if (get(dataAdd, 'calificacionAddFront')) {
    return (
      <div className={classes.contentFull}>
        <div className={classes.centerMode}>
          <div>Gracias</div>
          <Button
            variant='link'
            fullWidth
            size='big'
            color='secondary'
            disabled={loadingAdd}
            component={RouterLink}
            to='/home'
          >
            Ir a la home
          </Button>
        </div>
      </div>
    )
  }

  if (!get(info, 'id')) {
    return (
      <div className={classes.contentFull}>
        <div className={classes.centerMode}>
          <div>La encuesta ya fue respondida</div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form} method='post'>
      <div className={classes.contentFull}>
        <div className={classes.centerMode}>
          <Typography variant='h4' textAlign='center'>
            Califica tu experiencia en {get(info, 'articulo.categoria.balneario.nombre', '')}
          </Typography>
          <Box component='fieldset' mb={3} borderColor='transparent'>
            <Typography component='legend'>Nos interesa tu opinión</Typography>
            <Rating
              name='Qualify'
              defaultValue={rating}
              getLabelText={value => customIcons[value].label}
              IconContainerComponent={IconContainer}
              onChange={(event, newValue) => {
                setRating(newValue)
              }}
            />
          </Box>
          <Grid xs={12} style={{ width: '100%', paddingBottom: '20px' }}>
            <Divider />
          </Grid>
          <Grid style={{ width: '100%' }}>
            <Typography variant='h5'>
              {rating < 3 ? 'Que podemos mejorar?' : 'Que fue lo que mas te gusto?'}
            </Typography>
            <textarea {...register('descripcion', { required: true, minLength: 10, maxLength: 200 })} />
            {errors.descripcion && <span>Debe escribir algo</span>}
          </Grid>
          <Button
            variant='contained'
            fullWidth
            size='big'
            color='secondary'
            // disabled
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
            disabled={loadingAdd}
            component={RouterLink}
            to='/home'
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Qualify
