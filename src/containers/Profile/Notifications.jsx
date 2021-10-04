import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation, useParams, Redirect, Link as RouterLink } from 'react-router-dom'
import { useLazyQuery, gql, useQuery, useMutation, useApolloClient } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import get from 'lodash/get'
import { useHistory } from 'react-router-dom'

import Loading from 'src/components/Loading'
import Typography from '../../components/Typography'
import SimpleImage from '../../components/SimpleImage'

import NotiImage from '../../assets/campana.svg'
import NotNotification from '../../assets/icon-notifications-off.svg'

import NOTIFICACION_LIST from 'src/gql/notificacion/list'
import NOTIFICACION_CHANGE_VISTO from 'src/gql/notificacion/changeVisto'

const useStyles = makeStyles(theme => ({
  contentFull: {
    width: '100%',
    maxWidth: 800,
    margin: 'auto',
    padding: '85px 10px 10px 10px',
    boxSizing: 'border-box',
    minHeight: '100vh',
    background: '#f2f2f2',
  },
  contentProfile: {
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    boxSizing: 'border-box',
    borderRadius: 6,
    marginBottom: 15,
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    /* '&:hover': {
      'box-shadow': '0 3px 6px 0 rgba(0,0,0,.1)',
    }, */
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  form: {
    width: '100%',
  },
  listItemText: {
    textAlign: 'center',
    color: theme.palette.secondary.main,
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    marginRight: 10,
  },
  contentNoti: {
    background: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    boxSizing: 'border-box',
    borderRadius: 6,
    marginBottom: 15,
    cursor: 'pointer',
    'box-shadow': '0 1px 1px 0 rgba(0,0,0,.1)',

    '&:hover': {
      'box-shadow': '0 3px 9px 0 rgba(0,0,0,.1)',
    },

    '&.new': {
      border: '2px solid #55C443',
    },

    '&.old': {
      background: '#fcfcfc',
      opacity: 0.5,

      /* '& img': {
        opacity: 0.2,
      }, */
    },

    '& .image': {
      //width: 100,,
      paddingRight: 40,
    },
  },
}))

const Notifications = () => {
  const classes = useStyles()
  const history = useHistory()

  const [list, setList] = useState([])

  const { data: dataList, loading: loading } = useQuery(NOTIFICACION_LIST, {
    ssr: false,
    fetchPolicy: 'network-only',
  })

  // const [addTodo] = useMutation(ADD_TODO, {
  const [changeVisto, { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }] =
    useMutation(NOTIFICACION_CHANGE_VISTO)

  useEffect(() => {
    if (get(dataList, 'notificacionList')) {
      setList(get(dataList, 'notificacionList'))
    }
  }, [dataList])

  const onHandleVisto = (id, visto) => {
    changeVisto({
      variables: { id, visto },
      update: (store, { data }) => {
        const list = store.readQuery({ query: NOTIFICACION_LIST })
        store.writeQuery({
          query: NOTIFICACION_LIST,
          data: {
            notificacionList: [
              ...get(list, 'notificacionList', []),
              get(data, 'notificacionChangeVisto'),
            ],
          },
        })
      },
    })
  }
  
  if (loading) {
    return <Loading />
  }

  return (
    <div className={classes.contentFull}>
      <div className={classes.contentProfile}>
        <Typography>Notificaciones</Typography>
      </div>
      {/* <SimpleImage height={200} image={NotNotification} /> */}
      {list.map(item => {
        return (
          <div
            key={item.id}
            className={`${classes.contentNoti} ${item.visto ? 'old' : 'new'}`}
            onClick={() => {
              if (get(item, 'data.calificacion')) {
                history.push(`/calificacion/${get(item, 'data.token')}`)
              }
              // if (!item.visto) {
                onHandleVisto(item.id, !item.visto)
              // }
            }}
          >
            <div className='image'>
              <SimpleImage height={60} image={NotiImage} />
            </div>
            <div className='content'>{item.descripcion}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Notifications
