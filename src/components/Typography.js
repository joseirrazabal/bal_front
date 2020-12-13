import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  Typography: ({
    fontSize,
    fontWeight,
    color,
    margin,
    textAlign,
    fontStyle,
    lineHeight
  }) => ({
    width: '100%',
    color: color || theme.palette.secondary.main,
    fontSize: fontSize,
    fontWeight: fontWeight,
    margin: margin,
    textAlign: textAlign || 'left',
    fontStyle: fontStyle,
    lineHeight: lineHeight,
  }),
}))

const Typography = ({
  children,
  className,
  variant = 'h1',
  fontSize = 18,
  fontWeight = 300,
  lineHeight = null,
  color,
  fontStyle = 'normal',
  margin = 0,
  textAlign,
}) => {
  const classes = useStyles({
    fontSize,
    fontWeight,
    color,
    margin,
    textAlign,
    fontStyle,
    lineHeight
  })

  return React.createElement(
    variant,
    {
      className: `${classes.Typography} ${className}`
    },
    children
  )
}

export default React.memo(Typography)
