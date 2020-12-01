// import 'isomorphic-unfetch'
import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { ApolloCache, InMemoryCache } from '@apollo/client/cache'
// import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
// import { withClientState } from 'apollo-link-state'

import { createUploadLink } from 'apollo-upload-client'
import { getToken } from 'kit/login/utils'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
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

const subscriptionLink = (config = {}) =>
  new WebSocketLink({
    uri: `ws://${process.env.GRAPHQL_HOST}:${process.env.GRAPHQL_PORT}/subscriptions`,
    options: { reconnect: false },
    ...config,
  })

const queryOrMutationLink = (config = {}) =>
  new HttpLink({
    ...config,
    credentials: 'same-origin',
  })

const cache = () => {
  // const localLink = { link: withClientState(), cache: new InMemoryCache() }
  const localLink = { cache: new InMemoryCache() }

  try {
    // const resolver = require('src/graph_cache')
    // localLink.cache = new InMemoryCache(resolver.getCache)
    // localLink.link = withClientState(resolver.links)
  } catch (e) {
    console.log('No se cargo graph cache')
  }

  return localLink
}

const linksClient = () => {
  const links = []

  if (process.browser) {
    // subcripciones
    // 	links.push(
    // 		requestLink({
    // 			queryOrMutationLink: queryOrMutationLink(),
    // 			subscriptionLink: subscriptionLink()
    // 		})
    // 	)
    links.push(errorLink)
    links.push(
      queryOrMutationLink({
        fetch,
        uri: `/graphql`,
      })
    )
  }
  return links
}

// saca el __typename cuando guardas
const middleWareLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
    // eslint-disable-next-line no-param-reassign
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename)
  }
  return forward(operation)
})

const logoutLink = onError(data => {
  console.log('jose', data)
  if (networkError.statusCode === 401) logout()
})

const getFecth = async (uri, options) => {
  try {
    const result = await fetch(uri, {
      ...options,
      headers: {
        ...options.headers,
        authorization: `Bearer ${getToken() || ''}`,
      },
    })
    return result
  } catch (e) {
    console.log('jose error', e)
  }
}

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  connectToDevTools: process.env.NODE_ENV !== 'production' && process.browser,
  ssrMode: false,
  cache: cache().cache.restore(process.browser ? window.__APOLLO_STATE__ : {}),
  // link: ApolloLink.from([middleWareLink, ...linksClient()]),
  link: createUploadLink({
    uri: process.env.MICRO,
    headers: {
      // 'client-name': 'Space Explorer [web]',
    },
    fetch(uri, options) {
      return getFecth(uri, options)
    },
  }),
})

const linksServer = [
  errorLink,
  queryOrMutationLink({
    fetch,
    uri: `${process.env.APP_HOST}:${process.env.APP_PORT}/graphql`,
  }),
]

// if (process.env.NODE_ENV === 'production') {
// linksServer.unshift(createPersistedQueryLink())
// }

export { linksServer, errorLink, subscriptionLink, queryOrMutationLink, cache, middleWareLink, client }
