/* import "./ProfilePage.css";
import React, { useState, useEffect, useContext } from "react";
import axios          from 'axios';
import { LocationFormContext } from "../../context/location-form.context"; 

// const API_COUNTRY = 'https://restcountries.com/v3.1/all';
//const country     = 'germany';

const COUNTRY_API_URL = 'https://restcountries.com/v3.1/name';

function ProfilePage() {
  const { country } = useContext(LocationFormContext);
  const [fetching, setFetching] = useState(true); */
  /* const [country, setCountry] = useState([]); */

  /* useEffect(() => {
    // console.log("useEffect - Initial render (Mounting)");
    axios.get(`${COUNTRY_API_URL}/${country}`)
      .then((response) => {
        console.log(response)
        setCountry(response.data);
        setFetching(false);
      });
  }, []);
  country && console.log("country info", Object.entries(country.currencies)[0][1].name);

  return (
    <div>
      <h1>Profile page</h1>

      <div className='countryInfo'>
        <p>Capital: { country.capital }</p>  */
        {/* <p>Currency: {Object.entries(country.currencies)[0][1].name}</p> */}
        {/* <p>Language: {Object.entries(country.languages).map(el => {
                return (
                  <li>{el[1]}</li>
                )
              })}</p> */}

   /*     </div>
    </div>
  );
}

export default ProfilePage;  */
