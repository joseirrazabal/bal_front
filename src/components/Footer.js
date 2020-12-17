import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  footer: {
    width: '100%',
    height: 60,
    background: 'black',
    position: 'relative',
    zIndex: 2,
  },
  contentLogo: {
    cursor: 'pointer',

    '@media (max-width: 1024px)': {},
  },
})

const Footer = () => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <div
        style={{
          padding: 0,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div className={classes.contentLogo}></div>
      </div>
    </div>
  )
}

export default Footer
