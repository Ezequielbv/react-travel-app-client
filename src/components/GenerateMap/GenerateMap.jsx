import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import './GenerateMap.css'

/*  Declare tokens and API URL  */
// const DB_LOCATION = 'http://localhost:5005/api';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;

function GenerateMap() {
  function initializeMap() {
    const mapboxMap = new mapboxgl.Map({
      container: "mapbox-all",
      style: "mapbox://styles/micaela-rosadio/clbjpb0wp006c14r3d53924fz",
      center: [13.4, 52.5],
      zoom: 4
    })
    /*  Get coordinates of all users  */
    axios.get(`${process.env.REACT_APP_API_URL}/api/user-coordinates`)
      .then(location => {
        location.data.coordinates.forEach((coordinate) => {
          const el = document.createElement('div');
          el.className = 'marker';
          console.log("coordinates display:", coordinate)
          new mapboxgl.Marker(el)
            .setLngLat(coordinate.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<h3>${coordinate.city}</h3>`)
            )
            .addTo(mapboxMap);
        })
      })
      .catch(err => console.log(err));
    mapboxMap.addControl(new mapboxgl.NavigationControl());
  }
  /*  Initialize map */
  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <div className="container">
      <div id="mapbox-all" />
    </div>
  )
}

export default GenerateMap;