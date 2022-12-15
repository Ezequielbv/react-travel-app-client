import "./ProfilePage.css";
import React, { useState, useEffect, useContext } from "react";
import CountryInfo                    from "../../components/CountryInfo/CountryInfo";
// import WeatherInfo                    from "../../components/WeatherInfo/WeatherInfo";
// import ForecastInfo                   from "../../components/ForecastInfo/ForecastInfo";
import axios                          from 'axios';
import { AuthContext } from "../../context/auth.context";

// const DB_BE_URL = 'http://localhost:5005';

function ProfilePage() {
  const [countries, setCoutries] = useState();
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  console.log("logged?", isLoggedIn, user._id)
  // const [vaxList, setVaxList] = useState(whovaccination);
  
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/profile`)
    .then((response) =>{
      let listAllLocation = response.data.location;
      setCoutries(listAllLocation);
    })
  }, []);
  countries && console.log("countries from BE", countries)
  
  return (
    <>
      <div className="container">
        <h1>Your Profile Page, {user.name}</h1>

        <div class="accordion" id="accordionExample">
        {countries?.map((country) => {
          return (
            <>
            {(country.userOwnerId === user._id) &&
              <CountryInfo country={country}/>
            }
            </>
          )
        })}
        </div>
      </div>
    </>
    )
}

export default ProfilePage;
