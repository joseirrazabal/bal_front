import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useLazyQuery, gql, useQuery, useApolloClient } from '@apollo/client'
import get from 'lodash/get'
import clsx from 'clsx'

import CssBaseline from '@material-ui/core/CssBaseline'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ListItems from '../../components/ListItems'
import Logo from '../../assets/alamar-logo-2.svg'
import FullScreenDialog from '../../components/Dialog'
import Term from '../../containers/TyC/Term'

import CURRENT_USER from 'core/gql/user/currentUser'
import NOTIFICACION_LIST from 'src/gql/notificacion/list'
import { getToken } from 'kit/login/utils'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
  },
  content: {
    flexGrow: 1,
    paddingBottom: '187px',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '187px',
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  const apolloClient = useApolloClient()

  const [open, setOpen] = useState(false)
  const [contentModal, setContentModal] = useState(false)

  const [user, setUser] = useState(null)
  const [list, setList] = useState([])

  const { data: dataList, loading: loading } = useQuery(NOTIFICACION_LIST, {
    ssr: false,
    fetchPolicy: 'network-only',
  })

  const [getUser, { data: dataUser, loading: loadingUser }] = useLazyQuery(CURRENT_USER, {
    ssr: false,
    fetchPolicy: 'cache',
  })

  useEffect(() => {
    const querySubscription = apolloClient
      .watchQuery({
        query: CURRENT_USER,
        fetchPolicy: 'cache-only',
      })
      .subscribe({
        next: ({ data }) => {
          console.log('jose 01')
          setUser(get(data, 'currentUser', null) || null)
        },
        error: e => {
          console.error('jose error subscribe', e)
        },
      })

    return () => {
      querySubscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (dataUser) {
      setUser(get(dataUser, 'currentUser'))
    }
    if (getToken()) {
      getUser()
    }
  }, [dataUser])

  useEffect(() => {
    if (get(dataList, 'notificacionList')) {
      console.log(get(dataList, 'notificacionList'))
      setList(get(dataList, 'notificacionList', []).filter(item => item.visto === false))
    }
  }, [dataList])

  const toggleDrawer = event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setOpen(prevState => !prevState)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header
        alt={'Alamar - Balnearios Costa Atlantica'}
        logo={Logo}
        user={user}
        notifications={list.length}
        open={open}
        toggleDrawer={toggleDrawer}
        // anchorPosition='left'
      >
        <ListItems
          user={user}
          notifications={list.length}
          onClickItem={toggleDrawer}
          setContentModal={setContentModal}
        />
      </Header>

      {/* padding para backoffice ? */}
      {/* <div className={classes.drawerHeader} /> */}

      <main className={clsx(classes.content)}>{children}</main>

      <footer className={classes.footer}>
        <Footer setContentModal={setContentModal} />
      </footer>

      <FullScreenDialog
        title='Terminos y condiciones'
        open={contentModal}
        handleClose={() => setContentModal(false)}
      >
        {contentModal}
      </FullScreenDialog>
    </div>
  )
}

export default Layout
