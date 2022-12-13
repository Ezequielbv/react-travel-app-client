import "./ProfilePage.css";
import React, { useState, useEffect, useContext } from "react";
import { LocationFormContext } from "../../context/location-form.context";
import { Dimmer, Loader }   from 'semantic-ui-react';

import axios          from 'axios';

const COUNTRY_API_URL = 'https://restcountries.com/v3.1';

function ProfilePage() {
  const { country }       = useContext(LocationFormContext);
  const [countryData, setCountryData] = useState("");
  const [fetching, setFetching]       = useState(true);
  country && console.log(country);

  useEffect(() => {
    console.log("useEffect - Initial render (Mounting)");
    axios.get(`${COUNTRY_API_URL}/name/${country}`)
      .then((response) => {
        console.log(response)
        setCountryData(response.data);
        setFetching(false);
      });
  }, []);
  countryData && console.log(countryData)
  countryData && console.log(countryData[0].name.nativeName);
  
  //Languages
  countryData && console.log(Object.entries(countryData[0].languages)[0])

  return countryData ? 
    (<>
      <div>
        <h1>Profile page</h1>
        <div className='countryInfo'>
          <p>Common name: { Object.entries(countryData[0].name.nativeName)[0][1].common }</p>
          {/* <p>Native name: { countryData[0].name.nativeName } </p> */}
          <p>Capital: { countryData[0].capital }</p>  
          <p>Currency: {Object.entries(countryData[0].currencies)[0][1].name}</p>
          <p>Languages: {Object.entries(countryData[0].languages).map(el => {
                  return (
                    <li>{el[1]}</li>
                  )
                })}</p> 
          </div>
      </div>
    </>) :
    (<>
      <Dimmer active>
                <Loader>
                    Loading ...
                </Loader>
      </Dimmer>
    </>);
}

export default ProfilePage;
