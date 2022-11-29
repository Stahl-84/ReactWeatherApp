import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";
import FormatDate from "../FormatDate/formatDate";
import WeatherTemp from "../WeatherTemp/weatherTemp";
import WeatherForecast from "../WeatherForecast/weatherForecast";

export default function WeatherNew() {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState("London");
  const [fiveDays, setFiveDays] = useState([]);
  const [fiveDaysLoaded, setFiveDaysLoaded] = useState(false);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coords: response.data.coord,
      temperature: response.data.main.temp,
      temperatureMin: response.data.main.temp_min,
      wind: response.data.wind.speed,
      city: response.data.name,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      icon: "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
    });
    // getFive(response.data);
  }

  // function showCity(response) {
  //   setWeatherData(response.data);
  //   console.log(response.data);
  // }

  function search() {
    const apiKey = "add35dfe5082c9006db11e86b2d079d0";
    // const apiKey = "9b66c95801e4f42b76477efd2b4bf112";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  // function getFive(response) {
  //   console.log(response);
  //   // const apiKey = "9b66c95801e4f42b76477efd2b4bf112";
  //   const apiKey = "add35dfe5082c9006db11e86b2d079d0";
  //   let lon = response.coord.lat;
  //   let lat = response.coord.lon;
  //   let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  //   axios.get(apiUrl).then(handleFiveResponse);
  // }

  function handleFiveResponse(response) {
    setFiveDays(response);
    setFiveDaysLoaded(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function getDay(newDay) {
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return days[newDay.getDay() - 1];
  }

  // function renderFiveDays(data) {
  //   console.log(data);
  //   return (
  //     <div>
  //       {data.data.list.map(function (day, index) {
  //         <WeatherForecast
  //           icon={day.weather[0].icon}
  //           temperature={day.main.temp_max}
  //           temperatureMin={day.main.temp_min}
  //           day={getDay(new Date(day.dt * 1000))}
  //         />;
  //       })}
  //     </div>
  //   );
  // }

  if (weatherData.ready) {
    return (
      <div className="weatherapp container">
        <form onSubmit={handleSubmit} className="form">
          <input type="search" onChange={updateCity} />
          <input type="submit" value="Search" />
        </form>
        <p className="cityName">{weatherData.city}</p>
        <div className="row">
          <div className="col-12 col-sm-6">
            <ul className="info">
              <li>
                <FormatDate date={weatherData.date}></FormatDate>
              </li>
              <li>{weatherData.description}</li>
            </ul>
          </div>

          <div className="col-12 col-sm-6">
            <ul className="info">
              <WeatherTemp celcius={Math.round(weatherData.temperature)} />
              {/* <li>Temperature: {Math.round(apiSearch.main.temp)} °C | F</li> */}
              <li>Humidity: {weatherData.humidity} %</li>
              <li>Wind: {Math.round(weatherData.wind)} km/h</li>
            </ul>
          </div>
        </div>
        <img src={weatherData.icon} />

        {/* {fiveDaysLoaded ? renderFiveDays(fiveDays) : "Loading..."} */}

        {/* <WeatherForecast
          icon={weatherData.icon}
          temperature={weatherData.temperature}
          temperatureMin={weatherData.temperatureMin}
          coords={weatherData.coords}
          day={getDay(weatherData.date)}
        /> */}

        {/* {fiveDays} */}

        <p className="author">
          This project was coded by{" "}
          <strong className="text-dark">Erika Stahl</strong> and is open-sourced
          on{" "}
          <a
            href="https://github.com/Stahl-84/ReactWeatherApp"
            className="link text-dark"
            target="_blank"
            rel="noreferrer"
          >
            <strong>GitHub</strong>
          </a>
        </p>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}

// export default function Weather(props) {
//   let [city, setCity] = useState("Mijas");
//   let [apiSearch, setApiSearch] = useState(null);

// useEffect(() => {
//   handleSearch();
// }, []);

// function handleSearch() {
//   let apiKey = "add35dfe5082c9006db11e86b2d079d0";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//   axios.get(apiUrl).then(showCity);
// }

// function showCity(response) {
//   setWeatherData(response.data);
//   console.log(response.data);
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   handleSearch();
// }

// function updateCity(event) {
//   event.preventDefault();
//   weatherData(event.target.value);
// }

// if (apiSearch) {
//   return (
//     <div className="weatherapp container">
//       <form onSubmit={handleSubmit} className="form">
//         <input type="search" onChange={updateCity} />
//         <input type="submit" value="Search" />
//       </form>
//       <p className="cityName">{apiSearch.name}</p>
//       <div className="row">
//         <div className="col-12 col-sm-6">
//           <ul className="info">
//             <li>
//               <FormatDate date={new Date(apiSearch.dt)}></FormatDate>
//             </li>
//             <li>{apiSearch.weather[0].description}</li>
//           </ul>
//         </div>

//         <div className="col-12 col-sm-6">
//           <ul className="info">
//             <WeatherTemp celcius={Math.round(apiSearch.main.temp)} />
//             {/* <li>Temperature: {Math.round(apiSearch.main.temp)} °C | F</li> */}
//             <li>Humidity: {apiSearch.main.humidity} %</li>
//             <li>Wind: {Math.round(apiSearch.wind.speed)} km/h</li>
//           </ul>
//         </div>
//       </div>
//       <img
//         src={`http://openweathermap.org/img/wn/${apiSearch.weather[0].icon}.png`}
//         alt=""
//         className="icon"
//       />

//       <p className="author">
//         This project was coded by{" "}
//         <strong className="text-dark">Erika Stahl</strong> and is open-sourced
//         on{" "}
//         <a
//           href="https://github.com/Stahl-84/ReactWeatherApp"
//           className="link text-dark"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <strong>GitHub</strong>
//         </a>
//       </p>
//     </div>
//   );
// } else {
//   return (
//     <div>
//       <p>Please type a city</p>
//       <form onSubmit={handleSubmit}>
//         <input type="search" onChange={updateCity} />
//         <input type="submit" value="Search" />
//       </form>
//     </div>
//   );
// }
// }
