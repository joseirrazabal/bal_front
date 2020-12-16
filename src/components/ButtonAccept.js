import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    width: '100%',
    maxWidth: 280,
  },
  buttonSuccess: {
    height: 48,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const ButtonAcceptComponent = ({ children, type = 'button', loading = false }) => {
  const classes = useStyles()

  const buttonClassname = clsx({
    [classes.buttonSuccess]: loading,
  })

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          type={type}
          variant='contained'
          color='secondary'
          fullWidth
          className={buttonClassname}
          disabled={loading}
        >
          {loading ? 'Reservando...' : children}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  )
}
export default ButtonAcceptComponent
