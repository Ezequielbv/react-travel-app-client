import React, { useState, useContext }   from "react";
import { useNavigate }                   from "react-router-dom";
import { WeatherContext }                from "./weather.context";
import { ForecastContext }               from "./forecast.context";
import { AuthContext }                   from "./auth.context";
import axios                             from "axios";
import useInput                          from "../components/InputField/UseInput";

const LocationFormContext = React.createContext();
// const DB_LOCATION         = 'http://localhost:5005';

function LocationFormProviderWrapper(props) {
    const { setLat, setLong }               = useContext(ForecastContext);
    const { setWeatherLat, setWeatherLong } = useContext(WeatherContext); 
    const [city, setCity]                   = useState("");
    const [country, setCountry]             = useState("");
    const [date, setDate]                   = useState("");
    const [coordinates, setCoordinates]     = useState([]);
    const address                           = useInput("");
    const [ latHomeMap, setLatHomeMap ] = useState(13.4)
    const [ longHomeMap, setLongHomeMap ] = useState(52.5)
    const { user } = useContext(AuthContext);
    const handleCity  = (e) => setCity(e.target.value);
    const handleDate  = (e) => setDate(e.target.value);
    const handleClick = (suggestion) => {
        console.log("clicked city coordinates:", suggestion.center);
        address.setValue(suggestion.place_name);
        address.setSuggestions([]);
        setCity(suggestion.place_name);
        setCountry(suggestion.place_name.split(', ')[suggestion.place_name.split(', ').length - 1])
        setCoordinates(suggestion.center);
        setLatHomeMap(suggestion.center[0]);
        setLongHomeMap(suggestion.center[1]);
    };
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        console.log("USER:", user);
        const requestBody = {
          userOwnerId: user._id,
          city,
          country,
          date,
          coordinates
        };
        console.log("info submitted", requestBody);

        axios.post(`${process.env.REACT_APP_API_URL}/api/form`, requestBody)
          .then((response) => {
              console.log("response from axios form: ", response);
              setLat(requestBody.coordinates[1]);
              setLong(requestBody.coordinates[0]);
              setWeatherLat(requestBody.coordinates[1]);
              setWeatherLong(requestBody.coordinates[0]);
              navigate("/profile");
          })
          .catch(err => console.log(err))
    }
    return (
        <LocationFormContext.Provider
          value={{
            latHomeMap,
            longHomeMap,
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