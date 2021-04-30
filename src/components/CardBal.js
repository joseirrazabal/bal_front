import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import Button from './Button'
import Typography from './Typography'

import ImageDefault from '../assets/default-image.jpg'

const useStyles = makeStyles(theme => ({
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
    backgroundPosition: 'center',
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
    left: 0,
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
    left: 0,
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
    left: 0,
  },
  price: {
    lineHeight: '14px',
  },
  precioAnterior: {
    color: 'gray',
    textDecoration: 'line-through!important',
  },
}))

const CardBal = ({
  moludar,
  item,
  className,
  price = '0',
  oldPrice = '0',
  off = '14',
  nuevo = false,
  promo = false,
  onClick = () => {},
}) => {
  const image = get(item, 'categoria.balneario.imagenes.0.url', ImageDefault)

  const classes = useStyles({
    moludar,
    image,
  })

  const clasesDisponibles = ['nuevo', 'promo', 'descuento']

  return (
    <div className={`${className} ${classes.cardBal}`} onClick={onClick}>
      <div className={classes.image}>
        {get(item, 'precio.tag.nombre') && (
          <div className={classes[(clasesDisponibles.includes(item.clase) && item.clase) || 'nuevo']}>
            {' '}
            {get(item, 'precio.tag.texto')}
            {get(item, 'precio.tag.imagen') && (
              <img src={get(item, 'precio.tag.imagen')} width={50} height={50} />
            )}
          </div>
        )}
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
          {get(item, 'precioFinal') > 0 && (
            <div>
              <Typography
                color='black'
                variant='h2'
                textAlign='right'
                fontWeight='400'
                fontSize={18}
                className={classes.price}
              >
                ${get(item, 'precioFinal')}
              </Typography>

              {get(item, 'precioOld') > 0 && (
                <Typography
                  color='red'
                  textStyle='italic'
                  textAlign='right'
                  variant='p'
                  fontSize={11}
                  className={classes.precioAnterior}
                >
                  ${get(item, 'precioOld')}
                </Typography>
              )}

              <Typography color='black' textStyle='italic' textAlign='right' variant='p' fontSize={12}>
                {get(item, 'categoria.tipo.nombre')} x dia
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default React.memo(CardBal)
