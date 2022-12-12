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
    const [weatherLat, setWeatherLat]     = useState("");
    const [weatherLong, setWeatherLong]   = useState("");
    const [data, setData]                 = useState(undefined);
    
    useEffect(() => {
      const weatherApiCall = () => {
          axios
          .get(`${weatherURL}/weather/?lat=${weatherLat}&lon=${weatherLong}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
          .then((response) => {
              console.log('response is: ', response) 
              setData(response.data)
          })
          .catch((error) => console.log(error))
        }
      weatherApiCall()
      }, [weatherLat, weatherLong])
      
    /*  data && console.log(data); */
      return (
        <WeatherContext.Provider
          value={{
            weatherLat,
            setWeatherLat,
            weatherLong,
            setWeatherLong,
            data
          }}
        >
          {props.children}
        </WeatherContext.Provider>
      )
} 

export { WeatherProviderWrapper, WeatherContext };
