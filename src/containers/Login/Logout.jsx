import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useLocation, Redirect } from 'react-router-dom'

import { useLogout } from 'kit/login/utils'

import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  content: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 20000,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelt: 'center',
    alignItems: 'center',
    background: 'rgba(255,255,255,.8)',
  },
  center: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

const Logout = ({ cancel }) => {
  const classes = useStyles()
  const history = useHistory()
  const [setUseFrom, setLogout, setPath] = useLogout()

  const handleLogout = useCallback(e => {
    e.preventDefault()
    setPath('/')
    setUseFrom(false)
    setLogout(true)
  }, [])

  const handleCancel = useCallback(e => {
    e.preventDefault()
    history.push('/')
    // cancel()
  }, [])

  return (
    <div className={classes.content}>
      <div className={classes.center}>
        <h2>Seguro que quierer salir?</h2>
        <div style={{ display: 'flex' }}>
          <Button fullWidth variatn='outlined' color='secondary' onClick={handleCancel}>
            cancelar
          </Button>
          <Button fullWidth variant='contained' onClick={handleLogout}>
            Salir
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Logout
