import React              from 'react';
import { useContext }     from "react";
import { Button, Card }   from 'semantic-ui-react'
import { WeatherContext } from "../../context/weather.context";
import moment             from 'moment';
import styled from 'styled-components';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

import './GetWeather.css';

function GetWeather() {
  const  { data }   = useContext(WeatherContext);
  data && console.log("datagetweather", data)
  data && console.log(data.weather[0].main)
  
  const WeatherIcon = styled.div`
    color: whitesmoke;
  `;

  const refresh = () => {
    window.location.reload();
  }
  let weatherIcon = null;
  if (data.weather[0].main === 'Thunderstorm') {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (data.weather[0].main === 'Drizzle') {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (data.weather[0].main === 'Rain') {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (data.weather[0].main === 'Snow') {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (data.weather[0].main === 'Clear') {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (data.weather[0].main === 'Clouds') {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  } 
  return data ? 
      (<> 
        <div className="main">
          <div className="top">
            <p className="header">{ data.name }</p>
            <Button className="button" inverted color='blue' circular icon='refresh' onClick={refresh} />
          </div>
          <div className="flex">
            <p className="day">{ moment().format('dddd') }, <span>{ moment().format('LL') }</span></p>
            <div className="flex">
              <WeatherIcon style={{ fontSize:30,marginTop:15 }}>{ weatherIcon }</WeatherIcon>
              <p className="description">{ data.weather[0].description }</p>
            </div>
          </div>
    
          <div className="flex">
            <p className="temp">Temperature: { data.main.temp } &deg;C</p>
            <p className="temp">Humidity: { data.main.humidity } %</p>
          </div>
    
          <div className="flex">
            <p className="sunrise-sunset">Sunrise: { new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN') }</p>
            <p className="sunrise-sunset">Sunset: { new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN') }</p>
          </div>
        </div>  
      </>) 
      : <>Loading</>
}

export default GetWeather;