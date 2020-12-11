import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  simpleImage: () => ({}),
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
    <img
      className={`${className}`}
      src={image}
      alt={alt}
      title={title}
      onClick={onClick}
      style={{
        height: height || 'auto',
        width: width || 'auto',
        borderRadius: circular && '50%',
      }}
    />
  )
}

export default React.memo(SimpleImage)
