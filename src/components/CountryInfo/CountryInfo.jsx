import React, { useState, useEffect } from "react";
import { Dimmer, Loader }   from 'semantic-ui-react';
import axios from 'axios';

const COUNTRY_API_URL = 'https://restcountries.com/v3.1';
// const DB_BE_URL = 'http://localhost:5005';


function CountryInfo({ country }) {
    let countryInfo = country.city.split(', ').slice(-1);
    // console.log("countryinfo", country)
    const [countryData, setCountryData] = useState("");
    const [fetching, setFetching]       = useState(true);

    useEffect(() => {
    axios.get(`${COUNTRY_API_URL}/name/${countryInfo}`)
        .then((response) => {
            setCountryData(response.data);
            setFetching(false);
        });
        }, []);
    // countryData && console.log("axios country", countryData)

    // {countryData?
        return countryData ? (
            <>
            {/* <h2>HELLO</h2> */}
                <div key={country._id} className="card">
                    <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            {country.city}
                        </button>
                        </h2>
                        {/* <Link to={`${DB_BE_URL}/api/location/${country._id}`}><button className="btn btn-danger">X</button></Link> */}
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div className="card-body">
                        
                        <div className='countryInfo'>
                            <p>Common name: { Object.entries(countryData[0].name.nativeName)[0][1].common }</p>
                            <p>Capital: { countryData[0].capital }</p>  
                            <p>Currency: {Object.entries(countryData[0].currencies)[0][1].name}</p>
                            <p>Languages: {Object.entries(countryData[0].languages).map(el => {
                                return (
                                    <li>{el[1]}</li>
                                )
                                })}</p> 
                        </div>
                        </div>
                    </div>
                </div>
            </>
        ) : (<>
            <Dimmer active>
                <Loader>
                    Loading ...
                </Loader>
            </Dimmer>
        </>)
}

export default CountryInfo;
