import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue]             = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event) => {
    setValue(event.target.value);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${process.env.REACT_APP_MAPBOX_API}&autocomplete=true`;
      const response = await fetch(endpoint);
      const results  = await response.json();
      console.log(results)
      setSuggestions(results?.features);
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions
  };
};

export default useInput;