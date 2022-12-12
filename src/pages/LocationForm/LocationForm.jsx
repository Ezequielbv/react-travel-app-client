import { useState, useContext } from "react";
import { useNavigate }          from "react-router-dom";
import { ForecastContext }      from "../../context/forecast.context";
import { WeatherContext }       from "../../context/weather.context";
import styled                   from "styled-components";
import useInput                 from "../../components/InputField/UseInput";
import axios                    from "axios";

const DB_LOCATION = 'http://localhost:5005'
// const DB_LOCATION = 'mongodb://localhost:27017'

function LocationForm(props) {
    const { setLat, setLong }               = useContext(ForecastContext);
    const { setWeatherLat, setWeatherLong } = useContext(WeatherContext); 
    const [city, setCity]                   = useState("");
    const [date, setDate]                   = useState("");
    const [coordinates, setCoordinates]     = useState([]);

    const handleCity  = (e) => setCity(e.target.value);
    const handleDate  = (e) => setDate(e.target.value);
    const handleClick = (suggestion) => {
        console.log("clicked city coordinates:", suggestion.center);
        address.setValue(suggestion.place_name);
        address.setSuggestions([]);
        setCity(suggestion.place_name);
        setCoordinates(suggestion.center);
    }

    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
  
        const newLocation = {
          city,
          date,
          coordinates
        }
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

    const address = useInput("");
    
    return (
        <form onSubmit={handleSubmit}>
            <label>City</label>
            <input
                value={city}
                onChange={handleCity}
                placeholder="Address"
                {...address}
                isTyping={address.value !== ""}
                className="geocoder"
            />
            {address.suggestions?.length > 0 && (
                <div>
                    {address.suggestions.map((suggestion, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    handleClick(suggestion);
                                }}
                            >
                                {suggestion.place_name}
                            </div>
                        );
                    })}
                </div>
            )}

            <input name="coordinates" value={coordinates} type="text" hidden/>

            <label>Date</label>
            <input value={date} type="date" onChange={handleDate} />

            <button type="submit">Create</button>
        </form>
    )
}

export default LocationForm;