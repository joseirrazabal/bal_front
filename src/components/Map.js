import React, { useState, useEffect, useRef } from 'react'
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import get from 'lodash/get'

// import mapStyles from './mapStyles'

const key = 'AIzaSyDqmMaF9eTJtA2x-a_xYSK2sF5giJTlkCo'

const Map = ({ center: centerProps, marks: marksProps = [] }) => {
  const [zoom, setZoom] = useState(15)
  const [center, setCenter] = useState(centerProps || { lat: -38.0, lng: -57.54 })
  const [marks, setMarks] = useState(marksProps)
  // const [selectedPark, setSelectedPark] = useState(null)

  return (
    <GoogleMap
      defaultZoom={zoom}
      center={center}
      //defaultOptions={{ styles: mapStyles }}
    >
      {marks.map((mark, index) => {
        return <Marker key={index} name='Balneario' position={mark.position} />
      })}

      {/* {selectedPark && ( */}
      {/*   <InfoWindow */}
      {/*     onCloseClick={() => { */}
      {/*       setSelectedPark(null) */}
      {/*     }} */}
      {/*     position={{ */}
      {/*       lat: selectedPark.geometry.coordinates[1], */}
      {/*       lng: selectedPark.geometry.coordinates[0], */}
      {/*     }} */}
      {/*   > */}
      {/*     <div> */}
      {/*       <h2>{selectedPark.properties.NAME}</h2> */}
      {/*       <p>{selectedPark.properties.DESCRIPTIO}</p> */}
      {/*     </div> */}
      {/*   </InfoWindow> */}
      {/* )} */}
    </GoogleMap>
  )
}

const MapWrapped = withScriptjs(withGoogleMap(Map))

const ContainerMap = ({ onDragMarker, center, marks = [] }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${key}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        marks={marks}
        center={center}
      />
    </div>
  )
}

export default ContainerMap
