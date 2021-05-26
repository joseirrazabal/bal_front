import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import SimpleImage from './SimpleImage'

import IconSomb from '../assets/icon-sombri.svg'
import IconCalendar from '../assets/icon-calendar.svg'

const useStyles = makeStyles(theme => ({
  selected: {
    width: '100%',
    margin: 5,
    padding: 5,
    background: 'white',
    borderRadius: 6,
    display: 'flex',
    boxSizing: 'border-box',
    border: `1px solid ${theme.palette.secondary.main}`,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.3)',

    '& label': {
      fontSize: 12,
      // width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      padding: 10,

      '& span': {
        display: 'none',
      },
    },

    '&:focus': {
      'box-shadow': '0 3px 6px 0 rgba(0,0,0,.4)',
    },

    '& select': {
      border: 'none',
      padding: 10,
      width: '100%',
    },

    '@media (max-width: 960px)': {
      margin: '5px 0',
    },
  },
  selectedError: {
    width: '100%',
    margin: 5,
    padding: 5,
    background: 'white',
    borderRadius: 6,
    display: 'flex',
    border: '1px solid red',
    boxSizing: 'border-box',
    border: '1px solid red',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    '& label': {
      fontSize: 12,
      // width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      padding: 10,

      '& span': {
        display: 'block',
        color: 'red',
      },
    },

    '&:focus': {
      'box-shadow': '0 3px 6px 0 rgba(0,0,0,.1)',
    },

    '& select': {
      border: 'none',
      padding: 10,
      width: '100%',
    },

    '@media (max-width: 960px)': {
      margin: '5px 0',
    },
  },
}))

const Selected = ({
  loading = true,
  items = [],
  label = 'Nombre',
  value = 'Ingresar Nombre',
  errorMessage = 'error',
  error = false,
  onChange = () => {},
}) => {
  const classes = useStyles()

  if (loading) {
    return (
      <div style={{height: 40, width: '100%', display: 'flex', justifyContent: 'center'}}> 
        <CircularProgress color="secondary"/>
      </div>
    )
  }

  return (
    <div className={`${!error ? classes.selected : classes.selectedError}`}>
      <label>
        <SimpleImage image={IconSomb} />
      </label>
      <select onChange={onChange}>
        {items.map((item, i) => {
          return (
            <option key={i} value={item.slug}>
              {item.nombre}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default React.memo(Selected)
