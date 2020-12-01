import React, { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/client'
import { StaticRouter, BrowserRouter } from 'react-router-dom'
import { StylesProvider, createGenerateClassName, ThemeProvider } from '@material-ui/core/styles'
import { jss } from 'react-jss'

import theme from 'src/theme'
import App from 'src/'

const generateClassName = createGenerateClassName({
  productionPrefix: 'jl-',
})

const Shared = ({
  server = false,
  apolloClient,
  supportsHistory = false,
  context = {},
  helmetContext = {},
  url = '',
}) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#styleServer')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  const renderApp = ({ apolloClient }) => {
    return (
      <ApolloProvider client={apolloClient}>
        <StylesProvider
          jss={jss}
          // generateClassName={generateClassName}
        >
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    )
  }

  if (server) {
    return (
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url} context={context}>
          {renderApp({ apolloClient })}
        </StaticRouter>
      </HelmetProvider>
    )
  }

  return (
    <HelmetProvider>
      <BrowserRouter forceRefresh={!supportsHistory}>{renderApp({ apolloClient })}</BrowserRouter>
    </HelmetProvider>
  )
}

export default Shared
