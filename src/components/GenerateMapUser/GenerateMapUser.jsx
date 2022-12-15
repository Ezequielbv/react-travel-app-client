import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../../context/auth.context";
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import './GenerateMapUser.css'

/*  Declare tokens and API URL  */
// const DB_LOCATION = 'http://localhost:5005/api';
let coordinatesArray = [];
let index = 0;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;


function GenerateMapUser() {
    const { user } = useContext(AuthContext);

    /*  Initialize map */
    useEffect(() => {
        if (!user) {
            return
        }
        function initializeMap() {
            const mapboxMap = new mapboxgl.Map({
                container: "mapbox-user",
                style: "mapbox://styles/micaela-rosadio/clbjpb0wp006c14r3d53924fz",
                center: [13.4, 52.5],
                zoom: 10
            })
            console.log(user._id)

            /*  Get coordinates of all a specific user  */
            axios.get(`${process.env.REACT_APP_API_URL}/api/user-coordinates/${user._id}`)
                .then(location => {
                    location.data.coordinates.forEach((coordinate) =>
                        //console.log(coordinate.coordinates)
                        coordinatesArray.push(coordinate.coordinates)
                    )
                })
                .catch(err => console.log(err));
            console.log("all coordinates:", coordinatesArray);
            mapboxMap.on('load', () => {
                for (let coordinate of coordinatesArray) {
                    index += 1;
                    setTimeout(() => {
                         mapboxMap.flyTo({ 
                             center: coordinate,
                             zoom: 15
                         });
                         }, 2000 * index);  
                }
            })
        }
        initializeMap();
    }, [user]);

    return (
        <div className="container">
            <div id="mapbox-user" />
        </div>
    )
}

export default GenerateMapUser;