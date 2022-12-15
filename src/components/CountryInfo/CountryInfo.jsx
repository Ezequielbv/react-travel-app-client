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
  console.log(countryInfo)
  const [countryData, setCountryData] = useState("");
  const [fetching, setFetching] = useState(true);

  const [location, setLocation] = useState(null);
  const [vaxList, setvaxList] = useState(whoVaccination);
  //   console.log("vax", Object.keys(vaxList[0]));
  const vaxArr = Object.keys(vaxList[0]);
//   vaxArr.map((vaxCountry) => {
//     if(vaxCountry == countryInfo) {
//         console.log('pass');
//     }
//   });
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
        //   console.log("HERE FE", oneLocation);
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
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  // {countryData?
  return countryData ? (
    <>
      {/* <h2>HELLO</h2> */}
      <div key={country._id} className="card">
        <div className="card-header" id="headingTwo">
          <h2 className="mb-0">
            <button
              className="btn btn-link btn-block text-left collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              {country.city}
            </button>
          </h2>
          <button className="btn btn-danger" onClick={deleteLocation}>
            X
          </button>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <div className="countryInfo">
              <p>
                Country's native name:{" "}
                {Object.entries(countryData[0].name.nativeName)[0][1].common}
              </p>
              <p>Capital: {countryData[0].capital}</p>
              <p>
                Currency: {Object.entries(countryData[0].currencies)[0][1].name}
              </p>
              <p>
                Languages:{" "}
                {Object.entries(countryData[0].languages).map((el) => {
                  return <li>{el[1]}</li>;
                })}
              </p>
            </div>
          </div>
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

            {vaxArr.map((vaxCountry => {
                if(vaxCountry === countryInfo[0]){
                    console.log("HERE LOG", vaxList[0])
                    console.log("HERE LOG", countryInfo[0])
                    return(
                        <>
                          <section className="vaccination-reco">
                            <VaccinationReco vaxList={ vaxList} countryInfo={ countryInfo }/>
                          </section>
                        </>
                    )
                }
                
            }))}
            
        </div>
      </div>
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
