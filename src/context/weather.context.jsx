import React, { useState, useEffect } from "react";
import axios                          from "axios";

const weatherURL     = 'https://api.openweathermap.org/data/2.5'
const WeatherContext = React.createContext();

/*******************************************************************
* We get our latitude and longitude using navigator.geolocation and 
* we use setLong and setLat to set our longitude and latitude states.
* We use these coordinates to fetch the weather of our current
* location
********************************************************************/

function WeatherProviderWrapper(props) {
    const [lat, setLat]     = useState("");
    const [long, setLong]   = useState("");
    const [data, setData]   = useState(undefined);

    useEffect(() => {
        navigator
        .geolocation
        .getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
      }, []);
    
    useEffect(() => {
      const weatherApiCall = () => {
          axios
          .get(`${weatherURL}/weather/?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
          .then((response) => {
              /* console.log('response is: ', response) */
              setData(response.data)
          })
          .catch((error) => console.log(error))
        }
      weatherApiCall()
      }, [lat, long])
      
    /*  data && console.log(data); */

      return (
        <WeatherContext.Provider
          value={{
            lat,
            long,
            data
          }}
        >
          {props.children}
        </WeatherContext.Provider>
      )
} 

export { WeatherProviderWrapper, WeatherContext };
