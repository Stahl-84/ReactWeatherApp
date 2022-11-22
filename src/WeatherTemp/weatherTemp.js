import React, { useState } from "react";

export default function WeatherTemp(props) {
  const [unit, setUnit] = useState("celcius");

  function showFarenheit(event) {
    event.preventDefault();
    setUnit("farenheit");
  }

  function showCelcius(event) {
    event.preventDefault();
    setUnit("celcius");
  }

  function farenheit() {
    return (props.celcius * 9) / 5 + 32;
  }

  if (unit === "celcius") {
    return (
      <div>
        {Math.round(props.celcius)} °C |{" "}
        <a href="/" onClick={showFarenheit}>
          °F
        </a>
      </div>
    );
  } else {
    return (
      <div>
        {Math.round(farenheit())}
        <a href="/" onClick={showCelcius}>
          °C{" "}
        </a>
        | °F
      </div>
    );
  }
}
