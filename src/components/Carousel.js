import React from "react"
// Modules
import Slider from "react-slick";
// Material
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  carousel: {
    position: 'relative'
  },
  'slick-prev': {
    left: 10,
    top: 230,
    zIndex: 2
}
});

const settings = {
  dots: true,
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
