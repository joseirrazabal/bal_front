import React from 'react'
// Material
import { makeStyles } from '@material-ui/core/styles'
// Components
import CardLab from "../../components/CardBal"
import Search from "../../components/Search"
import Carousel from '../../components/Carousel'
import Button from '../../components/Button'
import ItemSelected from '../../components/ItemSelected'
import Typography from '../../components/Typography'
import Selected from '../../components/Selected'
// Assets
import IconCarpAzul from '../../assets/icon-carpa.svg'

const itemsCard = [1,2,3];

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100vw',
    background: 'black',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSearch: {
    width: '100vw',
    height: 80,
    background: 'gray',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    boxSizing: 'border-box',

    '@media (max-width: 960px)': {
			height: 80,
      background: 'gray',
      padding: '0 10px',
      marginTop: 0,
		}
  },
  contentBanners: {
    width: '100vw',
    height: 'auto',
    background: '#f2f2f2',
    position: 'relative',

    '@media (max-width: 960px)': {
			height: 'auto',
		}
  },
  contentDetalle: {
    width: '100%',
    maxWidth: 1280,
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    background: 'white',
    borderRadius: 6,
    overflow: 'hidden',
    boxSizing: 'border-box',
    marginBottom: 20,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

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
  slider: {
    width: '60%',
    height: 460,
    background: 'green',
    '@media (max-width: 960px)': {
      width: '100%',
		}
  },
  detalle: {
    width: '40%',
    background: 'red',
    position: 'relative',
    display: 'flex',
    alignSelf: 'strech',
    flexDirection: 'column',

    '@media (max-width: 960px)': {
      width: '100%',
		}
  },
  imageBackground: {
    width: '100wv!important',
    height: '100%',
    minHeight: 460,
    background: 'pink',
  },
  detalleTop: {
    width: '100%',
    height: '100%',
    background: 'white',
    boxSizing: 'border-box',
    padding: 15
  },
  detalleBottom: {
    width: '100%',
    height: '100%',
    background: '#F9F8F7',
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
  },
  cardPrecio: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    alignItems: 'center',

    '@media (max-width: 960px)': {
      'box-shadow': '0 2px 2px 3px rgba(0,0,0,.1)',
      background: 'white',
      alignItems: 'center',
      position: 'fixed',
      padding: 15,
      bottom: 0,
      zIndex: 3,
      left: 0
		}
  },
  title: {
    color: theme.palette.secondary,
    margin: '15px 0'
  },
  subTitle: {
    margin: '5px 0',
    color: theme.palette.secondary.light
  },
}))

const DetalleBalneario = () => {

  const classes = useStyles()

  return (
    <div className={classes.contentFull}>
      <div className={classes.contentSearch}>
        <div className={classes.container}>
          <Search />
        </div>
      </div>
      <div className={classes.contentBanners}>
        <div className={classes.container}>
        <Typography fontWeight={700} fontSize={25} textAlign="center" className={classes.title} varian="h2">Balneario</Typography>
          <div className={classes.contentDetalle}>
            <div className={classes.slider}>
              <Carousel>
                <div className={classes.imageBackground}>1</div>
                <div className={classes.imageBackground}>2</div>
                <div className={classes.imageBackground}>3</div>
              </Carousel>
            </div>
            <div className={classes.detalle}>
              <div className={classes.detalleTop}>
                <div className={classes.gridColumn}>
                  <Typography fontSize={23} className={classes.subTitle}  variant="h4">Balnearios Santa Catalina</Typography>
                  <Typography fontSize={18} color="grey" variant="p">Mar del Plata</Typography>
                  <Typography fontSize={16} variant="p" color="grey">Balneario N° 11, Complejo Punta Mogotes, Mar del Plata</Typography>
                </div>
                <div className={classes.gridRow}>
                  <ItemSelected />
                  <ItemSelected active icon={IconCarpAzul} title="Alquilar Carpa" precio={400} />
                </div>
                <div className={classes.gridRow}>
                  <Selected />
                </div>
              </div>
              <div className={classes.detalleBottom}>
                <div className={`${classes.gridRow} ${classes.cardPrecio}`}>
                  <div>
                    <Typography variant="p">
                      <Typography color="black" variant="span">$</Typography>
                      <Typography fontWeight={700} fontSize={25} color="black" variant="b">1850</Typography>
                    </Typography>
                    <Typography fontSize={14} fontWeight={700} color="black" variant="p">del 10 al 13 de Enero</Typography>
                  </div>
                  <Button height={48} width={200}> 
                    ALQUILAR
                  </Button>
                </div>
                <div className={classes.gridColumn}>
                  <p>titulo</p>
                  <p>titulo</p>
                  <p>titulo</p>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.contentDetalleColumn}>
            <Typography fontWeight={700} fontSize={20} varian="h3">Titulo</Typography>
            <Typography fontSize={16} color="black" lineHeight={'30px'}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a 
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
              but also the leap into electronic typesetting, remaining essentially unchanged. 
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>
          </div>
          <div className={classes.contentDetalleColumn}>
          <Typography fontWeight={700} fontSize={20} varian="h3">Titulo</Typography>
            <div>
              {itemsCard.map((id) => {
                return(<CardLab key={id} />)
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DetalleBalneario