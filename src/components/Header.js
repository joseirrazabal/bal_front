import React from "react";
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"

// import SimpleImage from "./SimpleImage"
// import logoCircularCopoApps from "../assets/logo_copoApps.svg"

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    height: 60,
    top: 0,
    left: 0,
    background: theme.palette.primary.main,
    position: "absolute",
    zIndex: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    "-webkit-box-shadow": "0px 0px 9px 0px rgba(0,0,0,0.75)",
    "-moz-box-shadow": "0px 0px 9px 0px rgba(0,0,0,0.75)",
    "box-shadow": "0px 0px 9px 0px rgba(0,0,0,0.75)",

    "@media (max-width: 1024px)": {
      justifyContent: "center",
      position: 'relative',
      padding: '0 10px'
    },
  },
  contentLogo: {
    cursor: 'pointer',

    "@media (max-width: 1024px)": {
      /* display: "flex",
      justifyContent: "center", */
    },
  },
}));

const Header = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div
        style={{ 
          padding: 0, 
          width: "100%", 
          maxWidth: 1200, 
          margin: "0 auto" 
        }}
      >
        <div className={classes.contentLogo}>
          {/* <SimpleImage
            height={47}
            alt="Presupuesta tu aplicación"
            image={logoCircularCopoApps}
            onClick={() => history.push("/")}
          /> */}
        </div>
      </div>
    </div>
  );
};
export default Header;
