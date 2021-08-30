import React from 'react'

const SimpleImage = ({
  image = 'https://netb.tmsimg.com/assets/s10021_lw_h3_ab.png',
  alt = 'Alamar - Balnearios Costa Atlantica',
  title = null,
  width,
  height,
  circular = null,
  className,
  onClick = () => {},
  style,
}) => {
  return (
    <img
      src={image}
      alt={alt}
      title={title}
      onClick={onClick}
      style={{
        ...style,
        height: height || 'auto',
        width: width || 'auto',
        borderRadius: circular && '50%',
      }}
    />
  )
}

export default React.memo(SimpleImage)
