import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import get from 'lodash/get'

import Typography from '../../components/Typography'
import Search from '../../components/Search'
import CardBal from '../../components/CardBal'

import imageBackground from '../../assets/fondo.jpg'

import BALNEARIO_LIST from 'gql/balneario/list'

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100%',
    height: '100vh',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    margin: '0 auto',
    width: '100%',
    // maxWidth: 1280,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: 10,
  },
  containerMobile: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1280,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  contentSearch: {
    width: '100%',
    height: '35vh',
    background: 'red',
    backgroundImage: 'url(' + imageBackground + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    '@media (max-width: 960px)': {
      height: '30vh',
    },
  },
  contentBanners: {
    width: '100%',
    height: '65vh',
    background: '#f2f2f2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (max-width: 960px)': {
      height: '70vh',
    },
  },
  contentSlider: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'strech',
    boxSizing: 'border-box',

    '& ul': {
      listStyle: 'none',
      display: 'inline-flex',
      width: '100%',
      padding: 0,

      '& li': {
        width: '100%',
        margin: 5,

        '@media (max-width: 600px)': {
          width: '325px',
        },
      },
    },

    '@media (max-width: 600px)': {
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
      display: 'box',
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
  subTitle: {
    color: theme.palette.secondary,
    margin: '0px 0',
  },
  title: {
    position: 'absolute',
    fontSize: '50px!important',
    width: '100%',
    lineHeight: '55px',
    maxWidth: 540,
    top: -160,
    left: 160,
    color: 'white!important',

    '@media (max-width: 960px)': {
      display: 'none',
    },
  },
  banner: {
    background: 'silver',
    marginTop: 25,
    width: '100%',
    height: 180,
    borderRadios: 6,
    overflow: 'hidden',
    margin: 10,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '@media (max-width: 680px)': {
      height: 140,
    },
  },
}))

const Home = () => {
  const classes = useStyles()
  const history = useHistory()

  const { data, loading } = useQuery(BALNEARIO_LIST)

  return (
    <div className={classes.contentFull}>
      <div className={classes.contentSearch}>
        <div className={classes.shadow} />
        <div className={classes.container}>
          <Typography className={classes.title} varian='h1'>
            ALQUILER DE CARPAS Y SOMBRILLAS
          </Typography>
          <Search
            styles={{
              position: 'absolute',
            }}
          />
        </div>
      </div>

      <div className={classes.contentBanners}>
        <div className={classes.containerMobile}>
          <div className={classes.banner}>
            <p>PUBLICIDAD</p>
          </div>
          <div>
            <Typography
              fontWeight={700}
              fontSize={20}
              textAlign='center'
              className={classes.subTitle}
              varian='h2'
            >
              Mejores Balnearios
            </Typography>
          </div>
          <div className={classes.contentSlider}>
            <ul>
              {get(data, 'balnearioListFront', [])
                .slice(0, 3)
                .map((item, i) => {
                  return (
                    <li key={i}>
                      <CardBal
                        moludar
                        item={item}
                        onClick={() => {
                          history.push(`/detalle/${get(item, '_id')}`)
                        }}
                      />
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
