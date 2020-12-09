import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import { useForm, Controller } from 'react-hook-form'

import Button from './Button'
import SimpleImage from './SimpleImage'
import AutocompleteComponent from './Autocomplete'
import Calendar from './Calendar'

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

const Search = ({ styles }) => {
  const history = useHistory()
  const classes = useStyles()

  const { register, control, handleSubmit, errors, setValue } = useForm()

  const { data: ciudades, loading } = useQuery(CIUDAD_LIST)

  const onSubmit = data => {
    history.push(`/list/${get(data, 'ciudad._id')}/${get(data, 'desde')}//${get(data, 'hasta')}`)
  }

  useEffect(() => {
    register('ciudad')
    register('desde')
    register('hasta')
  }, [])

  if (loading) {
    return <div>loading</div>
  }

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
          <AutocompleteComponent options={get(ciudades, 'ciudadListFront')} setValue={setValue} />
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
        <Button type='submit' width={100} border='0 6px 6px 0'>
          <SimpleImage height={28} alt='Alquiler de Carpas en Balnearios' image={IconLupa} />
        </Button>
      </div>
    </form>
  )
}

export default Search
