import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import Button from './Button'
import Typography from './Typography'

import ImageDefault from '../assets/default-image.jpg'

const useStyles = makeStyles((theme) => ({
  cardBal: ({ moludar = false }) => ({
    float: 'left',
    //width: !moludar ? 'calc(100% / 3 - 10px)' : '100%',
    width: '100%',
    height: 'auto',
    //margin: 5,
    borderRadius: 6,
    overflow: 'hidden',
    //boxSizing: 'border-box',
    border: '1px solid #ccc',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
    cursor: 'pointer',

    '&:hover': {
      'box-shadow': '0 3px 6px 0 rgba(0,0,0,.1)',
    },
    '@media (max-width: 960px)': {
      width: !moludar ? 'calc(100% / 2 - 10px)' : '100%',
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
  }
}))

const CardBal = ({ moludar, item, className, nuevo = false, onClick = () => {} }) => {
  const image = get(
    item,
    'imagenes.0.url',
    ImageDefault
  )

  const classes = useStyles({ moludar, image })

  return (
    <div className={`${className} ${classes.cardBal}`}>
      <div className={classes.image}>
        {nuevo && <div className={classes.nuevo}> NUEVO</div>}
      </div>
      <div className={classes.content}>
        <div className={classes.data}>
          <Typography variant='h2' fontWeight='400' fontSize={18}>
            {get(item, 'nombre')}
          </Typography>
          <Typography color='black' variant='p' fontSize={13}>
            {get(item, 'ciudad.nombre')}
          </Typography>
        </div>
        <div>
          <Button size='small' height='auto' onClick={onClick}>
            DETALLE
          </Button>
        </div>
      </div>
    </div>
  )
}
export default React.memo(CardBal)
