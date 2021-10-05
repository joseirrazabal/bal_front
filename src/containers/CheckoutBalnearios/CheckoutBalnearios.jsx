import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import get from 'lodash/get'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import NoSsr from '@material-ui/core/NoSsr'

import ButtonAcceptComponent from '../../components/ButtonAccept'
import MessageGeneric from '../../components/MessageGeneric'
import ItemSelected from '../../components/ItemSelected'
import Typography from '../../components/Typography'
import SimpleImage from '../../components/SimpleImage'
import FullScreenDialog from '../../components/Dialog'
import Loading from '../../components/Loading'

import Term from '../TyC/Term'

import ImageMp from '../../assets/img-mercadopago.jpg'
import CreditCard1 from '../../assets/cards1.png'
import CreditCard2 from '../../assets/cards2.png'
import ErrorMsg from './errorMP'

import PRECIO_GET from 'gql/precio/get'
import RESERVA_ADD from 'gql/reserva/save'

dayjs.extend(customParseFormat)

const { MERCADO_PAGO_PUBLIC_KEY } = process.env
const { NODE_ENV } = process.env

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
    },
  },
  container: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    },
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
    },
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
    },
  },
  item: {
    margin: '15px 0',
  },
  slider: {
    width: '65%',
    height: 'auto',
    alignItems: 'stretch',
    display: 'flex',

    '@media (max-width: 960px)': {
      width: '100%',
    },
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
    },
  },
  detalleTop: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: 15,
  },
  detalleBottom: {
    background: '#F9F8F7',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: 15,
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
    },
  },
  gridRowTyC: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',

    '& a': {
      cursor: 'pointer',
      marginLeft: -10,
      marginTop: -1,
    },
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
      left: 0,
    },
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
    },
  },
  form: {
    paddingTop: 60,
    '@media (max-width: 960px)': {
      paddingTop: 0,
    },
  },
  titleGeneric: {
    fontSize: 25,
    textAlign: 'left',
    margin: '10px 0',
  },
  title: {
    color: theme.palette.secondary,
    padding: '15px 0',
  },
  subTitle: {
    margin: '5px 0',
    color: theme.palette.secondary.light,
  },
  imageMpClass: {
    margin: '15px 0',
  },
  input: {
    width: '100%',
    margin: 5,
    background: 'white',
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',

    '& label': {
      fontSize: 12,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      padding: 10,

      '& span': {
        display: 'none',
      },
    },

    '& input': {
      border: 'none',
      borderBottom: '1px solid silver',
      padding: 10,
    },

    '& select': {
      border: 'none',
      borderBottom: '1px solid silver',
      padding: 10,
    },

    '@media (max-width: 960px)': {
      margin: '5px 0',
    },
  },
  inputError: {
    width: '100%',
    margin: 5,
    background: 'white',
    borderRadius: 6,
    display: 'flex',
    border: '1px solid red',
    flexDirection: 'column',
    boxSizing: 'border-box',

    '& label': {
      fontSize: 12,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      padding: 10,

      '& span': {
        display: 'block',
        color: 'red',
      },
    },

    '& input': {
      border: 'none',
      borderBottom: '1px solid red',
      padding: 10,
    },

    '& select': {
      border: 'none',
      borderBottom: '1px solid red',
      padding: 10,
    },

    '@media (max-width: 960px)': {
      margin: '5px 0',
    },
  },
}))

const CheckoutBalnearios = ({ theme }) => {
  const classes = useStyles()
  const history = useHistory()
  const { balneario, categoria, desde, hasta } = useParams()
  const { state } = useLocation()

  const itemSelected = state.itemSelected

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const [keyPublic, setKeyPublic] = useState(false)
  const [textoCuota, setTextoCuota] = useState(false)
  const [open, setOpen] = useState(false)
  const [errorMP, setErrorMP] = useState(false)
  const [precio, setPrecio] = useState({})

  const { data: dataPrecio, loading: loadingPrecio } = useQuery(PRECIO_GET, {
    variables: { balneario: balneario, categoria: categoria, desde: desde, hasta: hasta },
    fetchPolicy: 'no-cache',
  })

  const [reservaAdd, { data: dataReserva, loading: loadingReserva, error: errorReserva }] =
    useMutation(RESERVA_ADD)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (get(dataPrecio, 'precioGetFront.precio')) {
      setPrecio(get(dataPrecio, 'precioGetFront'))
      if (NODE_ENV !== 'production') {
        console.log('key meli dev')
        setKeyPublic(MERCADO_PAGO_PUBLIC_KEY)
      } else {
        setKeyPublic(get(dataPrecio, 'precioGetFront.keyPublic'))
      }
    }
  }, [dataPrecio])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // ==========
  const [issuers, setIssuers] = useState([])
  const [installments, setInstallments] = useState([])
  const [issuerSelect, setIssuerSelect] = useState({})
  const [installmentSelect, setInstallmentSelect] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState({})
  const [tipoDocumento, setTipoDocument] = useState([])

  useEffect(() => {
    setIssuerSelect(get(issuers, '0.id'))
  }, [issuers])

  useEffect(() => {
    setInstallmentSelect(get(installments, '0.id'))
  }, [installments])

  useEffect(() => {
    const result = installments.find(item => item.id === parseInt(installmentSelect))

    setTextoCuota(get(result, 'name', ''))
  }, [installmentSelect])

  useEffect(() => {
    if (keyPublic) {
      Mercadopago.setPublishableKey(keyPublic)
      Mercadopago.getIdentificationTypes((status, response) => {
        setTipoDocument(response)
      })
    }
  }, [keyPublic])

  const handleCardChange = event => {
    if (event.target.value.length >= 6) {
      guessPaymentMethod({ cardNumber: event.target.value })
    }
  }

  const guessPaymentMethod = ({ cardNumber = '' }) => {
    if (cardNumber.length >= 6) {
      let bin = cardNumber.substring(0, 6)
      Mercadopago.getPaymentMethod(
        {
          bin: bin,
        },
        (status, response) => {
          if (status == 200) {
            let paymentMethod = response[0]
            setPaymentMethod(paymentMethod.id)

            getIssuers(paymentMethod.id)
          } else {
            console.log(`payment method info error: ${JSON.stringify(response)}`)
          }
        }
      )
    }
  }

  const getIssuers = paymentMethodId => {
    Mercadopago.getIssuers(paymentMethodId, (status, response) => {
      if (status == 200) {
        setIssuers(response)

        getInstallments(
          paymentMethodId,
          parseInt(get(precio, 'precio')) * parseInt(get(precio, 'dias')),
          issuerSelect
        )
      } else {
        console.log(`issuers method info error: ${response}`)
      }
    })
  }

  const getInstallments = (paymentMethodId, transactionAmount, issuerId) => {
    Mercadopago.getInstallments(
      {
        payment_method_id: paymentMethodId,
        amount: parseFloat(transactionAmount),
        issuer_id: parseInt(issuerId),
      },
      (status, response) => {
        if (status == 200) {
          const result = []
          response[0].payer_costs.forEach(payerCost => {
            result.push({ name: payerCost.recommended_message, id: payerCost.installments })
          })
          setInstallments(result)
        } else {
          setInstallments([])
          console.log(`installments method info error: ${response}`)
        }
      }
    )
  }

  const getInitInstallment = () => {
    return [
      {
        installments: 1,
        label: 1,
        value: 1,
        labels: ['CFT_0,00%|TEA_0,00%'],
        recommended_message: `1 cuota de $ ${
          parseInt(get(precio, 'precio')) * parseInt(get(precio, 'dias'))
        }`,
      },
    ]
  }

  const cardExpirationMonth = useRef()
  const cardExpirationYear = useRef()
  const cardNumber = useRef()
  const securityCode = useRef()
  const cardholderName = useRef()

  const onSubmit = ({ checkedA, ...data }) => {
    const form = {
      ...data,
      anotaciones: `numero: ${get(itemSelected, 'numero')}`,
      cardExpirationMonth: parseInt(cardExpirationMonth.current.value),
      cardExpirationYear: parseInt(cardExpirationYear.current.value),
      cardNumber: parseInt(cardNumber.current.value),
      securityCode: parseInt(securityCode.current.value),
      cardholderName: cardholderName.current.value,
    }

    Mercadopago.clearSession()

    Mercadopago.createToken(form, (status, response) => {
      if (status != 200 && status != 201) {
        setErrorMP(get(response, 'cause', [{ code: 2 }]))
        return false
      } else {
        setErrorMP(false)

        const descrip = `Alamar: ${get(precio, 'balneario')} - ${get(precio, 'tipo')} - ${get(
          precio,
          'categoria'
        )} desde: ${desde} hasta: ${hasta}`

        reservaAdd({
          variables: {
            input: {
              ...data,
              precioId: get(precio, 'id'),
              balneario: get(precio, 'balnearioSlug'),
              categoria: get(precio, 'categoriaSlug'),
              desde: desde,
              hasta: hasta,
              precio: get(precio, 'id'),
              amount: `${parseInt(get(precio, 'precio')) * parseInt(get(precio, 'dias'))}`,
              token: response.id,
              paymentMethodId: paymentMethod,
              description: descrip,
            },
          },
        })
      }
    })
  }

  if (loadingPrecio) {
    return (
      <NoSsr>
        <Loading />
      </NoSsr>
    )
  }

  // error en la reserva
  if (errorReserva) {
    return <MessageGeneric isError pagoMessage={errorReserva.message} />
  }

  // mensaje reserva
  if (dataReserva) {
    return (
      <MessageGeneric
        data={get(precio, 'balneario')}
        direccion={get(precio, 'direccion')}
        ciudad={get(precio, 'ciudad')}
        // precio={`Alquilaste una ${get(precio, 'tipo')}`}
        precio={parseInt(get(precio, 'precio')) * parseInt(get(precio, 'dias'))}
        pagoStatus={get(dataReserva, 'reservaAdd.pago.status')}
        pagoMessage={get(dataReserva, 'reservaAdd.pago.message')}
      />
    )
  }

  return (
    <div className={classes.contentFull}>
      <div className={classes.contentBanners}>
        <div className={classes.container}>
          <Typography
            fontWeight={700}
            fontSize={25}
            textAlign='center'
            className={classes.title}
            varian='h2'
          >
            Checkout de pago
          </Typography>
          <div className={classes.contentDetalle}>
            <div className={classes.slider}>
              <div className={classes.gridColumn}>
                <div className={classes.detalleTop} style={{ position: 'relative' }}>
                  <div className={`${classes.gridColumn} ${classes.message}`}>
                    <p>
                      <b>¡Felicitaciones!.</b> Estas a un solo paso
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={classes.form}
                    method='post'
                    //noValidate
                    //id='paymentForm'
                  >
                    <div>
                      {errorMP &&
                        errorMP.map(item => {
                          return <div style={{ color: 'red' }}>{ErrorMsg(item.code)}</div>
                        })}
                      <div className={`${classes.gridRow}`}>
                        <div className={classes.input}>
                          <label htmlFor='email'>E-mail</label>
                          <input
                            name='email'
                            id='email'
                            type='text'
                            required
                            {...register('email', { required: 'Campo requerido' })}
                          />
                          {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                        </div>
                        <div className={classes.input}>
                          <label htmlFor='docType'>Tipo de documento</label>
                          <select
                            id='docType'
                            name='docType'
                            {...register('docType', { required: 'Campo requerido' })}
                          >
                            {tipoDocumento.map((tipo, i) => {
                              return (
                                <option key={i} value={tipo.id}>
                                  {tipo.name}
                                </option>
                              )
                            })}
                          </select>
                          {errors.docType && (
                            <div style={{ color: 'red' }}>{errors.docType.message}</div>
                          )}
                        </div>
                      </div>
                      <div className={`${classes.gridRow}`}>
                        <div className={classes.input}>
                          <label htmlFor='docNumber'>Número de documento</label>
                          <input
                            id='docNumber'
                            name='docNumber'
                            data-checkout='docNumber'
                            type='text'
                            required
                            {...register('docNumber', { required: 'Campo requerido' })}
                          />
                          {errors.docNumber && (
                            <div style={{ color: 'red' }}>{errors.docNumber.message}</div>
                          )}
                        </div>
                        <div className={classes.input}>
                          <label htmlFor='cardholderName'>Titular de la tarjeta</label>
                          <input
                            id='cardholderName'
                            ref={cardholderName}
                            data-checkout='cardholderName'
                            type='text'
                            required
                          />
                        </div>
                      </div>

                      <div className={`${classes.gridRow}`}>
                        <div className={classes.input}>
                          <label htmlFor=''>Fecha de vencimiento</label>
                          <div>
                            <input
                              type='text'
                              placeholder='MM'
                              id='cardExpirationMonth'
                              ref={cardExpirationMonth}
                              data-checkout='cardExpirationMonth'
                              //onSelectStart={() => false}
                              onPaste={() => false}
                              onCopy={() => false}
                              onCut={() => false}
                              onDrag={() => false}
                              onDrop={() => false}
                              autoComplete='off'
                              minLength='2'
                              maxLength='2'
                              required
                            />
                            <span className='date-separator'>/</span>
                            <input
                              type='text'
                              placeholder='YYYY'
                              id='cardExpirationYear'
                              ref={cardExpirationYear}
                              data-checkout='cardExpirationYear'
                              //onSelectStart={() => false}
                              onPaste={() => false}
                              onCopy={() => false}
                              onCut={() => false}
                              onDrag={() => false}
                              onDrop={() => false}
                              autoComplete='off'
                              minLength='4'
                              maxLength='4'
                              required
                            />
                          </div>
                        </div>
                        <div className={classes.input}>
                          <label htmlFor='cardNumber'>Número de la tarjeta</label>
                          <input
                            onChange={handleCardChange}
                            type='text'
                            id='cardNumber'
                            ref={cardNumber}
                            data-checkout='cardNumber'
                            //onSelectStart={() => false}
                            onPaste={() => false}
                            onCopy={() => false}
                            onCut={() => false}
                            onDrag={() => false}
                            onDrop={() => false}
                            autoComplete='off'
                            required
                          />
                        </div>
                      </div>
                      <div className={`${classes.gridRow}`}>
                        <div className={classes.input}>
                          <label htmlFor='securityCode'>Código de seguridad</label>
                          <input
                            id='securityCode'
                            ref={securityCode}
                            data-checkout='securityCode'
                            type='text'
                            //onSelectStart={() => false}
                            onPaste={() => false}
                            onCopy={() => false}
                            onCut={() => false}
                            onDrag={() => false}
                            onDrop={() => false}
                            autoComplete='off'
                            required
                          />
                        </div>
                        <div className={`${classes.input}`} id='issuerInput'>
                          <label htmlFor='issuer'>Banco emisor</label>
                          <select
                            name={`issuer`}
                            {...register('issuer', { required: 'Campo requerido' })}
                            onChange={e => {
                              getInstallments(
                                paymentMethod,
                                parseInt(get(precio, 'precio')) * parseInt(get(precio, 'dias')),
                                e.target.value
                              )
                            }}
                          >
                            {issuers.map((isu, i) => {
                              return (
                                <option key={i} value={isu.id}>
                                  {isu.name}
                                </option>
                              )
                            })}
                          </select>
                          {errors.issuer && <div style={{ color: 'red' }}>{errors.issuer.message}</div>}
                        </div>
                      </div>
                      {/* tarjeta*/}

                      <div className={`${classes.gridRow}`}>
                        <div className={`${classes.input}`}>
                          <label htmlFor='installments'>Cuotas</label>
                          <select
                            name={`installments`}
                            {...register('installments', { required: 'Campo requerido' })}
                            onChange={e => {
                              setInstallmentSelect(e.target.value)
                            }}
                          >
                            {installments.map((inst, i) => {
                              return (
                                <option key={i} value={inst.id}>
                                  {inst.name}
                                </option>
                              )
                            })}
                          </select>
                          {errors.installments && (
                            <div style={{ color: 'red' }}>{errors.installments.message}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={classes.gridRowTyC}>
                      <div>
                        <Controller
                          name={'checkedA'}
                          control={control}
                          defaultValue={false}
                          rules={{ required: 'Debe aceptar los terminos y condiciones' }}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  {...field}
                                  //inputRef={ref}
                                  //checked={value}
                                  //onChange={e => {
                                  //  console.log("e", e)
                                  //  onChange(e.target.checked)}
                                  //}
                                />
                              }
                              label={'Leí y acepto los'}
                            />
                          )}
                        />
                        {errors.checkedA && (
                          <div style={{ color: 'red' }}>{errors.checkedA.message}</div>
                        )}
                      </div>
                      <div onClick={handleClickOpen}>
                        <Typography fontWeight={700} fontSize={16} variant='b'>
                          terminos y condiciones
                        </Typography>
                      </div>
                    </div>

                    <div className={`${classes.cardPrecio}`}>
                      <div style={{ width: '100%' }}>
                        <ButtonAcceptComponent type='submit' loading={loadingReserva}>
                          ALQUILAR
                        </ButtonAcceptComponent>
                      </div>
                      <div style={{ width: '100%' }}>
                        <Typography variant='p' textAlign='right'>
                          <Typography fontWeight={700} fontSize={25} color='black' variant='b'>
                            {`$ ${parseInt(get(precio, 'precio')) * parseInt(get(precio, 'dias'))}`}
                          </Typography>
                        </Typography>
                        <Typography
                          fontSize={14}
                          fontWeight={700}
                          color='black'
                          variant='p'
                          textAlign='right'
                        >
                          Total
                        </Typography>
                      </div>
                    </div>
                  </form>
                </div>
                <div className={classes.detalleBottom}></div>
              </div>
            </div>
            <div className={classes.detalle}>
              <div className={classes.detalleTop}>
                <div className={classes.gridColumn}>
                  <Typography fontSize={25} variant='h3'>
                    RESUMEN
                  </Typography>
                  <Typography fontSize={23} className={classes.subTitle} variant='h4'>
                    {get(precio, 'balneario')}
                  </Typography>
                  <Typography fontSize={23} className={classes.subTitle} variant='h4'>
                    {get(precio, 'categoria')}
                  </Typography>
                  <Typography fontSize={18} color='grey' variant='p'>
                    {get(precio, 'ciudad')}
                  </Typography>
                  <Typography fontSize={16} variant='p' color='grey'>
                    {get(precio, 'direccion')}
                  </Typography>
                  {itemSelected && (
                    <Typography fontSize={16} variant='p' color='grey'>
                      Numero seleccionado: {get(itemSelected, 'numero')}
                    </Typography>
                  )}
                  <ItemSelected
                    className={classes.item}
                    checkout
                    title={`Alquilaste una ${get(precio, 'tipo')}`}
                  />
                </div>
              </div>
              <div className={classes.detalleBottom}>
                <div className={classes.gridColumn}>
                  <Typography fontSize={14} fontStyle='italic' color='grey' variant='p'>
                    Medios de Pago
                  </Typography>
                  <div style={{ marginTop: 10 }}>
                    <SimpleImage
                      width={'100%'}
                      image={'https://imgmp.mlstatic.com/org-img/banners/ar/medios/online/468X60.jpg'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FullScreenDialog title='Terminos y condiciones' open={open} handleClose={handleClose}>
        <Term />
      </FullScreenDialog>
    </div>
  )
}
export default React.memo(CheckoutBalnearios)
