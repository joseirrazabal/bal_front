import React from "react"
// Modules
import Slider from "react-slick";
// Material
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  contentCarousel: {
    position: 'relative'
  },
  carousel: {
    position: 'relative',
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
    <div className={classes.contentCarousel}>
      <Slider {...settings} className={classes.carousel}>
        {children}
      </Slider>
    </div>
  );
};
export default Carousel;
