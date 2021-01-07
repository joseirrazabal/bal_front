const errorMP = code => {
  let msg = 'Error con los datos insertados'

  switch (code) {
    case '205':
      msg = 'Ingresa el número de tu tarjeta.'
      break
    case '208':
      msg = 'Elige un mes.'
      break
    case '209':
      msg = 'Elige un año.'
      break
    case '212':
      msg = 'Ingresa tu tipo de documento.'
      break
    case '213':
      msg = 'Ingresa tu documento.'
      break
    case '214':
      msg = 'Ingresa tu documento.'
      break
    case '220':
      msg = 'Ingresa tu banco.'
      break
    case '221':
      msg = 'Ingresa el nombre y apellido.'
      break
    case '224':
      msg = 'Ingresa el código de seguridad.'
      break
    case 'E301':
      msg = 'Ingresa un número de tarjeta válido.'
      break
    case 'E302':
      msg = 'Revisa el código de seguridad.'
      break
    case '316':
      msg = 'Ingresa un nombre válido.'
      break
    case '322':
      msg = 'El tipo de documento es inválido.'
      break
    case '323':
      msg = 'Revisa tu documento.'
      break
    case '324':
      msg = 'El documento es inválido.'
      break
    case '325':
      msg = 'El mes es inválido.'
      break
    case '326':
      msg = 'El año es inválido.'
      break
    default:
      msg = 'Revisa los datos.'
      break
  }

  return msg
}

export default errorMP
