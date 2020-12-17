import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import LinearProgress from '@material-ui/core/LinearProgress'

import SimpleImage from './SimpleImage'
// Assets
import Image from '../assets/icon-carpa.svg'

const useStyles = makeStyles({
  loadingStyle: {
    position: 'fized',
    zIndex: 1,
    width: '100vw',
    height: `100%`,
    top: 0,
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  centerContent: {
    width: '100%',
    padding: 20,
    maxWidth: 300,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  line: {
    borderRadius: 20,
    marginTop: 10,
    height: 10,
    width: '100%',
    display: 'block',
  },
})

const Loading = () => {
  const classes = useStyles()
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className={classes.loadingStyle}>
      <div className={classes.centerContent}>
        <SimpleImage
          height={80}
          title='Alamar - Alquiler de carpas en balnearios'
          title='Alamar - Alquiler de carpas en balnearios'
          image={Image}
        />
        <LinearProgress className={classes.line} variant='determinate' color="secondary" value={progress} />
      </div>
    </div>
  )
}
export default Loading
