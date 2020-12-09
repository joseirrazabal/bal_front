import React, { useState, useEffect } from 'react'
import { useApolloClient, gql } from '@apollo/client'
import { useHistory, useLocation } from 'react-router-dom'

const AUTH_TOKEN = 'AUTH_TOKEN'
const REFRESH_TOKEN = 'REFRESH_TOKEN'

const LOGOUT_MUTATION = gql`
  mutation logout($refreshToken: String!) {
    logout(refreshToken: $refreshToken)
  }
`

let token
let refreshToken

export const getRefreshToken = () => {
  if (refreshToken) {
    return refreshToken
  }

  if (process.browser) {
    refreshToken = localStorage.getItem(REFRESH_TOKEN)
  }

  return refreshToken
}

export const getToken = () => {
  if (token) {
    return token
  }

  if (process.browser) {
    token = localStorage.getItem(AUTH_TOKEN)
  }

  return token
}

export const signIn = (newToken, refreshToken = null) => {
  token = newToken

  localStorage.setItem(AUTH_TOKEN, newToken)

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
  }

  return true
}

export const useLogout = () => {
  const apolloClient = useApolloClient()
  const history = useHistory()
  const location = useLocation()

  const [useFrom, setUseFrom] = useState(true)
  const [logout, setLogout] = useState(false)

  useEffect(() => {
    if (logout) {
      apolloClient.mutate({ mutation: LOGOUT_MUTATION, variables: { refreshToken: getRefreshToken() } })

      localStorage.clear()
      apolloClient.resetStore()

      const urlLocation = {
        pathname: '/login',
        state: { from: useFrom ? location : '/' },
      }

      history.push(urlLocation)
    }
  }, [logout])

  return [setUseFrom, setLogout]
}
