import React from 'react'
// Material
import { makeStyles } from '@material-ui/core/styles'
// Components
import Search from "../../components/Search"
import CardBal from '../../components/CardBal'
import Typography from '../../components/Typography'
// Assets
import imageBackground from '../../assets/fondo.jpg'

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100vw',
    height: '100vh',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1280,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: 10
  },
  containerMobile: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

/*     '@media (max-width: 960px)': {
      
    }, */
  },
  contentSearch: {
    width: '100vw',
    height: '50vh',
    background: 'red',
    backgroundImage: 'url(' + imageBackground + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    '@media (max-width: 960px)': {
      height: '40vh',
    },
  },
  contentBanners: {
    width: '100vw',
    height: '50vh',
    background: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (max-width: 960px)': {
      height: '60vh',
    },
  },
  contentSlider: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'strech',
    boxSizing: 'border-box',

    '& ul': {
      listStyle: 'none',
      display: 'inline-flex',
      width: '100%',
      padding: 0,

      '@media (max-width: 960px)': {
        width: '1000px'
      },

      '& li': {
        width: '100%',
        margin: 5
      },

    },

		'@media (max-width: 960px)': {
			overflowX: 'scroll',
      whiteSpace: 'nowrap',
      display: 'box'
		}
  },
  shadow: {
    background: 'rgba(0,0,0,.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  subTitle: {
    color: theme.palette.secondary,
    margin: '5px 0'
  },
  title: {
    position: 'absolute',
    fontSize: 50,
    width: '100%',
    lineHeight: '55px',
    maxWidth: 540,
    top: -160,
    left: 160,
    color: 'white',

    '@media (max-width: 960px)': {
      display: 'none'
		}
  }
}))

const Home = () => {

  const classes = useStyles()

  return (
    <div className={classes.contentFull}>
      <div className={classes.contentSearch}>
        <div className={classes.shadow} />
        <div className={classes.container}>
          <Typography className={classes.title} varian="h1">
            ALQUILER DE CARPAS 
            Y SOMBRILLAS
          </Typography>
          <Search styles={{
            position: 'absolute'
          }} />
        </div>
      </div>
      <div className={classes.contentBanners}>
        <div className={classes.containerMobile}>
          <Typography fontWeight={700} fontSize={25} textAlign="center" className={classes.subTitle} varian="h2">Mejores Balnearios</Typography>
          <div className={classes.contentSlider}>
            <ul>
              <li><CardBal moludar /></li>
              <li><CardBal moludar /></li>
              <li><CardBal moludar /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home