import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import get from 'lodash/get'
import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import { makeStyles } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'
import Checkbox from '@material-ui/core/Checkbox'

import Button from './Button'
import SimpleImage from './SimpleImage'
import AutocompleteComponent from './Autocomplete'
import Calendar from './Calendar'
import Typography from './Typography'
import FullScreenDialog from './Dialog'

import IconSomb from '../assets/icon-sombrilla_azul.svg'
import IconCalendar from '../assets/icon-calendar-azul.svg'
import IconLupa from '../assets/icon-lupa.svg'
import IdaVuelta from '../assets/de-ida-y-vuelta-azul.svg'

const useStyles = makeStyles(theme => ({
  contentSearchCenter: {
    background: theme.palette.primary.light /* '#f2f2f2' */ /* 'white' */,
    width: '100%',
    maxWidth: 960,
    boxSizing: 'border-box',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',
    height: 125,
    padding: 15,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '@media (max-width: 960px)': {
      height: 'auto',
    },

    '&:hover': {
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },

    /* '@media (max-width: 960px)': {
      margin: '0 10px',
      border: `1px solid ${theme.palette.secondary.main}`,
    }, */
  },
  mobile: {
    display: 'none',
    width: '100%',
    padding: '0 20px',

    '@media (max-width: 960px)': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
  },
  box: {
    padding: 3,
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',

    '@media (max-width: 960px)': {
      flexDirection: 'column',
      display: 'none',
    },
  },
  boxEnd: {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  boxColumn: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  icon: {
    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  boxButton: {
    display: 'block',

    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  gridColumn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  gridRow: {
    width: '100%',
    background: 'white',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  flexRevert: {
    flexDirection: 'revert',
  },
  border: {
    border: '1px solid #FFFFFF',
    boxSizing: 'border-box',
    margin: '0 10px',

    '&:hover': {
      'box-shadow': '0 1px 4px 0 rgba(0,0,0,.1)',
    },

    '@media (max-width: 680px)': {
      margin: 0,
      border: 'none',
    },
  },
  contentSearMobile: {
    padding: 10,
    background: '#f2f2f2',
    boxSizing: 'border-box',
    height: '100vh',
  },
}))

const Search = ({
  ciudades,
  styles,
  ciudad = null,
  desde,
  hasta,
  handleOnSubmit,
  variosDias = false,
  textSearch = 'Buscar Balneario',
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [ciudadDefault, setCiudadDefault] = useState(null)
  const [loading2, setLoading2] = useState(true)
  const [checked, setChecked] = useState(variosDias)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm()

  useEffect(() => {
    const date1 = dayjs(hasta)
    const dateDiff = date1.diff(desde, 'day')
    if (dateDiff) {
      setChecked(true)
    }
  }, [desde, hasta])

  useEffect(() => {
    register('ciudad', { required: 'Debe seleccionar algo' })
    register('desde')
    register('hasta')
  }, [])

  useEffect(() => {
    if (ciudad) {
      const ciudadesA = get(ciudades, 'searchListFront', []) || []
      const result = ciudadesA.find(item => {
        return item.slug === get(ciudad, 'slug')
      })
      if (result) {
        setCiudadDefault(result)
        setValue('ciudad', result)
      }
    }
    setLoading2(false)
  }, [ciudades, ciudad])

  const handleChange = event => {
    setChecked(event.target.checked)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = ({ ciudad, desde, hasta }) => {
    handleClose()
    if (checked) {
      handleOnSubmit({ ciudad, desde, hasta })
    } else {
      handleOnSubmit({ ciudad, desde, hasta: desde })
    }
  }

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={styles}
        className={`${classes.contentSearchCenter}`}
        //noValidate
      >
        <div className={classes.boxColumn}>
          {/* <div className={classes.boxEnd}>
          <Typography color="gray" textAlign='left' fontSize={18} variant='p'>
            Busca y reserva en donde quieras
          </Typography>
        </div> */}
          <div className={classes.box}>
            <div className={classes.box}>
              <div className={classes.icon}>
                <SimpleImage height={25} alt='Alquiler de Carpas en Balnearios' image={IconSomb} />
              </div>
              <div style={{ margin: '0 10px', width: '100%' }}>
                {loading2 ? (
                  <CircularProgress />
                ) : (
                  <AutocompleteComponent
                    valueDefault={ciudadDefault}
                    options={get(ciudades, 'searchListFront')}
                    setValue={setValue}
                    errors={errors}
                  />
                )}
              </div>
            </div>
            <div className={classes.box}>
              <div className={classes.icon}>
                <SimpleImage height={25} alt='Alquiler de Carpas en Balnearios' image={IconCalendar} />
              </div>
              <div className={`${classes.gridRow} ${classes.border}`}>
                <div style={{ width: '100%' }}>
                  <Calendar name='desde' setValue={setValue} value={desde} />
                </div>
                {checked && (
                  <React.Fragment>
                    <div>
                      <SimpleImage
                        height={20}
                        alt='Alquiler de Carpas en Balnearios'
                        image={IdaVuelta}
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <Calendar name='hasta' setValue={setValue} value={hasta} />
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
            <div className={classes.boxButton}>
              <Button fullWidth type='submit' width={100} height={50} disableElevation border={20}>
                <SimpleImage height={22} alt='Alquiler de Carpas en Balnearios' image={IconLupa} />
              </Button>
            </div>
          </div>
          <div className={classes.box}>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography color='#1769aa' fontWeight={900} textAlign='cemter' fontSize={15} variant='p'>
              Seleccionar varios dias
            </Typography>
          </div>
        </div>
        {/* Mini Search Mobile */}
        <div className={classes.mobile} onClick={handleClickOpen}>
          <div style={{ marginRight: 10 }}>
            <SimpleImage height={30} alt='Alquiler de Carpas en Balnearios' image={IconLupa} />
          </div>
          <div>
            <Typography color='gray' textAlign='cemter' fontSize={25} variant='h2'>
              {textSearch}
            </Typography>
          </div>
        </div>
      </form>

      {/* Search Mobile en Modal */}
      <FullScreenDialog fullScreen={true} open={open} handleClose={handleClose}>
        <div className={classes.contentSearMobile}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            // style={styles}
            //className={`${classes.contentSearchCenter}`}
            //noValidate
          >
            <div style={{ marginBottom: 10 }}>
              <Typography textAlign='left' fontSize={18} variant='p' color='black'>
                Ingresar Playa
              </Typography>
            </div>
            <div>
              {loading2 ? (
                <CircularProgress />
              ) : (
                <AutocompleteComponent
                  valueDefault={ciudadDefault}
                  options={get(ciudades, 'searchListFront')}
                  setValue={setValue}
                  errors={errors}
                />
              )}
            </div>
            <div style={{ marginTop: 10, marginBottom: 5 }}>
              <Typography textAlign='left' fontSize={15} variant='p' color='black'>
                Seleccionar Fecha
              </Typography>
            </div>
            <div className={`${classes.gridColumn} ${classes.border}`}>
              <div style={{ width: '100%', marginBottom: 10 }}>
                <Calendar name='desde' setValue={setValue} value={desde} />
              </div>
              {checked && (
                <React.Fragment>
                  <div style={{ width: '100%', marginTop: 10, marginBottom: 10 }}>
                    <Typography textAlign='center' fontSize={15} variant='p' color='black'>
                      hasta
                    </Typography>
                  </div>
                  <div style={{ width: '100%', marginBottom: 10 }}>
                    <Calendar name='hasta' setValue={setValue} value={hasta} />
                  </div>
                </React.Fragment>
              )}
              <div className={`${classes.gridColumn} ${classes.flexRevert}`}>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Typography color='gray' textAlign='cemter' fontSize={13} variant='p'>
                  Seleccionar varios dias
                </Typography>
              </div>
            </div>
            <div>
              <Button
                type='submit'
                fullWidth
                height={48}
                // onClick={e => {
                //   e.preventDefault()
                //   onSubmit()
                // }}
              >
                Buscar
              </Button>
            </div>
          </form>
        </div>
      </FullScreenDialog>
    </React.Fragment>
  )
}
export default React.memo(Search)
