import Home from 'src/containers/Home/Home'
import Profile from 'src/containers/Profile/Profile'
import Login from 'src/containers/Login/Login'
import Logout from 'src/containers/Login/Logout'
import ListBalnearios from 'src/containers/ListBalnearios/ListBalnearios'
import DetalleBalneario from 'src/containers/DetalleBalneario/DetalleBalneario'
import CheckoutBalnearios from 'src/containers/CheckoutBalnearios/CheckoutBalnearios'

const routes = [
  {
    route: '/list/:ciudad/:desde/:hasta',
    component: ListBalnearios,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    route: '/detalle/:slug/:desde?/:hasta?/:ciudad?',
    component: DetalleBalneario,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    route: '/checkout/:balneario/:categoria/:desde/:hasta',
    component: CheckoutBalnearios,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    route: '/profile',
    component: Profile,
    Props: {},
    useLayout: false,
    isPrivate: true,
  },
  {
    route: '/login',
    component: Login,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    route: '/logout',
    component: Logout,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
  {
    route: '/home',
    component: Home,
    Props: {},
    useLayout: false,
    isPrivate: false,
  },
]

export default routes
