import { useState } from "react";
import styled from "styled-components";
import useInput from "../../components/InputField/UseInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DB_LOCATION = 'http://localhost:5005'
// const DB_LOCATION = 'mongodb://localhost:27017'

function LocationForm(props) {
    // console.log("props in LocationForm", props)
    const [city, setCity] = useState("");
    const [date, setDate] = useState("");
    const [coordinates, setCoordinates] = useState([]);

    const handleCity = (e) => setCity(e.target.value);
    const handleDate = (e) => setDate(e.target.value);
    const handleClick = (suggestion) => {
        console.log("clicked city coordinates:", suggestion.center);
        address.setValue(suggestion.place_name);
        address.setSuggestions([]);
        setCity(suggestion.place_name);
        setCoordinates(suggestion.center);
    }

    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
  
        const newLocation = {
          city,
          date,
          coordinates
        }
        console.log("info submit.", newLocation);

        axios.post(`${DB_LOCATION}/api/form`, newLocation)
          .then((response) => {
              console.log("response from axios form: ", response);
              navigate("/test");
          })
          .catch(err => console.log(err))
        // props.setFoodList([newFood, ...props.foodList]);
    }

    const address = useInput("");
    
    return (
        <form onSubmit={handleSubmit}>

            <label>City</label>
            <input
                value={city}
                onChange={handleCity}
                placeholder="Address"
                {...address}
                isTyping={address.value !== ""}
            />
            {address.suggestions?.length > 0 && (
                <div>
                {address.suggestions.map((suggestion, index) => {
                    return (
                    <div
                        key={index}
                        onClick={() => {
                            handleClick(suggestion);
                        }}
                    >
                        {suggestion.place_name}
                    </div>
                    );
                    })}
                </div>
            )}

            <input name="coordinates" value={coordinates} type="text" hidden/>

            <label>Date</label>
            <input value={date} type="date" onChange={handleDate} />

            <button type="submit">Create</button>
        </form>
    )
}

export default LocationForm



const Input = styled.input`
  width: 400px;
  background: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  position: relative;
  display: grid;
  justify-self: center;
  &:focus {
    outline: none;
    border-radius: ${(props) => props.isTyping && "10px 10px 0px 0px"};
  }
`;