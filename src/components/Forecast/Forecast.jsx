import React                from 'react';
import { useContext }       from "react";
import { ForecastContext }  from '../../context/forecast.context';
import { Dimmer, Loader }   from 'semantic-ui-react';
import {
        Accordion,
        AccordionItem,
        AccordionItemHeading,
        AccordionItemButton,
        AccordionItemPanel,
        }                   from 'react-accessible-accordion';
import './Forecast.css';

const WEEK_DAYS       = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Forecast() {
    const  { forecast }   = useContext(ForecastContext);
    forecast && console.log("forecast weather: ", forecast.list.splice(0, 7));
    const dayInAWeek      = new Date().getDay();
    const forecastDays    = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return forecast ?
        (<>
            <label className="title">Daily</label>
            <Accordion>
                { forecast.list.splice(0, 7).map((item, index) => (
                    <AccordionItem key={ index }>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img 
                                        src={ `icons/${ item.weather[0].icon }.png` }
                                        className="icon-small" 
                                        alt="weather" 
                                    />
                                    <label className="day">{ forecastDays[index] }</label>
                                    <label className="description">{ item.weather[0].description }</label>
                                    <label className="min-max">{ Math.round(item.main.temp_max) }°C / { Math.round(item.main.temp_min) }°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Pressure:</label>
                                    <label>{ item.main.pressure }</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity:</label>
                                    <label>{ item.main.humidity }</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Clouds:</label>
                                    <label>{ item.clouds.all }%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Wind speed:</label>
                                    <label>{ item.wind.speed } m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sea level:</label>
                                    <label>{ item.main.sea_level }m</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels like:</label>
                                    <label>{ item.main.feels_like }°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem> 
                )) }
            </Accordion>
        </>) :
        (<>
            <Dimmer active>
                <Loader>
                    Loading ...
                </Loader>
            </Dimmer>
        </>) 
}

export default Forecast;
