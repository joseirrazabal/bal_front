import React from "react"
import { makeStyles } from "@material-ui/core/styles"
// Components
import Button from './Button'
import SimpleImage from './SimpleImage'
import AutocompleteComponent from './Autocomplete'
import Calendar from './Calendar'
// Icons
import IconSomb from '../assets/icon-sombri.svg'
import IconCalendar from '../assets/icon-calendar.svg'
import IconLupa from '../assets/icon-lupa.svg'

const useStyles = makeStyles((theme) => ({
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
      border: `1px solid ${theme.palette.secondary.main}`
		}
  },
  box: {
    padding: 3,
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',

    '@media (max-width: 960px)': {
			display: 'none'
		}
  },
  boxButton: {
    display: 'block',

    '@media (max-width: 960px)': {
			display: 'none'
		}
  },
  gridRow: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  border: {
    border: '1px solid gray',
    boxSizing: 'border-box',
    margin: '0 10px',
  }
}));

const Search = ({styles}) => {

  const classes = useStyles();

  return (
    <div style={styles} className={`${classes.contentSearchCenter}`}>
      <div className={classes.box}>
        <div style={{marginLeft: 10}}>
          <SimpleImage
            height={30}
            alt="Alquiler de Carpas en Balnearios"
            image={IconSomb}
          />
        </div>
        <div style={{margin: '0 10px', width: '100%'}}>
          <AutocompleteComponent />
        </div>
      </div>
      <div className={classes.box}>
        <SimpleImage
          height={30}
          alt="Alquiler de Carpas en Balnearios"
          image={IconCalendar}
        />
        <div className={`${classes.gridRow} ${classes.border}`}>
          <div>
            <Calendar />
          </div>
          <p>Hasta</p>
          <div>
            <Calendar />
          </div>
        </div>
      </div>
      <div className={classes.boxButton}>
        <Button width={100} border="0 6px 6px 0">
          <SimpleImage
            height={28}
            alt="Alquiler de Carpas en Balnearios"
            image={IconLupa}
          />
        </Button>
      </div>
      <div></div>
    </div>
  );
};
export default Search;
