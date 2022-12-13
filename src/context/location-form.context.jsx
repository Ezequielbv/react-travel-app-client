import React, { useState, useContext }   from "react";
import { useNavigate }                   from "react-router-dom";
import { WeatherContext }                from "./weather.context";
import { ForecastContext }               from "./forecast.context";
import axios                             from "axios";
import useInput                          from "../components/InputField/UseInput";

const LocationFormContext = React.createContext();
const DB_LOCATION         = 'http://localhost:5005';

function LocationFormProviderWrapper(props) {
    const { setLat, setLong }               = useContext(ForecastContext);
    const { setWeatherLat, setWeatherLong } = useContext(WeatherContext); 
    const [city, setCity]                   = useState("");
    const [country, setCountry]             = useState("");
    const [date, setDate]                   = useState("");
    const [coordinates, setCoordinates]     = useState([]);
    const address                           = useInput("");
    const handleCity  = (e) => setCity(e.target.value);
    const handleDate  = (e) => setDate(e.target.value);
    const handleClick = (suggestion) => {
        console.log("clicked city coordinates:", suggestion.center);
        address.setValue(suggestion.place_name);
        address.setSuggestions([]);
        setCity(suggestion.place_name);
        setCountry(suggestion.place_name.split(', ')[suggestion.place_name.split(', ').length - 1])
        setCoordinates(suggestion.center);
    };
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        const newLocation = {
          city,
          country,
          date,
          coordinates
        };
        console.log("info submit.", newLocation);

        axios.post(`${DB_LOCATION}/api/form`, newLocation)
          .then((response) => {
              console.log("response from axios form: ", response);
              setLat(newLocation.coordinates[1]);
              setLong(newLocation.coordinates[0]);
              setWeatherLat(newLocation.coordinates[1]);
              setWeatherLong(newLocation.coordinates[0]);
              navigate("/test");
          })
          .catch(err => console.log(err))
    }
    return (
        <LocationFormContext.Provider
          value={{
            setLat,
            setLong,
            setWeatherLat,
            setWeatherLong,
            city,
            setCity,
            country,
            setCountry,
            date,
            setDate,
            coordinates,
            setCoordinates,
            address,
            handleClick,
            handleDate,
            handleCity,
            handleSubmit
          }}
        >
          { props.children }
        </LocationFormContext.Provider>
      )
}

export { LocationFormProviderWrapper, LocationFormContext };