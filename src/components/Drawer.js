import React, { useState } from 'react'
import { useHistory, Link, NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import get from 'lodash/get'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import Badge from '@material-ui/core/Badge'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.dark,
    height: '100vh',
    width: 300,
  },
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
}))

const SwipeableTemporaryDrawer = ({ children, notifications = 0 }) => {
  const classes = useStyles()
  const dia = dayjs().format('YYYY-MM-DD')

  const [state, setState] = useState({
    right: false,
  })

  const toggleDrawer =
    (open, anchor = 'right') =>
    event => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer(true)}>
        {notifications ? (
          <Badge color='primary' badgeContent={notifications}>
            <MenuIcon />
          </Badge>
        ) : (
          <MenuIcon />
        )}
      </Button>
      <SwipeableDrawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={classes.root}>{children}</div>
      </SwipeableDrawer>
    </React.Fragment>
  )
}

export default SwipeableTemporaryDrawer
