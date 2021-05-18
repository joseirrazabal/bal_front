import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from 'src/containers/Home/Home'
import Profile from 'src/containers/Profile/Profile'
import Login from 'src/containers/Login/Login'
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
    path: '/detalle/:slug/:desde?/:hasta?/:ciudad?',
    Component: DetalleBalneario,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    path: '/checkout/:slug/:desde/:hasta',
    Component: CheckoutBalnearios,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    path: '/profile',
    Component: Profile,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    path: '/login',
    Component: Login,
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
          <Component />
        </Route>
      )
    })}
  </Switch>
)

export default MainRoutes
