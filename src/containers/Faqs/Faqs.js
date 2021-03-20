import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '../../components/Typography'

const useStyles = makeStyles((theme) => ({
  contentTyC: {
    margin: 15,
  },
}));

const Faqs = () => {

  const classes = useStyles()
  
  return(
    <div className={classes.contentTyC}>
      <Typography variant="h3" fontWeight="700">
      SERVICIO
      </Typography>
      <br />
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>1- ¿Qué es Alamar?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Es una plataforma web para alquilar carpas y sombrillas en balnearios de la Costa Argentina.
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>2- ¿Cuáles son los beneficios de Alamar?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>Digitalización:</b> proceso 100% online en el cual no se necesita tener contacto con la administración de los
        balnearios.<br />
        De tu casa a la carpa. De tu silla a la sombrilla.<br />
        Ahorro de tiempo: al ser un proceso online, ahorrás tiempo en relación al proceso de búsqueda y pago,
        asegurando tener un lugar en el balneario que más te guste.<br />
        Descuentos y promociones: en la web podés ver todos los beneficios ofrecidos por el balneario, descuentos y
        promociones. Al seleccionar una reserva por más de un día ya se pueden percibir las rebajas sobre el precio.
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>3- ¿Cómo funciona?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Al ingresar a Alamar, se mostrará una barra de búsqueda para seleccionar la ciudad, el balneario o la fecha deseada para hacer una reserva. Luego, se mostrarán todas las ofertas disponibles con sus respectivos precios, beneficios y puntuaciones con la posibilidad de aplicar diferentes filtros. 
        Una vez confirmado el pago, se enviará un mail de confirmación que servirá para ingresar a la carpa o sombrilla al llegar al balneario.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
      RESERVAS Y DEVOLUCIONES
      </Typography>
      <br />
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>4- ¿Cómo reservo una carpa o sombrilla?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Sencillo.<br />
        - Ingresar al sitio web.<br /> 
        - Buscar y seleccionar la Ciudad y la fecha.<br />
        - Buscar y seleccionar el balneario.<br />
        - Buscar y seleccionar la carpa o sombrilla.<br />
        - Datos para la facturación.<br />
        - Por último, en menos de un minuto te llegará un mail de confirmación.<br />
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>5-  ¿Puedo ver la localización de mi carpa o sombrilla?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Todos los balnearios cuentan con un mapa de ubicación de las carpas y sombrillas, ordenadas por Sector, donde podrán ver su disponibilidad.
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>6- ¿Dónde veo mi reserva?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Podrás visualizar la misma a través del mail de confirmación. El mismo se usará para ingresar a la carpa o sombrilla.
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>7- ¿Cómo pago la reserva?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        La reserva deberá abonarse a través de Mercado Pago, pudiendo utilizar todas las tarjetas que ofrece dicha plataforma, ya sea de crédito o débito, o en efectivo desde una sucursal de RapiPago o Pago Fácil.
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>8- ¿Qué debo hacer una vez llegado/a al balneario?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Una vez llegado al balneario deberá mostrar el mail de confirmación, como comprobante de la reserva, mostrarlo en administración o al personal que se encuentre, y podrá ingresar a su espacio de sombra.
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>9- ¿Cómo cancelo una reserva?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Para cancelar su reserva deberá comunicarse con el balneario destino.
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>10- ¿Cómo me devuelven el importe de mi reserva cancelada?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Una vez comunicado con el balneario le devolverán el importe a través de la plataforma de Mercado Pago.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        BALNEARIOS
      </Typography>
      <br />
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>11- No encuentro el balneario que quiero.</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Si no encontraste el balneario deseado, es porque aún no se ha adherido a nuestro servicio.<br />
        Podés dejarnos tus comentarios al respecto. Nuestro objetivo es contar con la mayor cantidad posible de balnearios presentes en la costa Argentina.
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>12- ¿Cómo me contacto con un balneario?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Ingresando su nombre en el buscador, podrás ver su contacto.<br />
        Además, una vez realizada la reserva, podrás ver todos los datos del mismo.
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>13- ¿Cómo califico a los balnearios?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Si reservaste en un balneario y querés calificarlo, ingresá con tu cuenta para darle una puntuación. También podés dejar tus comentarios (estos quedan sujetos de aprobación por nuestras políticas y condiciones de uso).
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>14- ¿Cómo funciona el seguro de lluvia?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        El seguro te cubre los días en los cuales no se puede o quiere acceder al balneario por malas condiciones climáticas. Para esto, el balneario debe admitir dicho seguro.
        Consiste en recuperar el día perdido en una fecha posterior, deberá contactarse con el balneario para consultar la disponibilidad con la que cuenta.
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>15- ¿Puedo llevar a mi mascota?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Dependiendo de si el balneario buscado lo permite, estará en la web, dentro de las características del mismo.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        CONTACTO DE ALAMAR
      </Typography>
      <br />
      <br />
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        <b>16- ¿Cómo me contacto con Alamar?</b>
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        En el botón de Contacto podrás comentarnos acerca de tu inquietud vía mail.
      </Typography>
      <br />
    </div>
  )
}
export default Faqs