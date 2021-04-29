import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import get from 'lodash/get'
import dayjs from 'dayjs'
import Slider from 'react-slick'

import Button from '@material-ui/core/Button'
import NoSsr from '@material-ui/core/NoSsr'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Typography from '../../components/Typography'
import Search from '../../components/Search'
import CardBal from '../../components/CardBal'
import DialogSimpleComponent from '../../components/DialogSimple'
import Loading from '../../components/Loading'

import imageBackground from '../../assets/banner-fondo.jpeg'
import ImageCoronaVirus from '../../assets/pop-up.jpg'
import ImageBanner from '../../assets/banner-MP-compu.png'
import ImageBannerMobile from '../../assets/banner-MP-celu.png'

import HOME_LIST from 'gql/home/list'
import CIUDAD_LIST from 'gql/ciudad/list'

import SimpleImage from '../../components/SimpleImage'

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100%',
    // height: '100vh',
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
    height: 400,
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
      // height: '35vh',
    },

    '@media (max-width: 960px)': {
      // height: '30vh',
    },
    '@media (max-width: 680px)': {
      backgroundSize: 680,
      backgroundPosition: 'top center',
    },
  },
  contentBanners: {
    width: '100%',
    // height: '55vh',
    background: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (max-width: 1450px)': {
      // height: '65vh',
    },

    '@media (max-width: 960px)': {
      // height: '70vh',
      alignItems: 'flex-start',
    },
  },
  contentSlider: {
    width: '100%',
    boxSizing: 'border-box',

    '& ul': {
      listStyle: 'none',
      width: '100%',
      padding: 0,

      '& li': {
        width: '100%',
        listStyle: 'none',

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
    background: 'rgba(0,0,0,.2)',
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
    fontSize: '44px!important',
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

  const [config, setConfig] = useState([])

  const { data, loading } = useQuery(HOME_LIST)
  const { data: ciudades, loading: loadingCiudad } = useQuery(CIUDAD_LIST)

  useEffect(() => {
    if (data) {
      setConfig(get(data, 'homeListFront.config'))
    }
  }, [data])

  const settings = ({ slidesToShow = 3 }) => ({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
    ],
  })

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
            <Typography fontWeight='900' className={classes.title} varian='h1'>
              DISFRUTA TU LUGAR
            </Typography>
            <Search ciudades={ciudades} />
          </div>
        </div>
        <div className={classes.contentBanners}>
          <div className={classes.containerMobile}>
            <div className={classes.banner}>
              <SimpleImage
                alt='Alamar - Balnearios Costa Atlantica'
                image={ImageBanner}
                width={'100%'}
              />
            </div>
            <div className={classes.bannerMobile}>
              <SimpleImage image={ImageBannerMobile} width={'100%'} />
            </div>

            {config.map((carousel, carouselIndex) => {
              console.log('jose', parseInt(carousel.cant_items))
              return [
                <div key={carouselIndex}>
                  <Typography
                    fontWeight={500}
                    fontSize={20}
                    textAlign='center'
                    className={classes.subTitle}
                    varian='h2'
                  >
                    {carousel.titulo}
                  </Typography>
                </div>,
                <div className={classes.contentSlider} key={`2-${carouselIndex}`}>
                  <ul>
                    <Slider {...settings({ slidesToShow: parseInt(carousel.cant_items) || 3 })}>
                      {carousel.items.map((item, itemIndex) => {
                        return (
                          <div key={itemIndex}>
                            <div style={{ margin: 5 }}>
                              <li>
                                <CardBal
                                  moludar
                                  nuevo
                                  item={item}
                                  onClick={() => {
                                    const dia = dayjs().format('DD-MM-YYYY')
                                    history.push(`/detalle/${get(item, 'id')}/${dia}/${dia}`)
                                  }}
                                />
                              </li>
                            </div>
                          </div>
                        )
                      })}
                    </Slider>
                  </ul>
                </div>,
              ]
            })}

            <DialogSimpleComponent>
              <div className={classes.modalContent}>
                <SimpleImage image={ImageCoronaVirus} width='100%' />
                <a
                  href='https://www.argentina.gob.ar/sites/default/files/protocolo_-playas_5.pdf'
                  width='100%'
                  style={{ textDecoration: 'none', marginTop: 15 }}
                >
                  <Button color='primary' variant='contained'>
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
