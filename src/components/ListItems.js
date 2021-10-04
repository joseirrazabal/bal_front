import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import dayjs from 'dayjs'

import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Badge from '@material-ui/core/Badge'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import SimpleImage from './SimpleImage'
import LogoAlamar from '../assets/alamar-logo-2.svg'

import IconPlaya from '../assets/icon-playa2.svg'
import Accepted from '../assets/accepted.svg'
import Conversation from '../assets/conversation.svg'
import Notification from '../assets/notification.svg'

import Term from '../containers/TyC/Term'
import Faqs from '../containers/Faqs/Faqs'

const useStyles = makeStyles(theme => ({
  profileImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  item: {
    color: 'white',
    backgroundColor: theme.palette.secondary.light,
    fontSize: '18px',
  },
}))

const ListItems = ({ user, notifications, setContentModal = () => {}, onClickItem = () => {} }) => {
  const classes = useStyles()

  const dia = dayjs().format('YYYY-MM-DD')

  return (
    <List disablePadding>
      {user && (
        <ListItem
          className={classes.item}
          divider
          button
          component={NavLink}
          to={`/profile`}
          activeClassName='Mui-selected'
          onClick={onClickItem}
          style={{
            height: 100,
          }}
        >
          <ListItemIcon>
            <Avatar className={classes.profileImage} alt={get(user, 'name')} src={get(user, 'image')} />
          </ListItemIcon>
          <ListItemText primary='Bienvenido' secondary={get(user, 'name')} />
        </ListItem>
      )}

      {user && (
        <ListItem
          className={classes.item}
          divider
          button
          component={NavLink}
          to={`/logout`}
          activeClassName='Mui-selected'
          onClick={onClickItem}
        >
          <ListItemIcon></ListItemIcon>
          <ListItemText primary='Cerrar sesion' />
        </ListItem>
      )}

      {!user && (
        <ListItem
          className={classes.item}
          divider
          button
          component={NavLink}
          to={`/login`}
          activeClassName='Mui-selected'
          onClick={onClickItem}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary='Entrar' />
        </ListItem>
      )}

      <ListItem
        className={classes.item}
        divider
        button
        component={NavLink}
        to={`/list/${dia}/${dia}`}
        activeClassName='Mui-selected'
        onClick={onClickItem}
      >
        <ListItemIcon>
          <SimpleImage alt='Alquilar Balneario Costa Atlantica' height={28} image={IconPlaya} />
        </ListItemIcon>
        <ListItemText primary='Balnearios' />
      </ListItem>

      {user && (
        <ListItem
          className={classes.item}
          divider
          button
          component={NavLink}
          to='/notifications'
          activeClassName='Mui-selected'
          onClick={onClickItem}
        >
          <ListItemIcon>
            <SimpleImage alt='Alquilar Balneario Costa Atlantica' height={28} image={Notification} />
          </ListItemIcon>
          {notifications ? (
            <Badge
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              color='primary'
              badgeContent={notifications}
            >
              <ListItemText primary='Notificaciones' />
            </Badge>
          ) : (
            <ListItemText primary='Notificaciones' />
          )}
        </ListItem>
      )}

      <ListItem
        className={classes.item}
        divider
        button
        onClick={() => {
          onClickItem()
          setContentModal(<Term />)
        }}
      >
        <ListItemIcon>
          <SimpleImage alt='Alquilar Balneario Costa Atlantica' height={28} image={Accepted} />
        </ListItemIcon>
        <ListItemText primary='Terminos y Condiciones' />
      </ListItem>

      <ListItem
        className={classes.item}
        divider
        button
        onClick={() => {
          onClickItem()
          setContentModal(<Faqs />)
        }}
      >
        <ListItemIcon>
          <SimpleImage alt='Alquilar Balneario Costa Atlantica' height={28} image={Conversation} />
        </ListItemIcon>
        <ListItemText primary='Preguntas Frecuentes' />
      </ListItem>
    </List>
  )
}

export default React.memo(ListItems)
