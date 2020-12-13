import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  buttonStyles: ({ color }) => ({
    // height: height || 60,
    // width: width || '100%',
    fontSize: '14!important',
    // maxWidth: 250,
    margin: 0,
    background: theme.palette.secondary.main,

    '& span': {
      color: color || 'white!important',
    }
  }),
}))

const ButtonComponent = ({
  children,
  type = 'button',
  onClick,
  border,
  width,
  size = 'small',
  height,
  color, 
  variant = 'secondary'
}) => {
  const classes = useStyles({ border, width, height, color })

  return (
    <Button
      type={type}
      size={size}
      onClick={onClick}
      variant='contained'
      color={variant}
      className={classes.buttonStyles}
      style={{
        height: height || '60px',
        width: width || '100%',
        borderRadius: border || 6,
      }}
    >
      {children}
    </Button>
  )
}

export default React.memo(ButtonComponent)
