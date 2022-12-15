import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Dimmer, Loader } from 'semantic-ui-react';
import axios from "axios";

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'

function WeatherInfo({ coordinates }) {
    const { user } = useContext(AuthContext);
    const [weatherData, setWeatherData] = useState();
    
    useEffect(() => {
        axios.get(`${WEATHER_API_URL}/weather/?lat=${coordinates[1]}&lon=${coordinates[0]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    return weatherData ? (<>
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{weatherData.name}</p>
                    <p className="weather-description">{weatherData.weather[0].description}</p>
                </div>
                <img
                    alt="weather"
                    className="weather-icon"
                    src={`icons/${weatherData.weather[0].icon}.png`}
                />
            </div>
            <div className="bottom">
                <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-value">
                            {Math.round(weatherData.main.feels_like)}°C
                        </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{weatherData.wind.speed} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{weatherData.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">{weatherData.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
        </div>
    </>) :
        (<>
            <Dimmer active>
                <Loader>
                    Loading...
                </Loader>
            </Dimmer>
        </>)
}

export default WeatherInfo;

