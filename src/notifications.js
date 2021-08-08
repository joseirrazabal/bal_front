import React, { useState, useEffect } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import get from 'lodash/get'

import Button from '@material-ui/core/Button'

import COUNTER_SUBSCRIPTION from 'gql/home/subs'

const Notifications = () => {
  const history = useHistory()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const [prueba, setPrueba] = useState(false)
  const {
    data: dataSubs,
    loading: loadingSubs,
    error: errorSubs,
  } = useSubscription(COUNTER_SUBSCRIPTION, {
    // resubscribe si se le pasan variables y estas cambian
    shouldResubscribe: true,
  })

  const client = useApolloClient()

  const getAllFuncs = toCheck => {
    const props = []
    let obj = toCheck
    do {
      props.push(...Object.getOwnPropertyNames(obj))
    } while ((obj = Object.getPrototypeOf(obj)))

    return props.sort().map((e, i, arr) => {
      if (e != arr[i + 1] && typeof toCheck[e] == 'function') {
        return `${e}()`
      } else {
        return `${e}`
      }
    })
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('bien1', getAllFuncs(client))
  //     console.log('bien2', getAllFuncs(client.link))
  //     console.log('bien3', getAllFuncs(client.link.request()))
  //     console.log('bien9')
  //   }, 5000)
  // }, [])

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
