import { gql, useApolloClient, ApolloClient, fromPromise, ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloCache, InMemoryCache } from '@apollo/client/cache'
import fetch from 'isomorphic-fetch'
import get from 'lodash/get'

import { createUploadLink } from 'apollo-upload-client'
import { signIn, getToken, getRefreshToken } from 'kit/login/utils'

const GET_TOKEN_QUERY = gql`
  mutation refreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      jwt
    }
  }
`

const SET_AUTH = gql`
  query SetAuth {
    auth {
      isAuth
    }
  }
`

const getNewToken = () => {
  return client
    .mutate({ mutation: GET_TOKEN_QUERY, variables: { refreshToken: getRefreshToken() } })
    .then(response => {
      return get(response, 'data.refreshToken.jwt')
    })
}

const errorLink = onError(({ operation, graphQLErrors, networkError, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          return fromPromise(
            getNewToken().catch(error => {
              operation.getContext().cache.writeQuery({
                query: SET_AUTH,
                data: { auth: { isAuth: false, __typename: 'Auth' } },
              })
              return
            })
          )
            .filter(value => Boolean(value))
            .flatMap(accessToken => {
              signIn(accessToken) // guardar nuevo token

              const oldHeaders = operation.getContext().headers
              // modify the operation context with a new token
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              })

              // retry the request, returning the new observable
              return forward(operation)
            })
      }
    }

    graphQLErrors.map(({ message, location, path }) => {
      // if (process.env.NODE_ENV !== 'production') {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`)
      // }
    })
  }
  if (networkError) {
    // if (process.env.NODE_ENV !== 'production') {
    console.log(`[Network error]: ${networkError}`)
    // }
  }
})

const getFecth = async (uri, options) => {
  try {
    const result = await fetch(uri, {
      ...options,
      headers: {
        authorization: `Bearer ${getToken() || ''}`,
        ...options.headers,
      },
    })

    return result
  } catch (e) {
    console.log('jose error', e)
  }
}

const cache = () => {
  return new InMemoryCache()
}

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  connectToDevTools: process.env.NODE_ENV !== 'production' && process.browser,
  ssrMode: false,
  cache: cache().restore(process.browser ? window.__APOLLO_STATE__ : {}),
  link: ApolloLink.from([errorLink]).concat(
    createUploadLink({
      uri: '/graphql',
      headers: {
        // 'client-name': 'Space Explorer [web]',
      },
      fetch(uri, options) {
        return getFecth(uri, options)
      },
    })
  ),
})

const queryOrMutationLink = (config = {}) =>
  new HttpLink({
    ...config,
    credentials: 'same-origin',
  })

const linksServer = [
  errorLink,
  queryOrMutationLink({
    fetch,
    uri: `${process.env.APP_HOST}:${process.env.APP_PORT}/graphql`,
  }),
]

export { linksServer, cache, client }
