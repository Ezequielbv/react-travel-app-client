import "./ProfilePage.css";
import React, { useState, useEffect, useContext } from "react";
import { LocationFormContext } from "../../context/location-form.context";
import { Dimmer, Loader }   from 'semantic-ui-react';
import CountryInfo from "../../components/CountryInfo/CountryInfo";
import GetWeather from "../../components/LocationBoard/GetWeather";
// import whovaccination from '../../who-vaccination.json';
import axios          from 'axios';

const DB_BE_URL = 'http://localhost:5005';

function ProfilePage() {
  const [countries, setCoutries] = useState();
  // const [vaxList, setVaxList] = useState(whovaccination);
  
  
  useEffect(() => {
    axios.get(`${DB_BE_URL}/api/profile`)
    .then((response) =>{
      setCoutries(response.data.location);
    })
  }, []);
  countries && console.log("countries from BE", countries)
  
  return (
    <>
      <div>
        <h1>Profile page</h1>

        <div class="accordion" id="accordionExample">
        {countries?.map((country) => {
          return (
            <>
              <CountryInfo country={country}/>
              {/* <GetWeather coordinates={ country.coordinates }/> */}
            </>
          )
        })}
        </div>
      </div>
    </>
    )
}

export default ProfilePage;
