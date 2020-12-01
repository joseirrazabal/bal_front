import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    margin: 0,
  },
  calendar: {
    padding: 0,
    margin: 0,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    height: 44,

    '& div': {
      marginTop: 9,
      paddingBottom: 4,
      '& input': {
        textAlign: 'center'
      },
    },

    '& label': {
      display: 'none',
      margin: 0
    },
    '& button': {
      padding: 0
    }
  }
}));

const Calendar = () => {

  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        disableToolbar
        className={classes.calendar}
        autoOk
        variant="inline"
        label="With keyboard"
        format="MM/dd/yyyy"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={date => handleDateChange(date)}
      />
    </MuiPickersUtilsProvider>
  );
}
export default Calendar;