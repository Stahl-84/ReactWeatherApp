import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";
import FormatDate from "../FormatDate/formatDate";
import WeatherTemp from "../WeatherTemp/weatherTemp";

export default function Weather(props) {
  let [city, setCity] = useState("Mijas");
  let [apiSearch, setApiSearch] = useState(null);

  useEffect(() => {
    handleSearch();
  }, []);

  function handleSearch() {
    let apiKey = "add35dfe5082c9006db11e86b2d079d0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showCity);
  }

  function showCity(response) {
    setApiSearch(response.data);
    console.log(response.data);
    // setApiSearch(new Date(response.data.dt * 1000));
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSearch();
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  if (apiSearch) {
    return (
      <div className="weatherapp container">
        <form onSubmit={handleSubmit} className="form">
          <input type="search" onChange={updateCity} />
          <input type="submit" value="Search" />
        </form>
        <p className="cityName">{apiSearch.name}</p>
        <div className="row">
          <div className="col-12 col-sm-6">
            <ul className="info">
              <li>
                <FormatDate date={new Date(apiSearch.dt)}></FormatDate>
              </li>
              <li>{apiSearch.weather[0].description}</li>
            </ul>
          </div>

          <div className="col-12 col-sm-6">
            <ul className="info">
              <WeatherTemp celcius={Math.round(apiSearch.main.temp)} />
              {/* <li>Temperature: {Math.round(apiSearch.main.temp)} °C | F</li> */}
              <li>Humidity: {apiSearch.main.humidity} %</li>
              <li>Wind: {Math.round(apiSearch.wind.speed)} km/h</li>
            </ul>
          </div>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${apiSearch.weather[0].icon}.png`}
          alt=""
          className="icon"
        />
        <p className="author">
          This project was coded by <strong>Erika Stahl</strong> and is
          open-sourced on{" "}
          <a
            href="https://github.com/Stahl-84/ReactWeatherApp"
            className="link text-dark"
            target="_blank"
          >
            <strong>GitHub</strong>
          </a>
        </p>
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
