import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import NoSsr from '@material-ui/core/NoSsr'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Button } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

import CardBalList from 'copo/Atoms/Cards/CardList/CardList'

import Search from '../../components/Search'
import Typography from '../../components/Typography'
import Loading from '../../components/Loading'
import SimpleImage from '../../components/SimpleImage'
import FullScreenDialog from '../../components/Dialog'

import imageBackground from '../../assets/banner-fondo.jpeg'
import ImageDefault from '../../assets/sin-resultados.jpg'

import SEARCH_LIST from 'gql/search/list'
import BALNEARIO_LIST_SEARCH from 'gql/balneario/listSearch'

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
    zIndex: 2,
    width: '100%',
    maxWidth: 1280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebar: {
    width: '30%',
    borderRadius: 6,
    overflow: 'hidden',
    boxSizing: 'border-box',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
    background: 'white',
    border: '1px solid #ccc',
    marginRight: 10,

    '@media (max-width: 960px)': {
      width: '100%',
      display: 'none',
    },
    '@media (max-width: 680px)': {
      display: 'none',
    },
  },
  list: {
    width: '70%',
    '@media (max-width: 960px)': {
      width: '100%',
    },
  },
  contentSearch: {
    width: '100%',
    height: 300,
    backgroundImage: 'url(' + imageBackground + ')',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',

    '@media (max-width: 960px)': {
      height: 80,
      padding: '0 10px',
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
  shadow: {
    background: 'rgba(0,0,0,.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  ul: {
    listStyle: 'none',
    minHeight: 500,
    padding: 0,
    width: '100%',
    float: 'left',

    '& li': {
      marginBottom: 15,
      width: '100%',
    },
  },
  contentList: {
    width: '100%',
    maxWidth: 1280,
    height: 'auto',
    marginTop: -50,
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    borderRadius: '10px 10px 0 0',
    padding: 15,
    boxSizing: 'border-box',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    '@media (max-width: 960px)': {
      marginTop: 0,
      padding: 5,
    },
  },
  title: {
    color: theme.palette.secondary,
    padding: '5px 0',
  },
  titleFilters: {
    background: theme.palette.secondary.dark,
    padding: '10px 0',
  },
  gridFull: {
    width: '100%',
    padding: '5px 0',
  },
  filters: {
    padding: 10,
    listStyle: 'none',
  },
  content: {
    display: 'flex',

    '@media (max-width: 680px)': {
      flexDirection: 'column',
    },
  },
  mobileFilters: {
    display: 'none',
    borderRadius: 20,
    padding: 10,
    minWidth: 100,

    '@media (max-width: 960px)': {
      display: 'flex',
      justifyContent: 'center',
      position: 'fixed',
      bottom: 10,
      left: '39%',
      zIndex: 3,
    },
  },
}))

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

const ListBalnearios = () => {
  const classes = useStyles()
  const history = useHistory()
  const { ciudad, desde, hasta } = useParams()

  const [state, setState] = useState({})
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(0)

  const [loadingCheck, setLoadingCheck] = useState(true)
  const [ciudades, setCiudades] = useState([])
  const [items, setItems] = useState([])
  const [tipos, setTipos] = useState([])

  const { data: dataCiudades, loading: loadingCiudad } = useQuery(SEARCH_LIST)

  const [getBalnearioSearch, { data, loading }] = useLazyQuery(BALNEARIO_LIST_SEARCH, {
    variables: { desde, hasta },
    fetchPolicy: 'no-cache',
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    getBalnearioSearch()
  }, [desde, hasta])

  useEffect(() => {
    if (get(dataCiudades, 'searchListFront')) {
      setCiudades(get(dataCiudades, 'searchListFront', []))
    }
  }, [dataCiudades])

  useEffect(() => {
    if (get(data, 'balnearioListSearch')) {
      const objTipos = {}
      get(data, 'balnearioListSearch').filter(item => {
        objTipos[item.tipo] = { slug: item.tipoSlug, nombre: item.tipo }
      })
      setTipos(Object.values(objTipos))
    }
  }, [data])

  useEffect(() => {
    const result = async () => {
      const prueba = await Promise.all(
        get(data, 'balnearioListSearch').filter(item => {
          if (state[item.ciudadSlug].selected) {
            return true
          }
          return false
        })
      )
      setItems(prueba)
    }

    const seleccionado = () => {
      let algoSeleccionado = false

      for (const item in state) {
        if (state[item].selected) {
          algoSeleccionado = true
        }
      }
      return algoSeleccionado
    }

    if (tipos) {
      if (seleccionado()) {
        result()
      } else {
        setItems(get(data, 'balnearioListSearch', []))
      }
    }
  }, [tipos, state])

  useEffect(() => {
    if (ciudades.length) {
      const check = {}

      ciudades.map(item => {
        check[item.slug] = { selected: false, item }
      })

      // selecciono la ciudad o la ciudad del balnario
      if (ciudad) {
        if (check[ciudad].item.ciudad) {
          check[check[ciudad].item.ciudad].selected = true
        } else {
          check[ciudad].selected = true
        }
      }

      setLoadingCheck(false)
      setState(check)
    }
  }, [ciudades])

  const handleChange = event => {
    setState({ ...state, [event.target.value]: event.target.checked })
  }

  const onSubmitSearch = data => {
    history.push(`/list/${get(data, 'ciudad.slug')}/${get(data, 'desde')}/${get(data, 'hasta')}`)
  }

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  if (loading || loadingCiudad || loadingCheck) {
    // return <Loading />
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
        <div className={classes.shadow} />
        <div className={classes.container}>
          <Search
            ciudades={dataCiudades}
            ciudad={{ slug: ciudad }}
            desde={desde}
            hasta={hasta}
            handleOnSubmit={onSubmitSearch}
          />
        </div>
      </div>
      <div className={classes.contentBanners}>
        <div className={classes.container}>
          <div className={classes.contentList}>
            <div className={classes.content}>
              <div className={classes.sidebar}>
                <Typography
                  className={classes.titleFilters}
                  variant='h2'
                  color='white'
                  textAlign='center'
                  fontWeight='400'
                  fontSize={20}
                >
                  Filtros
                </Typography>
                <Divider />
                <ul className={classes.filters}>
                  <li>
                    <Typography fontWeight={700} fontSize={16} textAlign='left' varian='p'>
                      CIUDAD
                    </Typography>
                  </li>
                  {ciudades
                    .filter(item => item.category === 'ciudad')
                    .map((item, i) => {
                      return (
                        <li key={i}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state[item.slug].selected}
                                onChange={handleChange}
                                name='checkedA'
                                color='secondary'
                                value={item.slug}
                              />
                            }
                            label={item.nombre}
                          />
                        </li>
                      )
                    })}
                  {/* <Divider /> */}
                </ul>
              </div>
              <Button
                onClick={handleClickOpen}
                variant='contained'
                color='primary'
                className={classes.mobileFilters}
              >
                FILTROS
              </Button>
              <div className={classes.list}>
                <Typography
                  fontWeight={400}
                  fontSize={25}
                  textAlign='center'
                  className={classes.title}
                  varian='h2'
                >
                  Balnearios
                </Typography>
                <AppBar position='static'>
                  <Tabs value={value} onChange={handleChangeTab} aria-label='simple tabs example'>
                    {tipos.map((tipo, i) => {
                      return <Tab key={i} label={tipo.nombre} />
                    })}
                  </Tabs>
                </AppBar>
                {tipos.map((tipo, i) => {
                  return (
                    <TabPanel key={i} value={value} index={i}>
                      <ul
                        className={`${classes.ul} ${classes.gridFull}`}
                        style={{ margin: 0, padding: 0 }}
                      >
                        {items.length === 0 && <SimpleImage width={'100%'} image={ImageDefault} />}
                        {items
                          .reduce((unique, item) => {
                            // filtro para que solo haya un precio por balneario
                            const exist = unique.find(item2 => item2.slug === item.slug)
                            // return unique.includes(item) ? unique : [...unique, item]
                            return exist ? unique : [...unique, item]
                          }, [])
                          .filter(item => item.tipoSlug === tipo.slug)
                          .map((item, i) => {
                            const precioOld =
                              get(item, 'precio', 0) !== get(item, 'oldPrecio')
                                ? parseFloat(get(item, 'oldPrecio')).toFixed(2)
                                : 0
                            return (
                              <li key={i}>
                                <CardBalList
                                  nuevo
                                  tag={get(item, 'tagNombre')}
                                  tagTexto={get(item, 'tagTexto')}
                                  tagColor={get(item, 'tagColor')}
                                  tagFontColor={get(item, 'tagFontColor')}
                                  tagImagen={
                                    get(item, 'tagImagen') !== 'false' ? get(item, 'tagImagen') : false
                                  }
                                  price={parseFloat(get(item, 'precio')).toFixed(2)}
                                  oldPrice={precioOld}
                                  name={get(item, 'nombre')}
                                  locate={get(item, 'direccion')}
                                  city={get(item, 'ciudad')}
                                  image={get(item, 'imagen')}
                                  category={get(item, 'tipo')}
                                  onClick={() => {
                                    history.push(`/detalle/${get(item, 'slug')}/${desde}/${hasta}`)
                                  }}
                                />
                              </li>
                            )
                          })}
                      </ul>
                    </TabPanel>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FullScreenDialog fullScreen={true} title='Filtros' open={open} handleClose={handleClose}>
        <ul className={classes.filters}>
          <li>
            <Typography fontWeight={700} fontSize={16} textAlign='left' varian='p'>
              CIUDAD
            </Typography>
          </li>
          {ciudades.map((item, i) => {
            return (
              <li key={i}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state[item.slug].selected}
                      onChange={handleChange}
                      name='checkedA'
                      color='secondary'
                      value={item.slug}
                    />
                  }
                  label={item.nombre}
                />
              </li>
            )
          })}
          {/* <Divider /> */}
        </ul>
      </FullScreenDialog>
      <Footer />
    </div>
  )
}
export default ListBalnearios
