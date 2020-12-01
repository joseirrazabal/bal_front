import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  buttonStyles: ({border, width, height}) => ({
    height: height || 60,
    fontSize: 14,
    width: width || '100%',
    maxWidth: 250,
    margin: 0,
    color: 'white',
    background: theme.palette.secondary.main,
    borderRadius: border || 6
  })
}));

const ButtonComponent = ({children, onClick, border, width, size = 'small', height}) => {

  const classes = useStyles({border, width, height});
  
  return(
    <Button size={size} onClick={onClick} variant="contained" color="secondary" className={classes.buttonStyles}>
      {children}
    </Button>
  )
}
export default ButtonComponent