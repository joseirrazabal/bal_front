import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import Button from './Button'
import Typography from './Typography'

import ImageDefault from '../assets/default-image.jpg'

const useStyles = makeStyles((theme) => ({
  cardBal: ({ moludar = false }) => ({
    float: 'left',
    width: '100%',
    height: 'auto',
    borderRadius: 6,
    overflow: 'hidden',
    border: '1px solid #ccc',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
    cursor: 'pointer',

    '&:hover': {
      'box-shadow': '0 3px 6px 0 rgba(0,0,0,.1)',
    },
    '@media (max-width: 600px)': {
      width: !moludar ? 'calc(100% / 1 - 10px)' : '100%',
    },
  }),
  image: ({ image }) => ({
    position: 'relative',
    width: '100%',
    height: 170,
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }),
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    boxSizing: 'border-box',
    background: '#F9F8F7',

    '& a': {
      textDecoration: 'none',
    },
  },
  data: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& h2': {
      margin: 0,
      fontSize: 16,
    },
    '& p': {
      fontSize: 12,
      fontStyle: 'italic',
    },
  },
  nuevo: {
    background: theme.palette.primary.main,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
    color: theme.palette.secondary.dark,
    padding: '5px 10px 5px 5px',
    borderRadius: '0 10px 10px 0',
    fontSize: 12,
    position: 'absolute',
    top: 10,
    left: 0
  },
  promo: {
    background: theme.palette.secondary.main,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
    color: 'white',
    padding: '5px 10px 5px 5px',
    borderRadius: '0 10px 10px 0',
    fontSize: 12,
    position: 'absolute',
    top: 10,
    left: 0
  },
  descuento: {
    fontSize: 11,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
    fontStyle: 'italic',
    borderRadius: '0 10px 10px 0',
    padding: '2px 6px',
    marginRight: 5,
    background: '#55C443',
    color: 'white',
    position: 'absolute',
    top: 35,
    left: 0
  },
  price: {
    lineHeight: '14px'
  },
  precioAnterior: {
    color: 'gray',
    textDecoration: 'line-through!important',
  }
}))

const CardBal = ({ 
  moludar, 
  item, 
  className, 
  price = '1200',
  oldPrice = '$1400',
  off = '14',
  nuevo = false, 
  promo = false, 
  onClick = () => {}
 }) => {

  const image = get(
    item,
    'imagenes.0.url',
    ImageDefault
  )

  const classes = useStyles({ 
    moludar, 
    image
   })

  return (
    <div className={`${className} ${classes.cardBal}`} onClick={onClick}>
      <div className={classes.image}>
        {nuevo && <div className={classes.nuevo}> NUEVO</div>}
        {promo && <div className={classes.promo}> BANCO MACRO</div>}
        {off && <spam className={classes.descuento}>{off}% OFF</spam>}
      </div>
      <div className={classes.content}>
        <div className={classes.data}>
          <div>
            <Typography variant='h2' fontWeight='400' fontSize={18}>
              {get(item, 'nombre')}
            </Typography>
            <Typography color='black' variant='p' fontSize={13}>
              {get(item, 'ciudad.nombre')}
            </Typography>
          </div>
          <div>
            <Typography color='black' variant='h2' textAlign="right" fontWeight='400' fontSize={18} className={classes.price}>
              ${price}
            </Typography>
            <Typography color='red' textStyle="italic" textAlign="right" variant='p' fontSize={11} className={classes.precioAnterior}>
              {oldPrice}
            </Typography>
            <Typography color='black' textStyle="italic" textAlign="right" variant='p' fontSize={12}>
              carpa x dia
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
export default React.memo(CardBal)
