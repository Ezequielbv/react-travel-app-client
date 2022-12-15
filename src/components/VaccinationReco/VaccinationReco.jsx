import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import whoVaccination from '../../who-vaccination.json'

function VaccinationReco({ vaxList, countryInfo }) {
    // const [vaxList, setvaxList] = useState(whoVaccination);
    // vaxList.map(el => {console.log("el",Object.keys(el))})
    // console.log("vax", Object.keys(vaxList[0]));
    // console.log("vaxpage", countryInfo);
    // console.log("vax page", countryInfo[0])
    // console.log(vaxList[0])
    // const vaxInfo = vaxList[0].include(countryInfo[0])

    // Object.values(vaxList[0])[Object.keys(vaxList[0]).indexOf(countryInfo[0])];


    return (
        <>
        <h3>Vax</h3>
        
        </>
    )
}

export default VaccinationReco;  
