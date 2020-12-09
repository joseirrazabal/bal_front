import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams } from 'react-router-dom'
import get from 'lodash/get'

import Button from './Button'
import Typography from './Typography'

const useStyles = makeStyles({
  cardBal: ({ moludar = false }) => ({
    float: 'left',
    width: !moludar ? 'calc(100% / 3 - 10px)' : '100%',
    height: 'auto',
    margin: 5,
    borderRadius: 6,
    overflow: 'hidden',
    boxSizing: 'border-box',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
    cursor: 'pointer',

    '&:hover': {
      'box-shadow': '0 3px 6px 0 rgba(0,0,0,.1)',
    },
    '@media (max-width: 960px)': {
      width: 'calc(100% / 2 - 10px)',
    },
    '@media (max-width: 750px)': {
      width: 'calc(100% / 1 - 10px)',
    },
  }),
  image: ({ image }) => ({
    width: '100%',
    height: 170,
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
  }),
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    boxSizing: 'border-box',
    background: '#F9F8F7',

    '& a': {
      textDecoration: 'none'
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
})

const CardBal = ({ moludar, item, className }) => {
  const image = get(
    item,
    'imagenes.0.url',
    'https://ss-static-01.esmsv.com/id/87403/galeriaimagenes/obtenerimagen/?id=37&tipoEscala=stretch&width=2000&height=1119'
  )

  const classes = useStyles({ moludar, image })
  const history = useHistory()

  return (
    <div className={`${className} ${classes.cardBal}`}>
      <div className={classes.image}></div>
      <div className={classes.content}>
        <div className={classes.data}>
          <Typography variant="h2">{get(item, 'nombre')}</Typography>
          <Typography variant="p">{get(item, 'ciudad.nombre')}</Typography>
        </div>
        <div>
          <Button
            size='small'
            height='auto'
            onClick={() => {
              history.push(`/detalle/${get(item, '_id')}`)
            }}
          >
            DETALLE
          </Button>
        </div>
      </div>
    </div>
  )
}
export default React.memo(CardBal)
