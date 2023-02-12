import "./Weather.css";
import { useState } from "react";
import SearchCity from "./SearchCity/SearchCity";
import WeatherResult from "./WeatherResult/WeatherResult";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import { Spinner } from "react-bootstrap";
import Spinner from "../Spinner/Spinner";

const Weather = () => {
  const [weather, setWeather] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = (weatherData) => {
    setWeather(weatherData);
  };

  return (
    <Card className="text-center weather">
      <Card.Header>
        <h1>JR Weather App ⛅ </h1>
      </Card.Header>
      <Card.Body>
        {/* <fieldset disabled> */}
        <SearchCity search={onSearch} setLoading={setIsLoading} />
        {/* </fieldset> */}
        {isLoading ? (
          <Spinner />
        ) : (
          weather && <WeatherResult weatherData={weather} />
        )}
      </Card.Body>
      <Card.Footer className="text-muted">By Johnson SONG</Card.Footer>
    </Card>
  );
};

export default Weather;

// to do:
// 异常处理
// 表单验证
// aqi
