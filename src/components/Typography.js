import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  Typography: ({ fontSize, fontWeight, color, fontStyle, margin, textAlign, lineHeight }) => ({
    width: '100%',
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: color || theme.palette.secondary.main,
    margin: margin,
    textAlign: textAlign,
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
  textAlign = 'left',
}) => {
  const classes = useStyles({
    fontSize,
    className,
    fontWeight,
    color,
    fontStyle,
    margin,
    textAlign,
    lineHeight,
  })

  return React.createElement(variant, { className: `${className}  ${classes.Typography}` }, children)
}

export default Typography
