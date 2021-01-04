import React from 'react'
import get from 'lodash/get'
import { Helmet } from 'react-helmet-async'

import theme from './theme'
import Route from './routes'

// import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import 'styles.css'
import 'styles.scss'

const App = () => {
  return [
    <Helmet key={1} encodeSpecialCharacters titleTemplate='%s'>
      <title>Alamar</title>
      <meta name='description' content='Alamar - Sitio Web' />
      <html lang='es' />
      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge,chrome=1' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <meta name='theme-color' content={get(theme, 'palette.primary.main', 'transparent')} />
      <link rel='manifest' href='/manifest.json' />
    </Helmet>,
    <Route key={2} />,
  ]
}

export default App
