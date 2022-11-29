import React from "react";
import "./weatherForecast.css";
import cloudy from "../Pictures/cloudy.svg";

export default function WeatherForecast(props) {
  // function handleResponse(response) {
  //   console.log(response.data);
  // }

  // let apiKey = "ef67f23a7a54f773b98cee842cc4d7ae";
  // // let apiKey = "9b66c95801e4f42b76477efd2b4bf112";
  // let lon = props.coords.lat;
  // let lat = props.coords.lon;
  // let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}$units=metric`;

  // axios.get(apiUrl).then(handleResponse);

  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <div className="WeatherForecast-day">{props.day}</div>
          {/* <div className="icon">{props.icon}</div> */}
          <img src={cloudy} className="icon" alt="" />

          <div className="WeatherForecast-temp">
            <span className="WeatherForecast-temp-max">
              {Math.round(props.temperature)}℃
            </span>
            <span className="WeatherForecast-temp-min">
              {Math.round(props.temperatureMin)}℃
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
