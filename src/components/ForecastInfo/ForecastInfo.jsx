import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Dimmer, Loader } from 'semantic-ui-react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import axios from "axios";

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function ForecastInfo({ coordinates }) {
    const { user } = useContext(AuthContext);
    const [forecastData, setForecastData] = useState();
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    useEffect(() => {
        axios.get(`${WEATHER_API_URL}/forecast?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response) => {
                setForecastData(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    return forecastData ?
        (<>
            {/* <label className="title">Daily</label> */}
            <Accordion>
                {forecastData.list.splice(0, 7).map((item, index) => (
                    <AccordionItem key={index}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img
                                        src={`icons/${item.weather[0].icon}.png`}
                                        className="icon-small"
                                        alt="weather"
                                    />
                                    <label className="day">{forecastDays[index]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="min-max">{Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Pressure:</label>
                                    <label>{item.main.pressure}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity:</label>
                                    <label>{item.main.humidity}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Clouds:</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Wind speed:</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sea level:</label>
                                    <label>{item.main.sea_level}m</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels like:</label>
                                    <label>{item.main.feels_like}°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>) :
        (<>
            <Dimmer active>
                <Loader>
                    <p>
                    Loading ... 
                    Calling the APIs
                    </p>
                </Loader>
            </Dimmer>
        </>)
}

export default ForecastInfo;

