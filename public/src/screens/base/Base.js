import React, { useState } from "react";
import "./Base.css";
import axios from "axios";

function Base() {
  let count= 0

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [img, setImg] = useState("");
  const [err, setErr] = useState(false);

  function HandleCityChange(e) {
    setCity(e.target.value);
    console.log(e.target.value);
  }
  const call = async () => {
    // const result = document.querySelector(".result")
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=f55b1a67b2c34fc8a7390538240209&q=${city.toLowerCase()}`;
      const response = await axios.get(url);

      setWeather(response.data); // Update weather state
      setImg(weather.current.condition["icon"]);
      setErr(false);
      console.log(img);
    } catch (error) {
      count++;
      if  (count !== 1)
      setErr(true);
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      <div className="base">
        <input
          id="one"
          type="text"
          value={city}
          onChange={HandleCityChange}
          placeholder="Enter city"
        ></input>
        <button type="submit" onClick={call}>
          Get Weather
        </button>
        {err ? (
          <h3>Failed to fetch</h3>
        ) : (
          weather && (
              <div className="base1">
                <h3>{weather.location["name"]}</h3>
                <h3>{weather.current["temp_c"]} 'C</h3>
                <h3>{weather.current["condition"]["text"]}</h3>
                <img src={img} alt="weather-photo" />
              </div>
          )
        )}
      </div>
    </div>
  );
}

export default Base;
