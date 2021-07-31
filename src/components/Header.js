import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'

import SimpleImage from './SimpleImage'

const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: ({ drawerWidth }) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: ({ drawerWidth }) => ({
    width: drawerWidth,
    flexShrink: 0,
  }),
  drawerPaper: ({ drawerWidth }) => ({
    backgroundColor: theme.palette.secondary.dark,
    width: drawerWidth,
  }),
}))

const PersistentDrawerRight = ({
  children,
  logo,
  alt,
  user,
  notifications,
  open = false,
  toggleDrawer = () => {},
  anchorPosition = 'right',
  drawerWidth = 300,
}) => {
  const classes = useStyles({ drawerWidth })

  return (
    <React.Fragment>
      <AppBar
        position='fixed'
        color='secondary'
        // className={clsx(classes.appBar, { [classes.appBarShift]: open})}
      >
        <Toolbar>
          <Typography variant='h6' noWrap className={classes.title}>
            <Link to='/home'>
              <SimpleImage alt={alt} height={30} image={logo} />
            </Link>
          </Typography>

          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={toggleDrawer}
            // className={clsx(open && classes.hide)}
          >
            {notifications ? (
              <Badge color='primary' badgeContent={notifications}>
                <MenuIcon />
              </Badge>
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={anchorPosition}
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {children}
      </SwipeableDrawer>
    </React.Fragment>
  )
}

export default PersistentDrawerRight
