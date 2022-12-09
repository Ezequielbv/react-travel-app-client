import React                from 'react';
import moment               from 'moment';
import styled               from 'styled-components';
import { useContext }       from "react";
import { Button, Card }     from 'semantic-ui-react'
import { ForecastContext }  from '../../context/forecast.context';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'; 
import { Dimmer, Loader }   from 'semantic-ui-react';
import { List }             from '@mui/material';
import {
        faCloud,
        faBolt,
        faCloudRain,
        faCloudShowersHeavy,
        faSnowflake,
        faSun,
        faSmog,
      }                   from '@fortawesome/free-solid-svg-icons';
import './Forecast.css';

function Forecast() {
    const  { forecast }   = useContext(ForecastContext);
    forecast && console.log("forecast weather: ", forecast.list);

    const WeatherIcon = styled.div`
        color: whitesmoke;
    `;

    const forecastResult = forecast && forecast.list.map((item, index) => {
        let weatherIcon = null;
        if (item.weather[0].description === 'Thunderstorm') {
        weatherIcon = <FontAwesomeIcon icon={faBolt} />;
        } else if (item.weather[0].description === 'Drizzle') {
            weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
        } else if (item.weather[0].description === 'Rain') {
            weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
        } else if (item.weather[0].description === 'Snow') {
            weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
        } else if (item.weather[0].description === 'Clear') {
            weatherIcon = <FontAwesomeIcon icon={faSun} />;
        } else if (item.weather[0].description === 'Clouds') {
            weatherIcon = <FontAwesomeIcon icon={faCloud} />;
        } else {
            weatherIcon = <FontAwesomeIcon icon={faSmog} />;
        } 

        return forecast ?
        (<>
            <div key={ index } className="forecast">
              <div className="flex-forecast">
                <p>{ moment(item.dt_txt).format("dddd") }</p>
                <WeatherIcon style={{fontSize:25,marginTop:4}}>{ weatherIcon }</WeatherIcon>
                <p>{ item.main.temp } &deg;C</p>
              </div>
            </div>
        </>):   
        <>
            Loading ...
        </>
    })
   
   return(
        <div>
          <List aria-label="forecast data">{ forecastResult }</List>
        </div>
    );
}

export default Forecast;
