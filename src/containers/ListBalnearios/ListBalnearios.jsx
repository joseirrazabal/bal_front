import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import NoSsr from '@material-ui/core/NoSsr'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import CardLab from '../../components/CardBal'
import Search from '../../components/Search'
import Typography from '../../components/Typography'
import Loading from '../../components/Loading'

import BALNEARIO_LIST_SEARCH from 'gql/balneario/listSearch'
import CIUDAD_LIST from 'gql/ciudad/list'

const imageOnline =
  'https://ss-static-01.esmsv.com/id/87403/galeriaimagenes/obtenerimagen/?id=213&tipoEscala=stretch&width=2048&height=978'

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100vw',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 960px)': {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },
  container: {
    margin: '0 auto',
    zIndex: 2,
    width: '100%',
    maxWidth: 1280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSearch: {
    width: '100vw',
    height: 300,
    background: 'red',
    backgroundImage: 'url(' + imageOnline + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',

    '@media (max-width: 960px)': {
      height: 80,
      background: 'gray',
      padding: '0 10px',
    },
  },
  contentBanners: {
    width: '100vw',
    height: 'auto',
    background: '#f2f2f2',
    position: 'relative',

    '@media (max-width: 960px)': {
      height: 'auto',
    },
  },
  shadow: {
    background: 'rgba(0,0,0,.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  ul: {
    listStyle: 'none',
    minHeight: 500,
    padding: 0,
    width: '100%',
    float: 'left',

    '& li': {
      margin: 5,
      width: '100%',
    },
  },
  contentList: {
    width: '100%',
    maxWidth: 1280,
    height: 'auto',
    marginTop: -50,
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    padding: 15,
    boxSizing: 'border-box',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    '@media (max-width: 960px)': {
      marginTop: 0,
      background: '#f2f2f2',
    },
  },
  title: {
    color: theme.palette.secondary,
    margin: '5px 0',
  },
  gridFull: {
    width: '100%',
    padding: '5px 0',
  },
}))

const ListBalnearios = () => {
  const classes = useStyles()
  const history = useHistory()
  const { ciudad, desde, hasta } = useParams()

  const { data: ciudades, loading: loadingCiudad } = useQuery(CIUDAD_LIST)
  const { data, loading } = useQuery(BALNEARIO_LIST_SEARCH, {
    variables: {
      ciudad,
    },
  })

  if (loading || loadingCiudad) {
    return (
      <NoSsr>
        <Loading />
      </NoSsr>
    )
  }

  return (
    <div className={classes.contentFull}>
      <Header />
      <div className={classes.contentSearch}>
        <div className={classes.shadow} />
        <div className={classes.container}>
          <Search ciudades={ciudades} ciudad={ciudad} desde={desde} hasta={hasta} />
        </div>
      </div>
      <div className={classes.contentBanners}>
        <div className={classes.container}>
          <div className={classes.contentList}>
            <div className={classes.gridFull}>
              <Typography
                fontWeight={700}
                fontSize={25}
                textAlign='center'
                className={classes.title}
                varian='h2'
              >
                Balnearios en
              </Typography>
            </div>
            <ul className={`${classes.ul} ${classes.gridFull}`}>
              {get(data, 'balnearioListSearch', []).map((item, i) => {
                return (
                  <li>
                    <CardLab
                      modular
                      key={i}
                      item={item}
                      onClick={() => {
                        history.push(`/detalle/${get(item, '_id')}/${ciudad}/${desde}/${hasta}`)
                      }}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default ListBalnearios
