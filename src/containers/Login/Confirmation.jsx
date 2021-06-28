import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { gql, useMutation } from '@apollo/client'
import { useHistory, useLocation, Redirect, useParams } from 'react-router-dom'
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

import CONFIRMATION_MUTATION from 'src/gql/user/signupConfirmation'

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

const Confirmation = () => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const { token } = useParams()
  const { from } = location.state || { from: { pathname: '/' } }

  const [confirmation, { data, error, loading }] = useMutation(CONFIRMATION_MUTATION)

  const [info, setInfo] = useState('Se esta validando el email')
  const [infoError, setInfoError] = useState()

  useEffect(() => {
    confirmation({ variables: { token } })
  }, [])

  useEffect(() => {
    if (get(data, 'signupConfirmation') === true) {
      setInfo('Se verifico correctamente')
      setTimeout(() => {
        history.push('/')
      }, 5000)
    } else if (get(data, 'signupConfirmation') === false) {
      setInfo(false)
      setInfoError('No se pudo verificar el email')
    } else if (error) {
      setInfo(false)
      setInfoError('Se produjo un error')
    }
  }, [data, error])

  return (
    <React.Fragment>
      <Header />
      <div className={classes.contentFull}>
        <div className={classes.centerMode}>
          {loading && <div>Cargando...</div>}
          {info && <div className={classes.contentProfile}>{info}</div>}
          {infoError && <div className={classes.contentProfile}>{infoError}</div>}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Confirmation
