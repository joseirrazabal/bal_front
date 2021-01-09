import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '../../components/Typography'

const useStyles = makeStyles((theme) => ({
  contentTyC: {
    margin: 15,
  },
}));

const Term = () => {

  const classes = useStyles()
  
  return(
    <div className={classes.contentTyC}>
      <Typography variant="h3" fontWeight="700">
        Términos y condiciones Alamar.ar      
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
      Alamar.ar es una plataforma web desarrollada para brindarles a usuarios la posibilidad de reservar
      carpas y sombrillas de forma online en balnearios de la playa que se encuentren adheridos al servicio.
      Además podrán visualizar ofertas, promociones y otros beneficios que se ofrecen en éstos.<br />
      <br />
      Quién se registre a través de una cuenta de Facebook, Google o e-mail, será un usuario de Alamar.ar,
      aceptando recibir información y comunicaciones vinculadas al servicio y habilitado para realizar una
      reserva en el sitio.<br />
      <br />
      Alamar.ar no asume responsabilidad en el cumplimiento del servicio por parte de los balnearios, como
      tampoco asegura el nivel de satisfacción esperado por el cliente. Cualquier daño o perjuicio contra su
      persona no está ligado a Alamar.ar, teniendo en cuenta que el fin es conectar a las partes a través de una
      plataforma web.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Políticas de Privacidad      
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
      La información personal recolectada será utilizada para el envío de confirmaciones y comunicaciones vía
      e-mail, siendo éste el único propósito. Usted será el responsable de aceptar o no, recibir información
      periódicamente de Alamar.ar y/o de nuestros balnearios en el momento de efectuar su reserva, no
      configurando el concepto de “SPAM”. Si usted no quiere seguir recibiendo comunicaciones vía e-mail de
      ninguna de las partes, tendrá la posibilidad de desinscribirse directamente desde el correo donde recibió
      el newsletter. A pesar de ésto, seguirá recibiendo comunicaciones relacionadas con las confirmaciones de
      sus reservas, de donde no se puede desinscribir, siendo éste parte de nuestro servicio.
      <br />
      <br />
      <b>
      Por otro lado, aseguramos la confidencialidad de la información personal recolectada de nuestros
      usuarios a través de tecnologías líderes en seguridad y procesos que son regularmente revisados
      y actualizados.
      </b>
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Contacto
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
      El usuario podrá ejercitar los derechos de acceso, rectificación, oposición y cancelación de los datos
      personales recogidos por Alamar. Dichos derechos podrán ser ejercitados por el usuario, y en su caso
      quien lo represente, mediante solicitud escrita y firmada dirigida a …………conteniendo los siguientes
      datos:<br /><br />
      Nombre y Apellido del usuario- Domicilio a efectos de notificaciones- Fotocopia del DNI o Pasaporte-
      Petición en que se concreta la solicitud.<br /><br />
      En el caso de representación, deberá probarse la misma mediante documento fehaciente.
      En vigor a partir del 15 de Diciembre de 2020.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Reservas
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Sólo podrán hacerse reservas en los balnearios que estén adheridos a Alamar. Es condición estar
        registrado en el Portal, siendo este proceso gratuito. Luego de confirmar la reserva, recibirá un e-mail con
        la confirmación de la misma, en la que podrá ver detallados los Términos y Condiciones del servicio
        contratado. El balneario se reserva el derecho de cobrar anticipadamente su reserva, ya sea un importe
        parcial o total, como también cancelar su reserva si usted no efectuara el pago transcurridas 72hs de
        recibido el email de reclamo de pago de su reserva. Es de carácter obligatorio realizar una reserva a
        través de Alamar.ar para gozar de todos los beneficios que le ofrece el portal. También resulta necesario
        presentar el ticket de confirmación al momento de su llegada al balneario para validar su reserva.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Sistema de Pago
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        El pago podrá efectuarse a través de la plataforma Mercado Pago. Alamar.ar no le cobra ningún cargo por
        reserva ni intercede en el proceso de cobranza. Usted directamente le paga al balneario el/los servicio/s
        contratado/s, acorde a las formas de pago ofrecidas por éste. <br />
        Alamar.ar no asume responsabilidad alguna por dicha transacción, la cual debe entenderse como un acuerdo entre privados ajena a su
        responsabilidad. Le recordamos que no se imputa cargo alguno por la prestación de nuestro servicio, por
        lo tanto el balneario no podrá realizar ningún tipo de recargo al valor estipulado en su ticket de
        confirmación. Dicho importe es final, con todos los impuestos incluidos.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Modificaciones
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Una vez confirmada la reserva, el usuario no podrá gestionar modificaciones a través de la plataforma. De
        lo contrario, podrá cancelar y realizar una nueva reserva, siempre sujeto a la disponibilidad del balneario.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Cancelaciones
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Alamar.ar no resulta responsable de la cancelación de la reserva en forma unilateral por parte del
        balneario en un accionar contrario a las condiciones comerciales pactadas con el mismo.
        <br /><br />
        <b>Cancelaciones gestionadas unilateralmente por el balneario:</b><br />
        El balneario no podrá efectuar la cancelación sin notificación previa. Toda vez que el usuario reciba -
        mediante correo electrónico- un aviso de reclamo por falta de pago dispondrá de 72hs para regularizar la
        situación (plazo de gracia). Transcurrido ese plazo y de no haber cumplido con el pago de su reserva el
        Balneario tendrá la posibilidad de cancelar su reserva a través de la plataforma, siendo esta instancia
        irreversible en caso de ejecutarse.<br />
        <b>Cancelaciones gestionadas por el usuario:</b><br />
        El usuario no podrá cancelar su reserva por el sitio, para ello deberá comunicarse con el balneario y
        realizar la cancelacion, siendo ésta la única manera fehaciente de cancelar su reserva. 
        De todas formas, Alamar.ar no recomienda ni a los usuarios ni a los balnearios cancelar reservas
        confirmadas y desaconseja totalmente su uso, ya que de ser frecuente este accionar Alamar.ar puede dar
        de baja la cuenta del usuario y/o balneario sin previo aviso.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Devoluciones
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        En caso de haber abonado parcial o totalmente su reserva previa a su llegada y necesite
        indefectiblemente cancelar su reserva sugerimos ponerse en contacto con el balneario para coordinar, de
        corresponder, la devolución total o parcial del importe abonado. Las condiciones de pago son impuestas
        por cada balneario, exceptuándose Alamar.ar de cualquier responsabilidad emanada de dichas políticas.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Ausencias
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Si usted, sin notificación previa, no se presenta en el balneario antes de las 12 horas del día de inicio de
        la reserva, será identificado como una “ausencia” y el balneario podrá disponer de su reserva de la
        manera en que lo considere oportuno. Nos guardamos el derecho de restringirle o suspenderle el acceso
        a los servicios de Alamar.ar si usted ha sido identificado una o más veces como una “AUSENCIA”. Por
        favor tenga en cuenta que tenemos la posibilidad de rastrear su dirección de IP en el caso que
        sospechemos que no está cumpliendo estas Condiciones de Reserva. Alamar.ar se reserva el derecho de
        disponer la suspensión o restricción de cualquier usuario al servicio cuando así lo comprenda, en forma
        unilateral.<br /><br />
        Recomendamos realizar siempre todas las comunicaciones entre balnearios y veraneantes a través de su
        cuenta de Alamar.ar, así podremos actuar de mediadores en caso de cualquier eventualidad.<br /><br />
        Alamar.ar no se responsabiliza por el incumplimiento por parte del balneario o terceros en la elección y/o
        disponibilidad del espacio reservado previamente, ya que es responsabilidad exclusiva del balneario
        mantener las planillas de disponibilidad totalmente actualizadas al momento de publicar en la plataforma.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Seguro de Lluvia
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Si el balneario donde se realizó la reserva admite seguro de lluvia, el usuario podrá recuperar los días
        inaccesibles debido a cuestiones climáticas, siempre a disponibilidad de dicho balneario. El beneficio no
        podrá canjearse para fines de semanas o feriados, y la fecha deberá ser obligatoriamente seguida del
        último día reservado por el usuario. El usuario no podrá reclamar indemnización monetaria ni de otra
        índole por aceptar o no este beneficio.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Opiniones y comentarios
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Los Usuarios que hayan reservado a través de Alamar.ar podrán publicar sus opiniones y valoraciones en
        el Sitio Web. Para ello, Alamar.ar le enviará un email al Usuario cuando su estadía en el balneario haya
        finalizado, con el fin de que pueda valorar la experiencia y el servicio que se le ha prestado. <br /><br />
        Alamar.ar se reserva el derecho a revisar cada opinión y eliminar (o evitar su publicación) en caso de que
        el contenido de las mismas resulte ilícito, obsceno, abusivo, amenazante, difamatorio, invada la privacidad
        de terceros, o sea censurable de otro modo para terceros, y siempre que cuyo contenido incorpore
        anuncios o enlaces a otros sitios web y/o que la opinión no se corresponda con el servicio valorado. 
        En particular, Alamar.ar se reserva el derecho de no publicar aquellas opiniones cuyo contenido pueda
        incluir las siguientes expresiones: <br /><br />
        i. Expresiones discriminatorias: En ningún caso se permitirán expresiones que vayan en contra de un
        particular y que vulneren los principios del derecho al honor, a la intimidad personal y familiar, a la propia
        imagen y a la dignidad de la persona. Se prohíbe cualquier tipo de publicación discriminatoria ya sea por 
        motivos de raza, sexo, religión, opinión, nacionalidad, discapacidad o cualquier otra circunstancia
        personal o social.<br /><br />
        ii. Actividades ilegales: No está permitido que los contenidos promuevan actividades ilegales o que
        incorporen contenido obsceno o difamatorio.<br /><br />
        iii. Violencia: Está expresamente prohibido que las opiniones contengan insultos, expresiones que
        promuevan la violencia y/o que incluyan sin limitación alguna, la violencia sexual o la violencia contra
        animales y personas.<br /><br />
        iv. Contenido degradante: No están permitidas aquellas opiniones o comentarios que sean intimidantes,
        amenazantes degradantes o que de cualquier manera promuevan la violencia contra una persona o un
        colectivo determinado.
      </Typography>
      <br />
      <Typography variant="h3" fontWeight="700">
        Finalización del Servicio
      </Typography>
      <Typography fontSize={16} color='black' variant='p' lineHeight='25px'>
        Tenemos el derecho de restringirle o suspenderle el acceso a nuestros servicios si consideramos que
        está haciendo mal uso de los mismos o que no está cumpliendo con estas Condiciones de Reservas.
      </Typography>
    </div>
  )
}
export default Term