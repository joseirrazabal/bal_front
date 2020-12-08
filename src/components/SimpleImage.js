import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { NoSsr } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  simpleImage: ({ height, width, circular }) => ({
    height: height || null,
    width: width || null,
    borderRadius: circular && '50%',
  }),
}))

const SimpleImage = ({
  image = 'https://netb.tmsimg.com/assets/s10021_lw_h3_ab.png',
  alt = 'Alamar',
  title = null,
  width,
  height,
  circular = null,
  className,
  onClick = () => {},
}) => {
  
  const classes = useStyles({ image, width, height, circular })

  return (
    <NoSsr>
      <img
        className={`${classes.simpleImage} ${className}`}
        src={image}
        alt={alt}
        title={title}
        onClick={onClick}
      />
    </NoSsr>
  )
}

export default React.memo(SimpleImage)
