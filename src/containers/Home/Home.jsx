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

import imageBackground from '../../assets/fondo.jpg'
import ImageCoronaVirus from '../../assets/coronavirus_medidas.png'
import ImageBanner from '../../assets/banner.png'

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
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: 10,
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
    height: '35vh',
    backgroundImage: 'url(' + imageBackground + ')',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    '@media (max-width: 960px)': {
      height: '30vh',
    },
  },
  contentBanners: {
    width: '100%',
    height: '65vh',
    background: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

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
    position: 'absolute',
    fontSize: '50px!important',
    width: '100%',
    lineHeight: '55px',
    maxWidth: 540,
    top: -160,
    left: 160,
    color: 'white!important',

    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  banner: {
    background: 'white',
    marginTop: 25,
    width: '100%',
    height: 'auto',
    borderRadios: 6,
    overflow: 'hidden',
    margin: 10,
    boxSizing: 'border-box',
    border: '1px solid gray',
    borderRadius: 6,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& p': {
      color: 'gray',
    },

    '@media (max-width: 680px)': {
      height: 'auto',
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
            <Typography className={classes.title} varian='h1'>
              ALQUILER DE CARPAS Y SOMBRILLAS
            </Typography>
            <Search
              ciudades={ciudades}
              styles={{
                position: 'absolute',
              }}
            />
          </div>
        </div>
        <div className={classes.contentBanners}>
          <div className={classes.containerMobile}>
            <div className={classes.banner}>
              <SimpleImage image={ImageBanner} width='100%' />
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
                <a href="https://www.argentina.gob.ar/sites/default/files/protocolo_-playas_5.pdf" width="100%" style={{textDecoration: 'none'}}>
                  <Button color="primary" variant='contained'>
                    ir al sitio
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
