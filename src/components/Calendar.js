import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import esLocale from "date-fns/locale/es"
import DateFnsUtils from '@date-io/date-fns'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    margin: 0,
  },
  calendar: {
    padding: 0,
    width: '100%',
    margin: 0,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    height: 50,

    '& div': {
      height: '100%',
      width: '100%',
      background: 'white',

      '&::before': {
        borderBottom: 'none'
      },

      '@media (max-width: 680px)': {
        border: '1px solid gray',
        boxSizing: 'border-box',
      },

      '& input': {
        textAlign: 'center',
        fontSize: 12,
        width: '100%',
        border: 'none'
      },
    },

    '& label': {
      display: 'none',
      margin: 0,
    },
    '& button': {
      padding: 0,
    },
  },
}))

const Calendar = ({ name = 'fecha', setValue, value = dayjs().format('YYYY-MM-DD') }) => {
  const [selectedDate, handleDateChange] = useState(dayjs(value, 'YYYY-MM-DD'))
  const classes = useStyles()

  useEffect(() => {
    setTimeout(() => {
      setValue(name, dayjs(selectedDate).format('YYYY-MM-DD'))
    }, 200)
  }, [])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <DatePicker
        disableToolbar
        disablePast
        className={classes.calendar}
        autoOk
        variant='inline'
        format='dd/MM/yyyy'
        value={selectedDate}
        //InputAdornmentProps={{ position: 'start' }}
        onChange={date => {
          // setValue(name, dayjs(date).format('DD-MM-YYYY'))
          setValue(name, dayjs(date).format('YYYY-MM-DD'))

          handleDateChange(date)
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default Calendar

