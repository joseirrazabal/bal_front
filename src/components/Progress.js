import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Countdown from 'react-countdown'
import dayjs from 'dayjs'

import { NoSsr } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Check from '@material-ui/icons/Check'
import SettingsIcon from '@material-ui/icons/Settings'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import VideoLabelIcon from '@material-ui/icons/VideoLabel'
import StepConnector from '@material-ui/core/StepConnector'
import LinearProgress from '@material-ui/core/LinearProgress'

import SimpleImage from '../components/SimpleImage'

import IconTime from '../assets/004-clock-2.svg'
import IconTimeOut from '../assets/003-clock-1.svg'

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#d6b930',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#d6b930',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector)

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
})

const QontoStepIcon = props => {
  const classes = useQontoStepIconStyles()
  const { active, completed } = props

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  )
}

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
})

const ColorlibStepIcon = props => {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    background: 'rgba(255,255,255,0.9)',
    maxWidth: 700,
    margin: '0 auto',
    borderRadius: 10,
    marginTop: 10,
    overflow: 'hidden',
    '@media (max-width: 800px)': {
      width: 'calc(100% - 20px)',
      margin: 10,
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  label: {
    '& span': {
      marginTop: '0!important',
    },
  },
  timer: {
    maxWidth: 525,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
    '@media (max-width: 800px)': {
      padding: '0 10px',
    },
  },
}))

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    window.location.reload()
    return <div>Fin</div>
  } else {
    // Render a countdown
    return (
      <p
        style={{
          margin: 0,
          width: '100%',
          textAlign: 'center',
        }}
      >
        Quedan{' '}
        <span style={{ color: 'red' }}>
          {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>{' '}
        para finalizar
      </p>
    )
  }
}

const CustomizedSteppers = ({ total = 1, actual = 1, expira = dayjs() }) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(actual)
  const [progress, setProgress] = useState(0)
  const steps = new Array(total)

  return (
    <div className={classes.root}>
      <Stepper
        style={{ padding: 10 }}
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {Array.from(steps).map((label, index) => (
          <Step key={index}>
            <StepLabel className={classes.label} StepIconComponent={QontoStepIcon}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className={classes.timer}>
        <NoSsr>
          <div
            style={{
              padding: 5,
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Countdown date={dayjs(expira).format()} renderer={renderer} />
          </div>
        </NoSsr>
        {/* <div style={{ marginTop: 5, marginRight: 10 }}> */}
        {/*   <SimpleImage image={IconTime} height={20} /> */}
        {/* </div> */}
        {/* <div style={{ width: '100%' }}> */}
        {/*   <LinearProgress variant='determinate' value={progress} /> */}
        {/* </div> */}
        {/* <div style={{ marginTop: 5, marginLeft: 10 }}> */}
        {/*   <SimpleImage image={IconTimeOut} height={20} /> */}
        {/* </div>  */}
      </div>
    </div>
  )
}

export default React.memo(CustomizedSteppers)
