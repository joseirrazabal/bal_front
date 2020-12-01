import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    margin: 5,
    background: 'white',
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',

    '& label': {
      fontSize: 12,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      padding: 10,

      '& span': {
        display: 'none'
      }
    },

    '& input': {
      border: 'none',
      borderBottom: '1px solid silver',
      padding: 10,
    },

    "@media (max-width: 960px)": {
      margin: '5px 0'
    }
  },
  inputError: {
    width: '100%',
    margin: 5,
    background: 'white',
    borderRadius: 6,
    display: 'flex',
    border: '1px solid red',
    flexDirection: 'column',
    boxSizing: 'border-box',

    '& label': {
      fontSize: 12,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      padding: 10,

      '& span': {
        display: 'block',
        color: 'red',
      }
    },

    '& input': {
      border: 'none',
      borderBottom: '1px solid red',
      padding: 10,
    },
    
    "@media (max-width: 960px)": {
      margin: '5px 0'
    }
  }
}));

const Input = ({
  label = 'Nombre',
  value = 'Ingresar Nombre',
  type = 'text',
  errorMessage = 'error',
  error = false
}) => {

  const [name, setName] = React.useState(value);
  const classes = useStyles();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className={`${!error ? classes.input : classes.inputError}`}>
      <label>{label} <span>{errorMessage}</span></label>
      <input onChange={handleChange} type={type} value={name} />
    </div>
  );
};
export default Input;