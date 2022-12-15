import "./CountryInfo.css";
import React, { useState, useEffect, useContext } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import AddNote from "../AddNote/AddNote";
import NoteCard from "../NoteCard/NoteCard";
import VaccinationReco from "../VaccinationReco/VaccinationReco";
import whoVaccination from "../../who-vaccination.json";
import axios from "axios";


const COUNTRY_API_URL = "https://restcountries.com/v3.1";
const DB_BE_URL = "http://localhost:5005";

function CountryInfo({ country }) {
  let countryInfo = country.city.split(", ").slice(-1);
  //console.log(countryInfo)
  const [countryData, setCountryData] = useState("");
  const [fetching, setFetching] = useState(true);
  const [location, setLocation] = useState(null);
  const [vaxList, setvaxList] = useState(whoVaccination);
  const vaxArr = Object.keys(vaxList); //returns array with country names
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${COUNTRY_API_URL}/name/${countryInfo}`).then((response) => {
      setCountryData(response.data);
      setFetching(false);
    });
  }, []);
  // countryData && console.log("axios country", countryData)

  //get Location iD
  const getLocation = () => {
    axios
      .get(`${DB_BE_URL}/api/locations/${country._id}`)
      .then((response) => {
        const oneLocation = response.data;
        setLocation(oneLocation);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getLocation();
  }, []);

  const deleteLocation = () => {
    // Make a DELETE request to delete the project
    axios
      .delete(`${DB_BE_URL}/api/locations/${country._id}`)
      .then(() => {
        console.log("deleted: ", country._id);
        // Once the delete request is resolved successfully
        // navigate back to the list of projects.
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  return countryData ? (
    <>
      {/* <h2>HELLO</h2> */}
      {/* <div className=""> */}
        <div key={country._id} className="card-header d-flex justify-content-between" id={`heading${country._id}`}>
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target={`#collapse${country._id}`}
              aria-expanded="false"
              aria-controls={`collapse${country._id}`}
            >
              {country.city}
            </button>
          </h2>
          <button className="btn btn-danger btn-sm" onClick={deleteLocation}>
            X
          </button>
        </div>
        <div
          id={`collapse${country._id}`}
          className="collapse"
          aria-labelledby={`heading${country._id}`}
          data-parent="#accordionExample"
        >
          <div className="card-body flex-row flex-wrap">
            <div className="countryInfo">
              <p>
                Country's native name:<br/>
                <span>{Object.entries(countryData[0].name.nativeName)[0][1].common}</span>
              </p>
              <hr/>
              <p>Capital: <br/><span>{countryData[0].capital}</span></p>
              <hr/>
              <p>
                Currency: <br/><span>{Object.entries(countryData[0].currencies)[0][1].name}</span>
              </p>
              <hr/>
              <p>
                Languages:<br/>
                <ul>
                {Object.entries(countryData[0].languages).map((el) => {
                  return <li>{el[1]}</li>;
                })}
                </ul>
              </p>
            </div>
          
          <section className="weather-section d-flex">
            <WeatherInfo coordinates={ country.coordinates }/> 
            <ForecastInfo coordinates={ country.coordinates }/>
          </section>

          <section className="notes-section d-flex justify-content-center">
            <AddNote refreshLocation={getLocation} locationId={country._id} />
            <div className="notes-list d-flex justify-content-center">
              {location &&
                location.notes.map((note) => (
                  <NoteCard
                    note={note}
                    refreshLocation={getLocation}
                    key={note._id}
                    {...note}
                  />
                ))}
            </div>
          </section>

          {vaxList[countryInfo] &&
            <section className="vaccination-reco">
              <VaccinationReco vaxCountry={vaxList[countryInfo]} />
            </section>
          }
          </div>
      {/* </div> */}
    </>
  ) : (
    <>
      <Dimmer active>
        <Loader>Loading ...</Loader>
      </Dimmer>
    </>
  );
}

export default CountryInfo;
