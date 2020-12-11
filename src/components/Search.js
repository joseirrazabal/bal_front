import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import { useForm, Controller } from 'react-hook-form'

import Button from './Button'
import SimpleImage from './SimpleImage'
import AutocompleteComponent from './Autocomplete'
import Calendar from './Calendar'
import Typography from './Typography'
import FullScreenDialog from './Dialog'
// Icons
import IconSomb from '../assets/icon-sombri.svg'
import IconCalendar from '../assets/icon-calendar.svg'
import IconLupa from '../assets/icon-lupa.svg'

import CIUDAD_LIST from 'gql/ciudad/list'

const useStyles = makeStyles(theme => ({
  contentSearchCenter: {
    background: 'white',
    width: '100%',
    maxWidth: 960,
    boxSizing: 'border-box',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    height: 60,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '@media (max-width: 960px)': {
      margin: '0 10px',
      border: `1px solid ${theme.palette.secondary.main}`,
    },
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
      display: 'none',
    },
  },
  boxButton: {
    display: 'block',

    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  gridRow: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  border: {
    border: '1px solid gray',
    boxSizing: 'border-box',
    margin: '0 10px',
  },
}))

const Search = ({ styles, valueDefault = null }) => {
  const history = useHistory()
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [ciudadDefault, setCiudadDefault] = useState(null)
  const [loading2, setLoading2] = useState(true)

  const { register, control, handleSubmit, errors, setValue } = useForm()

  const { data: ciudades, loading } = useQuery(CIUDAD_LIST)

  const onSubmit = data => {
    history.push(`/list/${get(data, 'ciudad._id')}/${get(data, 'desde')}/${get(data, 'hasta')}`)
  }

  useEffect(() => {
    register('ciudad')
    register('desde')
    register('hasta')
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (valueDefault) {
      const ciudadesA = get(ciudades, 'ciudadListFront', []) || []
      const result = ciudadesA.find(item => {
        return item._id === valueDefault
      })
      if (result) {
        setCiudadDefault(result)
      }
    }
    setLoading2(false)
  }, [ciudades])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={styles}
      className={`${classes.contentSearchCenter}`}
      noValidate
    >
      <div className={classes.box}>
        <div style={{ marginLeft: 10 }}>
          <SimpleImage height={30} alt='Alquiler de Carpas en Balnearios' image={IconSomb} />
        </div>
        <div style={{ margin: '0 10px', width: '100%' }}>
          {loading2 ? (
            <div>loading...</div>
          ) : (
            <AutocompleteComponent
              valueDefault={ciudadDefault}
              options={get(ciudades, 'ciudadListFront')}
              setValue={setValue}
            />
          )}
        </div>
      </div>
      <div className={classes.box}>
        <SimpleImage height={30} alt='Alquiler de Carpas en Balnearios' image={IconCalendar} />
        <div className={`${classes.gridRow} ${classes.border}`}>
          <div>
            <Calendar name='desde' setValue={setValue} />
          </div>
          <p>Hasta</p>
          <div>
            <Calendar name='hasta' setValue={setValue} />
          </div>
        </div>
      </div>
      <div className={classes.boxButton}>
        <Button type='submit' width={100} height={60} border='0 6px 6px 0'>
          <SimpleImage height={28} alt='Alquiler de Carpas en Balnearios' image={IconLupa} />
        </Button>
      </div>
      <div className={classes.mobile} onClick={handleClickOpen}>
        <div style={{ marginRight: 10 }}>
          <SimpleImage height={30} alt='Alquiler de Carpas en Balnearios' image={IconCalendar} />
        </div>
        <div>
          <Typography textAlign='cemter' fontSize={25} variant='h2'>
            Seleccionar Balneario
          </Typography>
        </div>
      </div>
      <FullScreenDialog open={open} handleClose={handleClose}>
        <div>
          <AutocompleteComponent />
        </div>
        <div className={`${classes.gridRow} ${classes.border}`}>
          <div>
            <Calendar />
          </div>
          <p>Hasta</p>
          <div>
            <Calendar />
          </div>
        </div>
      </FullScreenDialog>
    </form>
  )
}
export default Search
