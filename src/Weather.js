import React, { useState } from "react";
import axios from "axios";

export default function Weather(props) {
  let [city, setCity] = useState("");
  let [apiSearch, setApiSearch] = useState(null);

  function showCity(response) {
    setApiSearch(response.data);
    console.log(response.data);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiKey = "add35dfe5082c9006db11e86b2d079d0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showCity);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  if (apiSearch) {
    return (
      <div>
        <p>Weather App</p>

        <form onSubmit={handleSubmit}>
          <input type="search" onChange={updateCity} />
          <input type="submit" value="Search" />
        </form>
        <ul>
          <li>
            The temperature in <strong>{apiSearch.name}</strong>
          </li>
          <li> is {Math.round(apiSearch.main.temp)} °C</li>
          <li>and the humidity is {apiSearch.main.humidity} %</li>
          <img
            src={`http://openweathermap.org/img/wn/${apiSearch.weather[0].icon}.png`}
            alt=""
          />
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <p>Please type a city</p>

        <form onSubmit={handleSubmit}>
          <input type="search" onChange={updateCity} />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
