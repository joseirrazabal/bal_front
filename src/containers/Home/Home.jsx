import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import get from 'lodash/get'
import dayjs from 'dayjs'

import Button from '@material-ui/core/Button'
import NoSsr from '@material-ui/core/NoSsr'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Typography from '../../components/Typography'
import Search from '../../components/Search'
import CardBal from '../../components/CardBal'
import DialogSimpleComponent from '../../components/DialogSimple'
import Loading from '../../components/Loading'

import imageBackground from '../../assets/banner-fondo.jpeg'
import ImageCoronaVirus from '../../assets/pop-up.jpg'
import ImageBanner from '../../assets/banner-MP-compu.png'
import ImageBannerMobile from '../../assets/banner-MP-celu.png'

import BALNEARIO_LIST from 'gql/balneario/listUltimos'
import CIUDAD_LIST from 'gql/ciudad/list'

import SimpleImage from '../../components/SimpleImage'

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100%',
    height: '100vh',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    margin: '0 auto',
    width: 'calc(100% - 20px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: '40px 10px 10px 10px',

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
  },
  contentSearch: {
    width: '100%',
    height: '45vh',
    backgroundImage: 'url(' + imageBackground + ')',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (max-width: 1450px)': {
      height: '35vh',
    },

    '@media (max-width: 960px)': {
      height: '30vh',
    },
  },
  contentBanners: {
    width: '100%',
    height: '55vh',
    background: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (max-width: 1450px)': {
      height: '65vh',
    },

    '@media (max-width: 960px)': {
      height: '70vh',
      alignItems: 'flex-start',
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

      '& li': {
        width: '100%',
        margin: 5,

        '@media (max-width: 600px)': {
          width: '325px',
        },
      },
    },

    '@media (max-width: 600px)': {
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
      display: 'box',
    },
  },
  shadow: {
    background: 'rgba(0,0,0,.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  subTitle: {
    color: theme.palette.secondary,
    margin: '0px 0',
  },
  title: {
    fontSize: '50px!important',
    position: 'relative',
    zIndex: 2,
    width: '100%',
    lineHeight: '55px',
    maxWidth: 540,
    color: 'white!important',

    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  banner: {
    marginTop: 25,
    width: '100%',
    maxWidth: 1280,
    marginTop: -50,
    height: 'auto',
    borderRadios: 6,
    overflow: 'hidden',
    margin: 10,
    boxSizing: 'border-box',
    borderRadius: 6,
    cursor: 'pointer',
    display: 'block',

    '@media (max-width: 680px)': {
      display: 'none',
    },
  },
  bannerMobile: {
    marginTop: 25,
    width: '100%',
    height: 'auto',
    borderRadios: 6,
    overflow: 'hidden',
    margin: 10,
    boxSizing: 'border-box',
    borderRadius: 6,
    cursor: 'pointer',
    display: 'none',
    
    '@media (max-width: 680px)': {
      display: 'block',
    },
  },
  modalContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Home = () => {
  const classes = useStyles()
  const history = useHistory()

  const { data, loading } = useQuery(BALNEARIO_LIST)
  const { data: ciudades, loading: loadingCiudad } = useQuery(CIUDAD_LIST)

  if (loading || loadingCiudad) {
    return (
      <NoSsr>
        <Loading />
      </NoSsr>
    )
  }

  return (
    <React.Fragment>
      <Header />
      <div className={classes.contentFull}>   
        <div className={classes.contentSearch}>
          <div className={classes.shadow} />
          <div className={classes.container}>
            <Typography fontWeight="900" className={classes.title} varian='h1'>
              DISFRUTAR TU LUGAR
            </Typography>
            <Search
              ciudades={ciudades}
            />
          </div>
        </div>
        <div className={classes.contentBanners}>
          <div className={classes.containerMobile}>
            <div className={classes.banner}>
              <SimpleImage image={ImageBanner} width={'100%'} />
            </div>
            <div className={classes.bannerMobile}>
              <SimpleImage image={ImageBannerMobile} width={'100%'} />
            </div>
            <div>
              <Typography
                fontWeight={700}
                fontSize={20}
                textAlign='center'
                className={classes.subTitle}
                varian='h2'
              >
                Últimos Balnearios
              </Typography>
            </div>
            <div className={classes.contentSlider}>
              <ul>
                {get(data, 'balnearioListFrontUltimos', [])
                  .slice(0, 3)
                  .map((item, i) => {
                    return (
                      <li key={i}>
                        <CardBal
                          moludar
                          nuevo
                          item={item}
                          onClick={() => {
                            const dia = dayjs().format('DD-MM-YYYY')
                            history.push(`/detalle/${get(item, '_id')}/${dia}/${dia}`)
                          }}
                        />
                      </li>
                    )
                  })}
              </ul>
            </div>
            <DialogSimpleComponent>
              <div className={classes.modalContent}>
                <SimpleImage image={ImageCoronaVirus} width="100%" />
                <a href="https://www.argentina.gob.ar/sites/default/files/protocolo_-playas_5.pdf" width="100%" style={{textDecoration: 'none', marginTop: 15}}>
                  <Button color="primary" variant='contained'>
                    ver protocolos
                  </Button>
                </a>
              </div>
            </DialogSimpleComponent>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Home
