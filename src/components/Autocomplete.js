import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import useAutocomplete from '@material-ui/lab/useAutocomplete'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  label: {
    display: 'block',
  },
  input: {
    width: '100%',
    height: 55,
    boxSizing: 'border-box',
    background: 'white',

    '&:hover': {
      'box-shadow': '0 1px 4px 0 rgba(0,0,0,.1)',
    },
  },
  listbox: {
    width: '100%',
    maxWidth: 340,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,

    '& li': {
      padding: 10,
      boxSizing: 'border-box',
    },

    '& li[data-focus="true"]': {
      backgroundColor: '#4a8df6',
      color: 'white',
      cursor: 'pointer',
    },
    '& li:active': {
      backgroundColor: '#2977f5',
      color: 'white',
    },
  },
}))

const AutocompleteComponent = ({ valueDefault = null, options: options1 = [], setValue: setData }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(valueDefault)

  const options = options1.map(option => {
    return option
  })

  useEffect(() => {
    if (valueDefault) {
      setValue(valueDefault)
    }
  }, [valueDefault])

  return (
    <div className={classes.input}> 
      <Autocomplete
        classes={classes.input}
        id='ciudad'
        color="secondary"
        options={options.sort((a, b) => b.category.localeCompare(a.category))}
        groupBy={option => option.category}
        getOptionLabel={option => option.nombre}
        renderInput={params => <TextField {...params} label='Buscar' variant='outlined' />}
        value={value}
        onChange={(event, newValue) => {
          localStorage.setItem('search', JSON.stringify(newValue))

          setValue(newValue)
          // setData('ciudad', get(newValue, 'slug'))
          setData('ciudad', newValue)
        }}
      />
    </div>
  )
}

export default React.memo(AutocompleteComponent)
