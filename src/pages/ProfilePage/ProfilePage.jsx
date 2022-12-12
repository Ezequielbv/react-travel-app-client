import "./ProfilePage.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';

// const API_COUNTRY = 'https://restcountries.com/v3.1/all';
const country = 'germany';
const API_COUNTRY = `https://restcountries.com/v3.1/name/${country}`;

function ProfilePage() {

  const [fetching, setFetching] = useState(true);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    // console.log("useEffect - Initial render (Mounting)");
    axios.get(API_COUNTRY)
      .then((response) => {
        setCountry(response.data[0]);
        setFetching(false);
      });
  }, []);
  country && console.log("country info", Object.entries(country.currencies)[0][1].name);

  return (
    <div>
      <h1>Profile page</h1>

      <div className='countryInfo'>
        <p>Capital: {country.capital}</p>
        {/* <p>Currency: {Object.entries(country.currencies)[0][1].name}</p> */}
        {/* <p>Language: {Object.entries(country.languages).map(el => {
                return (
                  <li>{el[1]}</li>
                )
              })}</p> */}

      </div>
    </div>
  );
}

export default ProfilePage;
