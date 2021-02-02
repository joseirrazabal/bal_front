import React from 'react'
import get from 'lodash/get'
import { Helmet } from 'react-helmet-async'

import theme from './theme'
import Route from './routes'

import 'slick-carousel/slick/slick-theme.css'

import 'styles.css'
import 'styles.scss'

const App = () => {
  return [
    <Helmet key={1} encodeSpecialCharacters titleTemplate='%s'>
      <title>Alamar</title>
      <html lang='es' />
      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge,chrome=1' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <meta name='theme-color' content={get(theme, 'palette.primary.main', 'transparent')} />
      <meta name="description" content="Busca y encontra Balnearios en la Costa Atlantica" />
      <meta name="keywords" content="Buscar Balnearios, Balnearios en la costa atlantica, Alquiler de Balnearios" />
      <meta name="author" content="CopoApps - Desarrollo de Aplicaciones - www.copoapps.com.ar" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      <link rel='manifest' href='/manifest.json' />
    </Helmet>,
    <Route key={2} />,
  ]
}

export default App
