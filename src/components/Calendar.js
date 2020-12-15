import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import dayjs from 'dayjs'

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
    height: 44,

    '& div': {
      marginTop: 9,
      paddingBottom: 4,
      width: '100%',
      background: 'white',

      '@media (max-width: 680px)': {
        border: '1px solid gray',
        boxSizing: 'border-box',
      },

      '& input': {
        textAlign: 'center',
        width: '100%',
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

const Calendar = ({ name = 'fecha', setValue }) => {
  const [selectedDate, handleDateChange] = useState(new Date())
  const classes = useStyles()

  useEffect(() => {
    setTimeout(() => {
      setValue(name, dayjs(selectedDate).format('DD-MM-YYYY'))
    }, 200)
  }, [])

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        disableToolbar
        className={classes.calendar}
        autoOk
        variant='inline'
        format='dd/MM/yyyy'
        value={selectedDate}
        //InputAdornmentProps={{ position: 'start' }}
        onChange={date => {
          setValue(name, dayjs(date).format('DD-MM-YYYY'))

          handleDateChange(date)
        }}
      />
    </MuiPickersUtilsProvider>
  )
}
export default Calendar
