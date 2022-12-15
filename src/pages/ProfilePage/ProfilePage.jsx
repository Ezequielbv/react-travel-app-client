import "./ProfilePage.css";
import React, { useState, useEffect } from "react";
import CountryInfo                    from "../../components/CountryInfo/CountryInfo";
// import WeatherInfo                    from "../../components/WeatherInfo/WeatherInfo";
// import ForecastInfo                   from "../../components/ForecastInfo/ForecastInfo";
import axios                          from 'axios';

// const DB_BE_URL = 'http://localhost:5005';

function ProfilePage() {
  const [countries, setCoutries] = useState();
  // const [vaxList, setVaxList] = useState(whovaccination);
  
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/profile`)
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
              {/* <WeatherInfo coordinates={ country.coordinates }/> 
              <ForecastInfo coordinates={ country.coordinates }/> */}
            </>
          )
        })}
        </div>
      </div>
    </>
    )
}

export default ProfilePage;
