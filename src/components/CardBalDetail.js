import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import Button from './Button'
import Typography from './Typography'
import SimpleImage from './SimpleImage'

import IconPin from '../assets/icon-pin.svg'
import IconCity from '../assets/icon-ciudad.svg'

const useStyles = makeStyles((theme) => ({
  cardBal: ({ moludar = false }) => ({
    display: 'flex',
    width: '100%',
    height: 'auto',
    borderRadius: 6,
    overflow: 'hidden',
    boxSizing: 'border-box',
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
    maxWidth: 300,
    height: 170,
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
  }),
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,

    '& img': {
      marginRight: 5
    },
  },
  nuevo: {
    background: theme.palette.secondary.dark,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
    color: 'white',
    padding: '5px 10px 5px 5px',
    borderRadius: '0 10px 10px 0',
    fontSize: 12,
    position: 'absolute',
    top: 10,
    left: 0
  }
}))

const CardBalDetail = ({ moludar, item, className, nuevo = false, onClick = () => {} }) => {
  const image = get(
    item,
    'imagenes.0.url',
    'https://ss-static-01.esmsv.com/id/87403/galeriaimagenes/obtenerimagen/?id=37&tipoEscala=stretch&width=2000&height=1119'
  )

  const classes = useStyles({ moludar, image })

  return (
    <div className={`${className} ${classes.cardBal}`}>
      <div className={classes.image}>
        {nuevo && <div className={classes.nuevo}> NUEVO</div>}
      </div>
      <div className={classes.content}>
        <div className={classes.data}>
          <Typography variant='h2' fontWeight='400' fontSize={20}>
            {get(item, 'nombre')}
          </Typography>
          
          <div className={classes.flexRow}>
            <SimpleImage height={18} image={IconCity} />
            <Typography color='black' variant='p' fontSize={13}>
              {get(item, 'ciudad.nombre')}
            </Typography>
          </div>
          {get(item, 'direccion') && 
          <div className={classes.flexRow}>
            <SimpleImage height={18} image={IconPin} />
            <Typography color='black' fontStyle="italic" variant='p' fontSize={13}>
              {get(item, 'direccion')}
            </Typography>
          </div>
        }
        </div>
        <div>
          <Button size='small' height='auto' onClick={onClick}>
            VER BALNEARIO
          </Button>
        </div>
      </div>
    </div>
  )
}
export default React.memo(CardBalDetail)
