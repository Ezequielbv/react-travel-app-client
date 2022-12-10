import React, { useState, useEffect } from "react";
import axios                          from "axios";  

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
const ForecastContext = React.createContext();

function ForecastProviderWrapper(props) {
    const [lat, setLat]             = useState("");
    const [long, setLong]           = useState("");
    const [forecast, setForecast]   = useState(undefined);

    useEffect(() => {
        navigator
        .geolocation
        .getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
    }, []);

    useEffect(() => {
        const forecastApiCall = () => {
            axios
            .get(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => {
                console.log('forecast is: ', response)
                setForecast(response.data)
            })
            .catch((error) => console.log(error))
          }
        forecastApiCall()
    }, [lat, long])
    forecast && console.log(forecast)
    
    return (
      <ForecastContext.Provider
        value={{
          lat,
          long,
          forecast
        }}
      >
        {props.children}
      </ForecastContext.Provider>
    )
}

export { ForecastProviderWrapper, ForecastContext };
