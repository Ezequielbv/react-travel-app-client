import React        from 'react';
import ReactDOM     from 'react-dom';
import mapboxgl     from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useContext }       from "react";
import { MapContext } from 'react-map-gl/dist/esm/components/map';

import './GenerateMap.css'


function GenerateMap() {
 const  { long, lat, zoom } = useContext(MapContext);
  const mapContainer    = useRef(null);
  return (
    <div>
        <div className="sidebar">
          Longitude: { long } | Latitude: { lat } | Zoom: { zoom }
        </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default GenerateMap;