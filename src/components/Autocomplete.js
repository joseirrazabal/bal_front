import React from 'react'
import useAutocomplete from '@material-ui/lab/useAutocomplete'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

const useStyles = makeStyles(theme => ({
  label: {
    display: 'block',
  },
  input: {
    width: '100%',
    height: 40,
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
    border: '1px solid rgba(0,0,0,.25)',

    '& li': {
      padding: '10px 0',
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

const AutocompleteComponent = ({ valueDefault = null, options, setValue}) => {
  const classes = useStyles()

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    defaultValue: valueDefault,
    options: options,
    onChange: (event, newValue) => {
    	setValue('ciudad', newValue)
    },
    getOptionLabel: option => {
      return option.nombre
    },
  })

  return (
    <div style={{ width: '100%' }}>
      <div {...getRootProps()}>
        <input className={classes.input} {...getInputProps()} />
      </div>

      {groupedOptions.length > 0 && (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default React.memo(AutocompleteComponent)
