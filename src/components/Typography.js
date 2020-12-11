import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  Typography: () => ({
    width: '100%',
    color: theme.palette.secondary.main,
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
  textAlign = 'left',
}) => {
  const classes = useStyles()

  return React.createElement(
    variant,
    {
      className: `${className} ${classes.Typography}`,
      style: {
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color,
        margin: margin,
        textAlign: textAlign,
        fontStyle: fontStyle,
        lineHeight: lineHeight,
      },
    },
    children
  )
}

export default React.memo(Typography)
