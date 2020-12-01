import React from 'react'
import get from 'lodash/get'
import { Helmet } from 'react-helmet-async'

import theme from './theme'
import Route from './routes'

import 'styles'

const App = () => {
  return [
    <Helmet key={1} encodeSpecialCharacters titleTemplate='%s'>
      <title>Balnearios</title>
      <meta name='description' content='Juegos de escape' />
      <html lang='es' />
      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge,chrome=1' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <meta name='theme-color' content={get(theme, 'palette.primary.main', 'transparent')} />
      <link rel='manifest' href='/manifest.json' />
      <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    </Helmet>,
    <Route key={2} />,
  ]
}

export default App
