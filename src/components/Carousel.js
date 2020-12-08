import React from "react"
// Modules
import Slider from "react-slick";
// Material
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  carousel: {
    position: 'relative'
  }
});

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Carousel = ({children}) => {

  const classes = useStyles();

  return (
    <Slider {...settings} className={classes.carousel}>
      {children}
    </Slider>
  );
};
export default Carousel;
