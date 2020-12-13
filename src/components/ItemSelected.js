import React from "react"
import { makeStyles } from "@material-ui/core/styles"
// Components
import SimpleImage from './SimpleImage'
// Assets
import IconSomb from '../assets/icon-sombri.svg'

const useStyles = makeStyles((theme) => ({
  itemSelected: {
    width: '100%',
    height: 130,
    margin: 5,
    border: '1px solid #ECEAEA',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
    cursor: 'pointer',

    '&:hover':{
      border: `2px solid ${theme.palette.secondary.main}`,
      'box-shadow': '0 3px 6px 0 rgba(0,0,0,.1)'
    }, 

    '& h2': {
      margin: 0,
      fontSize: 18,
      fontWeight: 400,
      color: theme.palette.secondary.main
    },

    '& p': {
      margin: 0,
      fontSize: 14,
      fontWeight: 400,
      color: 'gray'
    },

    "@media (max-width: 1024px)": {
      /* flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', */
    },
  },
  checkoutSelected: {
    width: '100%',
    height: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    background: 'white',
    padding: 10,
    border: `2px solid ${theme.palette.secondary.main}`,
    boxSizing: 'border-box',
    'box-shadow': '0 3px 6px 0 rgba(0,0,0,.1)',
    cursor: 'pointer',

    '& img': {
      marginRight: 20
    },

    '& h2': {
      margin: 0,
      fontSize: 18,
      fontWeight: 400,
      color: theme.palette.secondary.main
    },

    '& p': {
      margin: 0,
      fontSize: 14,
      fontWeight: 300,
      color: 'gray'
    },
  },
  selected: {
    width: '100%',
    height: 130,
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `3px solid #55C443`,
    boxSizing: 'border-box',
    'box-shadow': '0 3px 6px 0 rgba(0,0,0,.1)',
    cursor: 'pointer',

    '& h2': {
      margin: 0,
      fontSize: 18,
      fontWeight: 700,
      color: theme.palette.secondary.main
    },

    '& p': {
      margin: 0,
      fontSize: 14,
      fontWeight: 700,
      color: 'gray'
    },
  }
}));

const ItemSelected = ({
  active = false,
  checkout = false,
  dias = 3,
  icon = IconSomb,
  title = 'Alquilar Sombrilla',
  precio = '1200',
  className
}) => {

  const classes = useStyles();

  return (
    <div className={`${className} ${checkout ? classes.checkoutSelected : !active ? classes.itemSelected : classes.selected }`}>
      <div>
        <SimpleImage
          height={45}
          alt="Alquiler de Carpas en Balnearios"
          image={icon}
        />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{checkout ? `cantidad de dias ${dias}` : `${precio} por dia`}</p>
      </div>
    </div>
  );
};
export default ItemSelected;
