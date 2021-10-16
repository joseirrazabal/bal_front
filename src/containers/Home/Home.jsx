import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import get from 'lodash/get'
import dayjs from 'dayjs'
import Slider from 'react-slick'

import Button from '@material-ui/core/Button'
import NoSsr from '@material-ui/core/NoSsr'

import CardBal from 'copo/Atoms/Cards/CardGeneric/Card'
import HomeSlider from 'copo/Atoms/HomeSlider/HomeSlider'
import SimpleImage from 'copo/Atoms/Images/SimpleImage'

import Typography from '../../components/Typography'
import Search from '../../components/Search'
import DialogSimpleComponent from '../../components/DialogSimple'
import Loading from '../../components/Loading'

import ImageCoronaVirus from '../../assets/pop-up.jpg'
import ImageBanner from '../../assets/banner-MP-compu.png'
import ImageBannerMobile from '../../assets/banner-MP-celu.png'

import HOME_LIST from 'gql/home/list'
import SEARCH_LIST from 'gql/search/list'

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100%',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  contentBanners: {
    width: '100%',
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

const Home = () => {
  const classes = useStyles()
  const history = useHistory()

  const { data, loading } = useQuery(HOME_LIST)
  const { data: dataSearch, loading: loadingCiudad } = useQuery(SEARCH_LIST)

  const [config, setConfig] = useState([])
  const [ciudadSelect, setCiudadSelect] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('search')) {
      setCiudadSelect(JSON.parse(localStorage.getItem('search')))
    }
  }, [])

  useEffect(() => {
    if (data) {
      setConfig(get(data, 'homeListFront'))
    }
  }, [data])

  const onSubmitSearch = useCallback(
    data => {
      history.push(
        `/list/${get(data, 'ciudad.slug')}/${get(data, 'desde')}/${get(data, 'hasta')}
        `
      )
    },
    [data, history]
  )

  // if (loading || loadingCiudad) {
  //   return (
  //     <NoSsr>
  //       <Loading />
  //     </NoSsr>
  //   )
  // }

  return (
    <div className={classes.contentFull}>
      <HomeSlider imageBackground={get(config, '0.imagen')}>
        <Typography fontWeight='900' className={classes.title} variant='h1'>
          DISFRUTA TU LUGAR
        </Typography>
        <Search ciudades={dataSearch} ciudad={ciudadSelect} handleOnSubmit={onSubmitSearch} />
      </HomeSlider>
      <div className={classes.contentBanners}>
        <div className={classes.containerMobile}>
          {get(config, '0.publicidad') && (
            <div className={classes.banner}>
              <SimpleImage
                alt='Alamar - Balnearios Costa Atlantica'
                image={get(config, '0.publicidad')}
                width={'100%'}
              />
            </div>
          )}
          <div className={classes.bannerMobile}>
            <SimpleImage image={ImageBannerMobile} width={'100%'} />
          </div>

          {config.map((carousel, carouselIndex) => {
            return [
              <div key={carouselIndex}>
                <Typography
                  fontWeight={500}
                  fontSize={20}
                  textAlign='center'
                  className={classes.subTitle}
                  variant='h2'
                >
                  {carousel.titulo}
                </Typography>
              </div>,
              <div style={{pasition: 'relative', width: '100%'}}  key={`2-${carouselIndex}`}>
                <Slider {...settings({ slidesToShow: parseInt(carousel.cantItems) || 3 })}>
                  {carousel.config.map((item, itemIndex) => {
                    return (
                      <div key={itemIndex}>
                        <div style={{ margin: 5 }}>
                          <CardBal
                            calification={get(item, "calificacion")}
                            modular
                            tag={get(item, 'tagNombre')}
                            tagTexto={get(item, 'tagTexto')}
                            tagColor={get(item, 'tagColor')}
                            tagFontColor={get(item, 'tagFontColor')}
                            tagImagen={
                              get(item, 'tagImagen') !== 'false' ? get(item, 'tagImagen') : false
                            }
                            price={get(item, 'precio')}
                            oldPrice={get(item, 'oldPprecio')}
                            name={get(item, 'balneario')}
                            city={get(item, 'ciudad')}
                            image={get(item, 'imagen')}
                            category={get(item, 'tipo')}
                            onClick={() => {
                              if (item.sinFecha) {
                                history.push(
                                  `/${get(item, 'balnearioSlug')}/${dayjs().format(
                                    'YYYY-MM-DD'
                                  )}/${dayjs().format('YYYY-MM-DD')}`
                                )
                              } else {
                                history.push(
                                  `/${get(item, 'balnearioSlug')}/${dayjs(item.desde).format(
                                    'YYYY-MM-DD'
                                  )}/${dayjs(item.hasta).format('YYYY-MM-DD')}`
                                )
                              }
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </Slider>
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
  )
}

export default Home
