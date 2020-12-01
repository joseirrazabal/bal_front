import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

// import SimpleImage from "./SimpleImage"

const useStyles = makeStyles({
  footer: {
    width: "100%",
    height: 60,
    background: "black",
    position: "relative",
    zIndex: 2,
    //marginTop: 15,

/*     "@media (max-width: 1024px)": {
      justifyContent: "center",
      position: 'relative',
      padding: '0 10px'
    }, */
  },
  contentLogo: {
    cursor: 'pointer',

    "@media (max-width: 1024px)": {
      /* display: "flex",
      justifyContent: "center", */
    },
  },
});

const Footer = () => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <div
        style={{ 
          padding: 0, 
          width: "100%", 
          maxWidth: 1200, 
          margin: "0 auto" 
        }}
      >
        <div className={classes.contentLogo}>
{/*           <SimpleImage
            height={35}
            alt="Presupuesta tu aplicación"
            image={logoCircularCopoApps}
            onClick={() => history.push("/")}
          /> */}
        </div>
      </div>
    </div>
  );
};
export default Footer;
