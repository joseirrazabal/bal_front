import React from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
// Components
import Button from './Button'
import Typography from './Typography'

const imageBackground = 'https://ss-static-01.esmsv.com/id/87403/galeriaimagenes/obtenerimagen/?id=37&tipoEscala=stretch&width=2000&height=1119';

const useStyles = makeStyles({
  cardBal: ({moludar  = false}) => ({
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
		}
  }),
  image: {
    width: '100%',
    height: 170,
    backgroundImage: `url(${imageBackground})`,
    backgroundSize: 'cover'
  },
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
      fontStyle: 'italic'
    },
  }
});

const CardBal = ({ moludar, className }) => {

  const classes = useStyles({moludar});

  return (
    <div className={`${className} ${classes.cardBal}`}>
      <div className={classes.image}>

      </div>
      <div className={classes.content}>
        <div className={classes.data}>
          <Typography variant="h2" fontWeight="500">Titulo del balneario</Typography>
          <Typography color="black" variant="p">Playa del mismo</Typography>
        </div>
        <div>
          <Link to="detalle">
            <Button size="small" height="auto">
              DETALLE
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CardBal;
