const AUTH_TOKEN = 'AUTH_TOKEN'

let token

export const getToken = () => {
  if (token) {
    return token
  }

  if (process.browser) {
    token = localStorage.getItem(AUTH_TOKEN)
  }

  return token
}

export const signIn = newToken => {
  token = newToken
  localStorage.setItem(AUTH_TOKEN, newToken)
  return true
}

export const signOut = () => {
  token = undefined
  return localStorage.removeItem(AUTH_TOKEN) || null
}
