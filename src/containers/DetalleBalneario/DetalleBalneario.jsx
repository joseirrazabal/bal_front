import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router-dom'
import get from 'lodash/get'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import NoSsr from '@material-ui/core/NoSsr'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import CardBal from 'copo/Atoms/Cards/CardGeneric/Card'
import Search from '../../components/Search'
import Carousel from '../../components/Carousel'
import Button from '../../components/Button'
import ItemSelected from '../../components/ItemSelected'
import Typography from '../../components/Typography'
import Selected from '../../components/Selected'
import FullScreenDialog from '../../components/Dialog'
import SimpleImage from '../../components/SimpleImage'
import Loading from '../../components/Loading'
import MyMap from '../../components/Map'

import IconCarpAzul from '../../assets/icon-carpa.svg'
import DefaultImage from '../../assets/default-image.jpg'
import ImageBackground from '../../assets/fondo.jpg'
import MapaDefault from '../../assets/mapaDefault.jpg'

import SEARCH_LIST from 'gql/search/list'
import BALNEARIO_GET from 'gql/balneario/get'
import PRECIO_GET from 'gql/precio/get'

import BALNEARIO_LIST from 'gql/balneario/listUltimos'

dayjs.extend(customParseFormat)

// googleMaps static image key
const key = 'AIzaSyDqmMaF9eTJtA2x-a_xYSK2sF5giJTlkCo'

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100%',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 960px)': {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },
  container: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSearch: {
    width: '100%',
    height: 180,
    backgroundImage: 'url(' + ImageBackground + ')',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    boxSizing: 'border-box',

    '@media (max-width: 960px)': {
      height: 80,
      padding: '0 10px',
      marginTop: 0,
    },
  },
  contentBanners: {
    width: '100%',
    height: 'auto',
    background: '#f2f2f2',
    position: 'relative',

    '@media (max-width: 960px)': {
      height: 'auto',
    },
  },
  contentDetalle: {
    width: '100%',
    maxWidth: 1280,
    height: 500,
    display: 'flex',
    flexDirection: 'row',
    background: 'white',
    borderRadius: 6,
    border: '1px solid #ccc',
    overflow: 'hidden',
    boxSizing: 'border-box',
    marginBottom: 20,
    marginTop: 20,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    '@media (max-width: 960px)': {
      marginTop: 0,
      height: 'auto',
      flexDirection: 'column',
      background: '#f2f2f2',
    },
  },
  contentDetalleColumn: {
    width: '100%',
    maxWidth: 1280,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    background: 'white',
    borderRadius: 6,
    overflow: 'hidden',
    padding: 15,
    boxSizing: 'border-box',
    marginBottom: 20,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    '@media (max-width: 960px)': {
      marginTop: 0,
    },

    '& ul': {
      listStyle: 'none',
      padding: 0,
      width: '100%',
      display: 'flex',

      '@media (max-width: 768px)': {
        flexDirection: 'column',
      },

      '& li': {
        margin: 5,
        width: '100%',
      },
    },
  },
  slider: {
    width: '60%',
    position: 'relative',
    height: 500,
    //background: 'green',

    '@media (max-width: 960px)': {
      width: '100%',
      height: 'auto',
    },
  },
  detalle: {
    width: '40%',
    // background: 'red',
    position: 'relative',
    display: 'flex',
    alignSelf: 'strech',
    flexDirection: 'column',

    '@media (max-width: 960px)': {
      width: '100%',
    },
  },
  imageBackground: {
    position: 'relative',
    width: '100%',
    height: 500,
    minHeight: 460,
    background: '#f2f2f2',
    display: 'flex!important',
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      width: '100%',

      /* '@media (max-width: 680px)': {
        height: 300,
      }, */
    },

    '@media (max-width: 680px)': {
      minHeight: 'auto',
      height: 300,
    },
  },
  detalleTop: {
    width: '100%',
    height: '100%',
    background: 'white',
    boxSizing: 'border-box',
    padding: 15,
  },
  detalleBottom: {
    width: '100%',
    height: '100%',
    background: '#F9F8F7',
    boxSizing: 'border-box',
    padding: 15,
  },
  gridColumn: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  gridRow: {
    width: '100%',
    height: 'auto',
    display: 'flex',
  },
  cardPrecio: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    alignItems: 'center',

    '@media (max-width: 960px)': {
      'box-shadow': '0 2px 2px 3px rgba(0,0,0,.1)',
      background: 'white',
      alignItems: 'center',
      position: 'fixed',
      padding: 15,
      bottom: 0,
      zIndex: 3,
      left: 0,
    },
  },
  title: {
    color: theme.palette.secondary,
    padding: '15px 0',
  },
  subTitle: {
    margin: '5px 0',
    color: theme.palette.secondary.light,
  },
  verPlano: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  verFotos: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    display: 'none',

    '@media (max-width: 680px)': {
      display: 'block',
    },
  },
  offer: {
    boxSizing: 'border-box',
  },
  description: {
    '& p': {
      lineHeight: '28px!important',
      fontSize: '18px!important',
      fontFamily: 'Oswald, sans-serif',
    },
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentMap: {
    height: 280,
    display: 'flex',
    overflow: 'hidden',
    // justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundImage: 'url(' + MapaDefault + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
  absolute: {
    background: 'rgba(0,0,0,.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  centerContentMap: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 300,
    padding: 10,
    position: 'absolute',
    zIndex: 2,
  },
}))

const DetalleBalneario = () => {
  const classes = useStyles()
  const history = useHistory()
  const { slug, desde, hasta } = useParams()

  const [balneario, setBalneario] = useState({})

  const [categoriasAll, setCategoriasAll] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoriaSelected, setCategoriaSelected] = useState()

  const [tipos, setTipos] = useState([])
  const [tipoSelected, setTipoSelected] = useState(null)

  const [imagenes, setImagenes] = useState([])
  const [widthNav, setWidthNav] = useState(null)

  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [otros, setOtros] = useState([])

  const date1 = dayjs(hasta, 'DD-MM-YYYY')
  const cantidadDias = date1.diff(dayjs(desde, 'DD-MM-YYYY'), 'day') + 1

  const { data: ciudades, loading: loadingCiudad } = useQuery(SEARCH_LIST)

  const { data, loading } = useQuery(BALNEARIO_GET, {
    variables: {
      slug: `${slug}`,
    },
  })

  const { data: dataList, loadingList } = useQuery(BALNEARIO_LIST, {
    fetchPolicy: 'no-cache',
  })

  const [getPrecio, { data: dataPrecio, loading: loadingPrecio }] = useLazyQuery(PRECIO_GET, {
    variables: { balneario: get(balneario, 'slug'), categoria: categoriaSelected, desde, hasta },
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    setWidthNav(window.innerWidth)
  }, [])

  useEffect(() => {
    if (get(data, 'balnearioGetFront')) {
      setBalneario(get(data, 'balnearioGetFront', {}) || {})
      setImagenes(get(data, 'balnearioGetFront.imagenes', []) || [])

      setCategoriasAll(get(data, 'balnearioGetFront.Categoria'))

      const aTipos = []
      get(data, 'balnearioGetFront.Categoria', []).map(item => {
        aTipos[item.tipo.slug] = item.tipo
      })

      const aTipos2 = []
      for (const item in aTipos) {
        aTipos2.push(aTipos[item])
      }

      setTipos(aTipos2)
      setTipoSelected(aTipos2[0])
    }
  }, [data])

  useEffect(() => {
    if (get(dataList, 'balnearioListFrontUltimos', []).length) {
      setOtros(get(dataList, 'balnearioListFrontUltimos'))
    }
  }, [dataList])

  useEffect(() => {
    const aCategorias = categoriasAll.filter(item => item.tipo.slug === tipoSelected.slug)
    setCategorias(aCategorias)
  }, [tipoSelected])

  useEffect(() => {
    console.log('jose 01', categorias[0])
    setCategoriaSelected(get(categorias[0], 'slug'))
  }, [categorias])

  useEffect(() => {
    if (categoriaSelected) {
      getPrecio()
    }
  }, [categoriaSelected, desde, hasta])

  const onSubmitSearch = data => {
    if (data.ciudad.slug === slug) {
      history.push(
        `/detalle/${get(data, 'ciudad.slug')}/${get(data, 'desde')}/${get(data, 'hasta')}
        `
      )
    } else {
      history.push(
        `/list/${get(data, 'ciudad.slug')}/${get(data, 'desde')}/${get(data, 'hasta')}
        `
      )
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClickOpen2 = () => {
    setOpen2(true)
  }
  const handleClickOpen3 = () => {
    setOpen3(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleClose2 = () => {
    setOpen2(false)
  }
  const handleClose3 = () => {
    setOpen3(false)
  }

  if (loading || loadingCiudad) {
    return (
      <NoSsr>
        <Loading />
      </NoSsr>
    )
  }

  return (
    <div className={classes.contentFull}>
      <Header />
      <div className={classes.contentSearch}>
        <div className={classes.container}>
          <Search
            ciudades={ciudades}
            ciudad={{ slug: slug }}
            desde={desde}
            hasta={hasta}
            handleOnSubmit={onSubmitSearch}
          />
        </div>
      </div>
      <div className={classes.contentBanners}>
        <div className={classes.container}>
          <div className={classes.contentDetalle}>
            <div className={classes.slider}>
              <Carousel>
                {imagenes.length === 0 && (
                  <div className={classes.imageBackground}>
                    <SimpleImage
                      alt='Alquilar Balneario Costa Atlantica'
                      width='100%'
                      image={DefaultImage}
                    />
                  </div>
                )}
                {imagenes.map((item, i) => {
                  return (
                    <div className={classes.imageBackground} key={i}>
                      <img src={item.url} />
                    </div>
                  )
                })}
              </Carousel>
              <FullScreenDialog title='fotos del Balneario' open={open2} handleClose={handleClose2}>
                <Carousel>
                  {imagenes.length === 0 && (
                    <div>
                      <SimpleImage
                        alt='Alquilar Balneario Costa Atlantica'
                        width='100%'
                        image={DefaultImage}
                      />
                    </div>
                  )}
                  {imagenes.map((item, i) => {
                    return (
                      <div key={i}>
                        <img style={{ width: '100%' }} src={item.url} />
                      </div>
                    )
                  })}
                </Carousel>
              </FullScreenDialog>
              {imagenes.length != 0 && (
                <div className={classes.verFotos}>
                  <Button colorBg='default' color='black' height={30} onClick={handleClickOpen2}>
                    AMPLIAR FOTOS
                  </Button>
                </div>
              )}
              {get(balneario, 'planos.0') && (
                <div className={classes.verPlano}>
                  <Button colorBg='secondary' height={30} onClick={handleClickOpen}>
                    VER PLANO
                  </Button>
                </div>
              )}
            </div>
            <div className={classes.detalle}>
              <div className={classes.detalleTop}>
                <div className={classes.gridColumn}>
                  <Typography fontSize={23} fontWeight={700} className={classes.subTitle} variant='h4'>
                    {get(balneario, 'nombre')}
                  </Typography>
                  <Typography fontSize={16} color='grey' variant='p'>
                    {get(balneario, 'ciudad.nombre')}
                  </Typography>
                  <Typography fontSize={14} variant='p' color='grey'>
                    {get(balneario, 'direccion')}
                  </Typography>
                </div>
                <div className={classes.gridRow}>
                  {tipos.map((item, i) => {
                    return (
                      <ItemSelected
                        key={i}
                        active={item.nombre === get(tipoSelected, 'nombre')}
                        //icon={IconCarpAzul}
                        icon={get(item, 'imagen') || IconCarpAzul}
                        title={`Alquilar ${item.nombre}`}
                        precio={400}
                        // disponibles={get(dataPrecio, 'precioGetFront.stock', 0)}
                        onClick={() => {
                          setTipoSelected(item)
                        }}
                      />
                    )
                  })}
                </div>
                <div className={classes.gridRow}>
                  <Selected
                    items={categorias}
                    loading={false}
                    onChange={e => {
                      setCategoriaSelected(e.target.value)
                    }}
                  />
                </div>
              </div>

              {get(dataPrecio, 'precioGetFront.precio') && (
                <div className={classes.detalleBottom}>
                  <div className={`${classes.gridRow} ${classes.cardPrecio}`}>
                    <div>
                      <div>
                        <Typography fontSize={12} fontWeight={400} variant='p'>
                          Disponibles {get(dataPrecio, 'precioGetFront.stock', 0)}
                        </Typography>
                        <Typography fontSize={12} fontWeight={400} color='black' variant='p'>
                          {`Precio por dia $${parseInt(get(dataPrecio, 'precioGetFront.precio', 0))}`}

                          {parseInt(get(dataPrecio, 'precioGetFront.dias', 0)) > 1 &&
                            parseInt(get(dataPrecio, 'precioGetFront.precioCero', 0)) > 0 && (
                              <Typography
                                fontSize={11}
                                fontWeight={400}
                                color='black'
                                variant='span'
                                textDecoration='line-through'
                              >
                                {' '}
                                ${parseInt(get(dataPrecio, 'precioGetFront.precioCero', 0))}
                              </Typography>
                            )}
                        </Typography>
                        <div>
                          <Typography fontWeight={700} fontSize={25} color='black' variant='b'>
                            ${parseInt(get(dataPrecio, 'precioGetFront.precio', 0)) * cantidadDias}
                          </Typography>
                          <Typography
                            fontWeight={400}
                            fontSize={16}
                            color='black'
                            variant='span'
                            fontStyle='italic'
                          >
                            Total
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div>
                      {parseInt(get(dataPrecio, 'precioGetFront.dias', 0)) > 1 &&
                        parseInt(get(dataPrecio, 'precioGetFront.dias', 0)) > 0 && (
                          <div style={{ marginBottom: 5 }}>
                            <Typography
                              className={classes.offer}
                              fontSize={11}
                              fontWeight={400}
                              color='#55C443'
                              variant='span'
                            >
                              Descuento por seleccionar{' '}
                              {parseInt(get(dataPrecio, 'precioGetFront.dias', 0))} dias
                            </Typography>
                          </div>
                        )}
                      <Button
                        disabled={
                          !get(dataPrecio, 'precioGetFront.precio', 0) ||
                          !get(dataPrecio, 'precioGetFront.stock', 0)
                        }
                        height={40}
                        width={200}
                        onClick={() =>
                          history.push(
                            `/checkout/${get(dataPrecio, 'precioGetFront.slug')}/${desde}/${hasta}`
                          )
                        }
                      >
                        ALQUILAR X {cantidadDias} DIA/S
                      </Button>
                    </div>
                  </div>
                  <div className={classes.gridColumn} style={{ marginTop: 15 }}>
                    <Typography color='black' variant='h3'>
                      Información importante
                    </Typography>
                    <div style={{ paddingTop: 10 }}>
                      <Typography color='green' variant='p' fontSize={13}>
                        <b>Checkin:</b> {get(balneario, 'checkIn')}
                      </Typography>
                      <Typography color='red' variant='p' fontSize={13}>
                        <b>Checkout:</b> {get(balneario, 'checkOut')}
                      </Typography>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={classes.contentDetalleColumn}>
            <Typography fontWeight={700} fontSize={20} variant='h3'>
              {get(balneario, 'nombre')}
            </Typography>
            <Typography fontSize={16} color='black' variant='p'>
              <div
                className={classes.description}
                dangerouslySetInnerHTML={{
                  __html: get(balneario, 'descripcion'),
                }}
              />
            </Typography>
          </div>
          <div className={`${classes.contentDetalleColumn} ${classes.contentMap}`}>
            <div className={classes.absolute} />

            <div className={classes.centerContentMap}>
              <Typography textAlign='center' color='white' fontWeight={700} fontSize={18} variant='h4'>
                {get(balneario, 'ciudad.nombre')}
              </Typography>
              <Typography textAlign='center' color='white' fontWeight={500} fontSize={14} variant='p'>
                {get(balneario, 'direccion')}
              </Typography>
              <div style={{ marginTop: 10 }}>
                <Button height={40} width={200} onClick={handleClickOpen3}>
                  VER MAPA
                </Button>
              </div>
            </div>

            <img
              style={widthNav > 600 ? { width: '100%', height: 'auto' } : {}}
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${get(
                balneario,
                'geoLocation.lat'
              )}, ${get(balneario, 'geoLocation.lng')}&zoom=14&size=${
                widthNav > 600 ? '640x400' : '400x400'
              }&scale=${
                widthNav > 600 ? '2' : '1'
              }&maptype=roadmap&markers=color:red%7Clabel:Balneario%7C${get(
                balneario,
                'geoLocation.lat'
              )},${get(balneario, 'geoLocation.lng')}&key=${key}`}
            />
          </div>
          <div className={classes.contentDetalleColumn}>
            <Typography fontWeight={700} fontSize={20} varian='h3'>
              Otros Balnearios
            </Typography>
            <ul>
              {otros
                .filter(item => `${item.slug}` !== `${slug}`)
                .slice(0, 3)
                .map((item, i) => {
                  return (
                    <li key={i}>
                      <CardBal
                        modular
                        name={get(item, 'nombre')}
                        city={get(item, 'ciudad.nombre')}
                        image={get(item, 'imagenes.0.url')}
                        onClick={() => {
                          history.push(`/detalle/${get(item, 'slug')}/${desde}/${hasta}`)
                        }}
                      />
                    </li>
                  )
                })}
            </ul>
          </div>

          <FullScreenDialog
            fullScreen={widthNav < 600}
            title='Nuestra Ubicación'
            open={open3}
            handleClose={handleClose3}
          >
            <div style={{ width: widthNav > 600 ? 600 : '100%', height: 600 }}>
              <MyMap
                onDragMarker={() => {}}
                center={get(balneario, 'geoLocation')}
                marks={[{ position: get(balneario, 'geoLocation') }]}
              />
            </div>
          </FullScreenDialog>

          <FullScreenDialog
            fullScreen={false}
            title='Plano Balneario'
            open={open}
            handleClose={handleClose}
          >
            <div style={{ margin: '0 auto', maxWidth: 850, width: '100%' }}>
              <SimpleImage width='100%' image={get(balneario, 'planos.0.url')} />
            </div>
          </FullScreenDialog>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default DetalleBalneario
