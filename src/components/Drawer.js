import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
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
}));

export default function SwipeableTemporaryDrawer({children}) {

  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <Badge color="primary" badgeContent={10}>
              <MenuIcon />
            </Badge>
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className={classes.root}>
            {children}
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}