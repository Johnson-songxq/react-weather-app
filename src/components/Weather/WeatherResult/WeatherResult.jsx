import AirQualityResult from "./AirQualityResult/AirQualityResult";
import "./WeatherResult.css";

const options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

// a useful tool: jasonformatter
const WeatherResult = (props) => {
  const location = props.weatherData.location;
  const weather = props.weatherData.current;
  const dateTime = new Date(location.localtime);

  const airQualityData = props.weatherData.current.air_quality;

  return (
    <div className="weather-result">
      <div>
        <h2>
          {location.name},{location.region}
        </h2>
        <p>{dateTime.toLocaleDateString("en-AU", options)}</p>
      </div>

      <ul>
        <li>
          <img src={weather.condition.icon} alt="weather condition icon" />
          <p>{weather.condition.text}</p>
        </li>
        <li>
          <p>Temp: {weather.temp_c} ℃</p>
        </li>
        <li>
          <p>Wind: {weather.wind_kph} km/hr</p>
        </li>
      </ul>

      {airQualityData && <AirQualityResult airQualityData={airQualityData} />}
    </div>
  );
};

export default WeatherResult;
