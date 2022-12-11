/* import React        from 'react';
import ReactDOM     from 'react-dom';
import mapboxgl     from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from "react";

import 'mapbox-gl/dist/mapbox-gl.css';
const MapContext       = React.createContext();
mapboxgl.accessToken   = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN; // your mapbox api  

function MapProviderWrapper(props) {
  const map             = useRef(null);
  const mapContainer    = useRef(null);
  const [long, setLong] = useState(-70.9);
  const [lat, setLat]   = useState(42.35);
  const [zoom, setZoom] = useState(9);
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container:  mapContainer.current, //tells Mapbox GL JS to render the map inside a specific DOM 
      style:      'mapbox://styles/micaela-rosadio/clbjpb0wp006c14r3d53924fz',
      center:     [long, lat],
      zoom:       zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLong(map.current.getCenter().long.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  });
  console.log(lat)
        
  return (
    <MapContext.Provider
      value={{
        lat,
        long,
        zoom
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
}

export { MapProviderWrapper, MapContext };

 */