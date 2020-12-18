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
import CardLab from '../../components/CardBal'
import Search from '../../components/Search'
import Carousel from '../../components/Carousel'
import Button from '../../components/Button'
import ItemSelected from '../../components/ItemSelected'
import Typography from '../../components/Typography'
import Selected from '../../components/Selected'
import FullScreenDialog from '../../components/Dialog'
import SimpleImage from '../../components/SimpleImage'
import Loading from '../../components/Loading'

import IconCarpAzul from '../../assets/icon-carpa.svg'
import DefaultImage from '../../assets/default-image.jpg'

import TIPO_LIST from 'gql/tipo/list'
import BALNEARIO_GET from 'gql/balneario/get'
import BALNEARIO_LIST from 'gql/balneario/listUltimos'
import CATEGORIA_LIST from 'gql/categoria/list'
import PRECIO_GET from 'gql/precio/get'
import CIUDAD_LIST from 'gql/ciudad/list'

dayjs.extend(customParseFormat)

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100vw',
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
    width: '100vw',
    height: 80,
    background: '#e0e0e0',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    boxSizing: 'border-box',

    '@media (max-width: 960px)': {
      height: 80,
      background: '#e0e0e0',
      padding: '0 10px',
      marginTop: 0,
    },
  },
  contentBanners: {
    width: '100vw',
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
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    background: 'white',
    borderRadius: 6,
    border: '1px solid #ccc',
    overflow: 'hidden',
    boxSizing: 'border-box',
    marginBottom: 20,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    '@media (max-width: 960px)': {
      marginTop: 0,
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
    height: 460,
    //background: 'green',

    '@media (max-width: 960px)': {
      width: '100%',
      height: 'auto',
    },
  },
  detalle: {
    width: '40%',
    background: 'red',
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
    height: '100%',
    minHeight: 460,
    background: '#f2f2f2',
    display: 'flex!important',
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      width: '100%',
    },

    '@media (max-width: 680px)': {
      minHeight: 'auto',
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
}))

const DetalleBalneario = () => {
  const classes = useStyles()
  const history = useHistory()
  const { id, ciudad, desde, hasta } = useParams()

  const [categoria, setCategoria] = useState()
  const [tipos, setTipos] = useState([])
  const [tipoSelected, setTipoSelected] = useState(null)
  const [balneario, setBalneario] = useState({})
  const [imagenes, setImagenes] = useState([])
  const [open, setOpen] = useState(false)

  const date1 = dayjs(hasta, 'DD-MM-YYYY')
  const cantidadDias = date1.diff(dayjs(desde, 'DD-MM-YYYY'), 'day') + 1

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { data: ciudades, loading: loadingCiudad } = useQuery(CIUDAD_LIST)
  const { data: dataTipoList, loadingTipoList } = useQuery(TIPO_LIST, {
    variables: { balneario: id },
    fetchPolicy: 'no-cache',
  })
  const { data: dataList, loadingList } = useQuery(BALNEARIO_LIST, {
    fetchPolicy: 'no-cache',
  })

  const [getCategorias, { data: dataCategorias, loading: loadingCategorias }] = useLazyQuery(
    CATEGORIA_LIST,
    {
      variables: { tipo: get(tipoSelected, '_id'), balneario: id },
      fetchPolicy: 'no-cache',
    }
  )
  const [getPrecio, { data: dataPrecio, loading: loadingPrecio }] = useLazyQuery(PRECIO_GET, {
    variables: { categoria: categoria, desde, hasta },
    fetchPolicy: 'no-cache',
  })

  const { data, loading } = useQuery(BALNEARIO_GET, {
    variables: {
      id: `${id}`,
    },
  })

  useEffect(() => {
    setBalneario(get(data, 'balnearioGetFront', {}) || {})
    setImagenes(get(data, 'balnearioGetFront.imagenes', []) || [])
  }, [data])

  useEffect(() => {
    setTipos(get(dataTipoList, 'tipoListFront', []) || [])

    setTipoSelected(get(dataTipoList, 'tipoListFront.0', {}) || {})
  }, [dataTipoList])

  useEffect(() => {
    getCategorias()
  }, [tipoSelected])

  useEffect(() => {
    if (get(dataCategorias, 'categoriaListFront')) {
      setCategoria(get(dataCategorias, 'categoriaListFront.0._id'))
    }
  }, [dataCategorias])

  useEffect(() => {
    if (categoria) {
      getPrecio()
    }
  }, [categoria])

  if (loading || loadingCiudad || loadingTipoList) {
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
          <Search ciudades={ciudades} ciudad={ciudad} desde={desde} hasta={hasta} />
        </div>
      </div>
      <div className={classes.contentBanners}>
        <div className={classes.container}>
          <Typography
            fontWeight={700}
            fontSize={25}
            textAlign='center'
            className={classes.title}
            varian='h2'
          >
            Balneario
          </Typography>
          <div className={classes.contentDetalle}>
            <div className={classes.slider}>
              <Carousel>
                {imagenes.length === 0 && (
                  <div className={classes.imageBackground}>
                    <SimpleImage width='100%' image={DefaultImage} />
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
              {get(balneario, 'planos.0') && (
                <div className={classes.verPlano}>
                  <Button variant='default' color='black' height={30} onClick={handleClickOpen}>
                    VER PLANO
                  </Button>
                </div>
              )}
            </div>
            <div className={classes.detalle}>
              <div className={classes.detalleTop}>
                <div className={classes.gridColumn}>
                  <Typography fontSize={23} fontWeight={400} className={classes.subTitle} variant='h4'>
                    {get(balneario, 'nombre')}
                  </Typography>
                  <Typography fontSize={18} color='grey' variant='p'>
                    {get(balneario, 'ciudad.nombre')}
                  </Typography>
                  <Typography fontSize={16} variant='p' color='grey'>
                    {get(balneario, 'direccion')}
                  </Typography>
                </div>
                <div className={classes.gridRow}>
                  {tipos.map((item, i) => {
                    return (
                      <ItemSelected
                        key={i}
                        active={item.nombre === get(tipoSelected, 'nombre')}
                        icon={IconCarpAzul}
                        title={`Alquilar ${item.nombre}`}
                        precio={400}
                        onClick={() => {
                          setTipoSelected(item)
                        }}
                      />
                    )
                  })}
                </div>
                <div className={classes.gridRow}>
                  <Selected
                    items={get(dataCategorias, 'categoriaListFront')}
                    loading={loadingCategorias}
                    onChange={e => {
                      setCategoria(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className={classes.detalleBottom}>
                <div className={`${classes.gridRow} ${classes.cardPrecio}`}>
                  <div>
                    <Typography variant='p'>
                      <Typography color='black' variant='span'>
                        $
                      </Typography>
                      <Typography fontWeight={700} fontSize={25} color='black' variant='b'>
                        {parseInt(get(dataPrecio, 'precioGetFront.precio', 0)) * cantidadDias}
                      </Typography>
                    </Typography>
                    {/* <Typography fontSize={14} fontWeight={700} color='black' variant='p'> */}
                    {/*   del 10 al 13 de Enero */}
                    {/* </Typography> */}
                  </div>
                  <Button
                    disabled={!get(dataPrecio, 'precioGetFront.precio', 0)}
                    height={48}
                    width={200}
                    onClick={() =>
                      history.push(
                        `/checkout/${get(dataPrecio, 'precioGetFront._id')}/${desde}/${hasta}`
                      )
                    }
                  >
                    ALQUILAR
                  </Button>
                </div>
                <div className={classes.gridColumn} style={{ marginTop: 15 }}>
                  <Typography color='black' variant='h3'>
                    Información importante
                  </Typography>
                  <Typography color='green' variant='p'>
                    Checkin:
                  </Typography>
                  <Typography color='red' variant='p'>
                    Checkout:
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.contentDetalleColumn}>
            <Typography fontWeight={700} fontSize={20} varian='h3'>
              {get(balneario, 'nombre')}
            </Typography>
            <Typography fontSize={16} color='black' lineHeight={'30px'}>
              {get(balneario, 'descripcion')}
            </Typography>
          </div>
          <div className={classes.contentDetalleColumn}>
            <Typography fontWeight={700} fontSize={20} varian='h3'>
              Otros Balnearios en {get(balneario, 'ciudad.nombre')}
            </Typography>
            <ul>
              {get(dataList, 'balnearioListFrontUltimos', [])
                .slice(0, 3)
                .map((item, i) => {
                  return (
                    <li key={i}>
                      <CardLab
                        moludar
                        item={item}
                        onClick={() => {
                          history.push(`/detalle/${get(item, '_id')}/${desde}/${hasta}`)
                        }}
                      />
                    </li>
                  )
                })}
            </ul>
          </div>
          <FullScreenDialog title='Plano Balneario' open={open} handleClose={handleClose}>
            <SimpleImage width='100%' image={get(balneario, 'planos.0.url')} />
          </FullScreenDialog>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default DetalleBalneario
