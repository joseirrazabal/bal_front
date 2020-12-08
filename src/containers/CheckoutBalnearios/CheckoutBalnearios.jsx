import React from 'react'
// Material
import { makeStyles } from '@material-ui/core/styles'
// Components
import ButtonAcceptComponent from '../../components/ButtonAccept'
import Input from '../../components/Input'
import ItemSelected from '../../components/ItemSelected'
import Typography from '../../components/Typography'
import SimpleImage from '../../components/SimpleImage'
// Assets
// import ImageMp from '../../assets/img-mercadopago.jpg'

const itemsCard = [1,2,3];
const imageMp = require('../../assets/img-mercadopago.jpg')

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 960px)': {
			justifyContent: 'flex-start',
      alignItems: 'flex-start',
		}
  },
  container: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  contentBanners: {
    width: '100vw',
    height: '100vh',
    paddingTop: 70,
    background: 'white',
    position: 'relative',

    '@media (max-width: 960px)': {
      height: 'auto',
      paddingTop: 0,
		}
  },
  contentDetalle: {
    width: '100%',
    maxWidth: 1280,
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    background: '#f2f2f2',
    borderRadius: 6,
    overflow: 'hidden',
    boxSizing: 'border-box',
    marginBottom: 20,
    'box-shadow': '0 2px 1px 0 rgba(0,0,0,.2)',

		'@media (max-width: 960px)': {
      marginTop: 0,
      flexDirection: 'column',
      background: '#f2f2f2',
		}
  },
  contentDetalleColumn: {
    width: '100%',
    maxWidth: 1280,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    borderRadius: 6,
    overflow: 'hidden',
    padding: 15,
    boxSizing: 'border-box',
    marginBottom: 20,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

		'@media (max-width: 960px)': {
      marginTop: 0,
      background: '#f2f2f2',
		}
  },
  item: {
    margin: '15px 0',
  },
  slider: {
    width: '65%',
    height: 450,
    alignItems: 'stretch',
    display: 'flex',

    '@media (max-width: 960px)': {
      width: '100%',
		}
  },
  detalle: {
    width: '35%',
    borderLeft: '1px solid white',
    position: 'relative',
    display: 'flex',
    alignSelf: 'strech',
    flexDirection: 'column',

    '@media (max-width: 960px)': {
      width: '100%',
		}
  },
  detalleTop: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: 15
  },
  detalleBottom: {
    background: '#F9F8F7',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: 15
  },
  gridColumn: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  gridRow: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    '@media (max-width: 960px)': {
      flexDirection: 'column',
		}
  },
  cardPrecio: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',

    '@media (max-width: 960px)': {
      background: 'white',
      position: 'fixed',
      padding: 15,
      bottom: 0,
      zIndex: 3,
      left: 0
		}
  },
  message: {
    position: 'absolute',
    boxSizing: 'border-box',
    width: '100%',
    height: 'auto',
    top: 0,
    left: 0,
    padding: 15,
    color: 'white',
    background: '#55C443',
    marginBottom: 20,
    '@media (max-width: 960px)': {
      position: 'relative',
		}
  },
  form: {
    paddingTop: 60,
    '@media (max-width: 960px)': {
      paddingTop: 0,
		}
  },
  titleGeneric: {
    fontSize: 25,
    textAlign: 'left',
    margin: '10px 0'
  },
  title: {
    color: theme.palette.secondary,
    margin: '15px 0'
  },
  subTitle: {
    margin: '5px 0',
    color: theme.palette.secondary.light
  },
  imageMpClass: {
    margin: '15px 0',
  }
}))

const CheckoutBalnearios = ({theme}) => {

  const classes = useStyles()

  return (
    <div className={classes.contentFull}>
      <div className={classes.contentBanners}>
        <div className={classes.container}>
          <Typography fontWeight={700} fontSize={25} textAlign="center" className={classes.title} varian="h2">Checkout de pago</Typography>
          <div className={classes.contentDetalle}>
            <div className={classes.slider}>
              <div className={classes.gridColumn}>              
                <div className={classes.detalleTop} style={{position: 'relative'}}>
                  <div className={`${classes.gridColumn} ${classes.message}`}>
                    <p><b>¡Felicitaciones!.</b> <br/> Estas a un solo paso de comprar lo que querias</p>
                  </div>
                  <form className={classes.form}>
                    <div className={`${classes.gridRow}`}>
                      <Input 
                        type="text" 
                        label="Nombre" 
                        value="Ingresar Nombre" 
                        errorMessage="este campo es requerido" 
                      />
                      <Input 
                        type="text" 
                        label="Apellido" 
                        value="Ingresar Apellido" 
                        errorMessage="este campo es requerido" 
                      />
                    </div>
                    <div className={`${classes.gridRow}`}>
                      <Input 
                        type="email" 
                        label="Email" 
                        value="Ingresar Email" 
                        errorMessage="este campo es requerido" 
                      />
                      <Input 
                        type="phone" 
                        label="Teléfono" 
                        value="011" 
                        errorMessage="este campo es requerido" 
                      />
                    </div>
                  </form>
                </div>
                <div className={classes.detalleBottom}>
                  <div className={`${classes.cardPrecio}`}>
                    <div>
                      <Typography variant="p">
                        <Typography color="black" variant="span">$</Typography>
                        <Typography fontWeight={700} fontSize={25} color="black" variant="b">1850</Typography>
                      </Typography>
                      <Typography fontSize={14} fontWeight={700} color="black" variant="p">Total</Typography>
                    </div>
                    <ButtonAcceptComponent>
                      ALQUILAR
                    </ButtonAcceptComponent>
                  </div>
                </div>
              </div>
            </div> 
            <div className={classes.detalle}>
              <div className={classes.detalleTop}>
                <div className={classes.gridColumn}>
                  <Typography fontSize={25} variant="h3">RESUMEN</Typography>
                  <Typography fontSize={23} className={classes.subTitle}  variant="h4">Balnearios Santa Catalina</Typography>
                  <Typography fontSize={18} color="grey" variant="p">Mar del Plata</Typography>
                  <Typography fontSize={16} variant="p" color="grey">Balneario N° 11, Complejo Punta Mogotes, Mar del Plata</Typography>
                  <ItemSelected className={classes.item} checkout title="Alquilaste una Sombrilla" />
                </div>
              </div>
              <div className={classes.detalleBottom}>
                <div className={classes.gridColumn}>
                  <Typography fontSize={14} fontStyle="italic" color="grey" variant="p">Medios de PAgo</Typography>
                  <SimpleImage className={classes.imageMpClass} image={imageMp} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckoutBalnearios