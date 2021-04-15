import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  buttonStyles: ({ color }) => ({
    fontSize: '14!important',
    margin: 0,
    //background: theme.palette.secondary.main,

    '& span': {
      color: color || 'white!important',
    },
  }),
}))

const ButtonComponent = ({
  disabled = false,
  disableElevation = false,
  children,
  type = 'button',
  onClick,
  border,
  width,
  size = 'small',
  height,
  color,
  colorBg = 'secondary',
  variant = 'contained',
}) => {
  const classes = useStyles({ border, width, height, color, variant, colorBg })

  return (
    <Button
      disabled={disabled}
      disableElevation={disableElevation}
      type={type}
      size={size}
      onClick={onClick}
      variant={variant}
      color={colorBg}
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
