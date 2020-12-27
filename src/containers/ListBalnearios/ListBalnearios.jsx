import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import NoSsr from '@material-ui/core/NoSsr'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import CardBalDetail from '../../components/CardBalDetail'
import Search from '../../components/Search'
import Typography from '../../components/Typography'
import Loading from '../../components/Loading'
import SimpleImage from '../../components/SimpleImage'
import FullScreenDialog from '../../components/Dialog'

import BALNEARIO_LIST_SEARCH from 'gql/balneario/listSearch'
import CIUDAD_LIST from 'gql/ciudad/list'

import imageBackground from '../../assets/fondo.jpg'
import ImageDefault from '../../assets/sin-resultados.jpg'
import { Button } from '@material-ui/core'

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
    width: '100vw',
    height: 300,
    background: 'red',
    backgroundImage: 'url(' + imageBackground + ')',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    width: '100vw',
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

    '@media (max-width: 680px)': {
      display: 'flex',
      justifyContent: 'center',
      position: 'fixed',
      bottom: 10,
      left: '39%',
      zIndex: 3,
    },
  },
}))

const ListBalnearios = () => {
  const classes = useStyles()
  const history = useHistory()
  const { ciudad, desde, hasta } = useParams()

  const [loadingCheck, setLoadingCheck] = useState(true)
  const [ciudades, setCiudades] = useState([])
  const [state, setState] = useState({})
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)

  const { data: dataCiudades, loading: loadingCiudad } = useQuery(CIUDAD_LIST)
  const { data, loading } = useQuery(BALNEARIO_LIST_SEARCH, {
    // variables: {
    //   ciudad,
    // },
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (get(data, 'balnearioListSearch')) {
      setItems(get(data, 'balnearioListSearch', []))
    }
  }, [data])

  useEffect(() => {
    if (get(dataCiudades, 'ciudadListFront')) {
      setCiudades(get(dataCiudades, 'ciudadListFront', []))
    } else {
      setLoadingCheck(false)
    }
  }, [dataCiudades])

  useEffect(() => {
    if (ciudades.length) {
      const check = {}

      ciudades.map(item => {
        check[item._id] = false
      })

      if (ciudad) {
        check[ciudad] = true
      }

      setLoadingCheck(false)
      setState(check)
    }
  }, [ciudades])

  useEffect(() => {
    const seleccionado = () => {
      let algoSeleccionado = false

      for (const item in state) {
        if (state[item]) {
          algoSeleccionado = true
        }
      }
      return algoSeleccionado
    }

    const result = async () => {
      const prueba = await Promise.all(
        get(data, 'balnearioListSearch').filter(item => {
          if (state[item.ciudad._id]) {
            return true
          }
          return false
        })
      )
      setItems(prueba)
    }

    if (!loadingCheck && !loading) {
      if (seleccionado()) {
        result()
      } else {
        setItems(get(data, 'balnearioListSearch'))
      }
    }
  }, [state, loadingCheck, loading])

  const handleChange = event => {
    setState({ ...state, [event.target.value]: event.target.checked })
  }

  if (loading || loadingCiudad || loadingCheck) {
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
          <Search ciudades={dataCiudades} ciudad={ciudad} desde={desde} hasta={hasta} />
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
                  {ciudades.map((item, i) => {
                    return (
                      <li key={i}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state[item._id]}
                              onChange={handleChange}
                              name='checkedA'
                              color='secondary'
                              value={item._id}
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
                  fontWeight={700}
                  fontSize={25}
                  textAlign='center'
                  className={classes.title}
                  varian='h2'
                >
                  Balnearios
                </Typography>
                <ul className={`${classes.ul} ${classes.gridFull}`} style={{ margin: 0, padding: 0 }}>
                  {items.length == 0 && <SimpleImage width={'100%'} image={ImageDefault} />}
                  {items.map((item, i) => {
                    return (
                      <li key={i}>
                        <CardBalDetail
                          modular
                          key={i}
                          item={item}
                          onClick={() => {
                            history.push(`/detalle/${get(item, '_id')}/${desde}/${hasta}/${ciudad}`)
                          }}
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FullScreenDialog title='Filtros' open={open} handleClose={handleClose}>
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
                      checked={state[item._id]}
                      onChange={handleChange}
                      name='checkedA'
                      color='secondary'
                      value={item._id}
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
