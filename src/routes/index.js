import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

import Home from 'src/containers/Home/Home'
import ListBalnearios from 'src/containers/ListBalnearios/ListBalnearios'
import DetalleBalneario from 'src/containers/DetalleBalneario/DetalleBalneario'
import CheckoutBalnearios from 'src/containers/CheckoutBalnearios/CheckoutBalnearios'

const routes = [
  {
    path: '/list/:ciudad/:desde/:hasta',
    Component: ListBalnearios,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    path: '/detalle/:id/:ciudad?/:desde?/:hasta?',
    Component: DetalleBalneario,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    path: '/checkout',
    Component: CheckoutBalnearios,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    path: '/',
    Component: Home,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
]

export const MainRoutes = () => (
  <Switch>
    {routes.map(({ path, useLayout, Component, isPrivate, Props }) => {
      return (
        <Route key={path} path={path}>
          <Header />
          <Component />
          <Footer />
        </Route>
      )
    })}
  </Switch>
)

export default MainRoutes
