import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// Containers
import Home from 'src/containers/Home/Home'
import ListBalnearios from 'src/containers/ListBalnearios/ListBalnearios'
import DetalleBalneario from 'src/containers/DetalleBalneario/DetalleBalneario'
import CheckoutBalnearios from 'src/containers/CheckoutBalnearios/CheckoutBalnearios'
// Components
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

const routes = [
  {
    path: '/list',
    Component: ListBalnearios,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    path: '/detalle',
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
  }
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
    {/* <Redirect from='/' to='/home' /> */}
  </Switch>
)

export default MainRoutes
