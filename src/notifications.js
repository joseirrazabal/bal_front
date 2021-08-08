import React, { useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import get from 'lodash/get'

import Button from '@material-ui/core/Button'

import COUNTER_SUBSCRIPTION from 'gql/home/subs'

const Notifications = () => {
  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const {
    data: dataSubs,
    loading: loadingSubs,
    error: errorSubs,
  } = useSubscription(COUNTER_SUBSCRIPTION, {})

  // const onHandleVisto = (id, visto) => {
  //   changeVisto({
  //     variables: { id, visto },
  //     update: (store, { data }) => {
  //       const list = store.readQuery({ query: NOTIFICACION_LIST })
  //       store.writeQuery({
  //         query: NOTIFICACION_LIST,
  //         data: {
  //           notificacionList: [
  //             ...get(list, 'notificacionList', []),
  //             get(data, 'notificacionChangeVisto'),
  //           ],
  //         },
  //       })
  //     },
  //   })
  // }

  const action = key => {
    return (
      <div>
        <Button
          onClick={() => {
            closeSnackbar(key)
          }}
        >
          Dismiss
        </Button>
      </div>
    )
  }

  const handleClick = ({ text = '', variant = 'default' }) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(text, { variant, preventDuplicate: true, action })
  }

  useEffect(() => {
    if (get(dataSubs, 'getMessage')) {
      handleClick({ text: get(dataSubs, 'getMessage.texto'), variant: 'success' })
    }
  }, [dataSubs])

  return null
}

export default Notifications
