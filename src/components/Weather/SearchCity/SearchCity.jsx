import "./SearchCity.css";
import { useState } from "react";
import { fetchWeatherByCity } from "../../../services/weatherService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const SearchCity = (props) => {
  const [city, setCity] = useState("");
  const [showAirQuality, setShowAirQuality] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState("");

  const onCityInputChangeHandler = (event) => {
    const value = event.target.value;
    setCity(value);
    setError("");

    //输入大于2个字符，就使能按钮，否则灰掉按钮
    if (value.length > 1) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const onSearchCityHandler = async (event) => {
    event.preventDefault();

    if (!city) {
      //todo: error handling
      return;
    }

    //this is a nice handler
    try {
      props.setLoading(true);
      const weatherData = await fetchWeatherByCity(city, showAirQuality);
      props.search(weatherData); //return the result to Weather component
    } catch (error) {
      setError(error.message);
    } finally {
      props.setLoading(false);
    }

    //method #1
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  };

  const onCheckBoxChangeHandler = (event) => {
    const isChecked = event.target.checked;
    setShowAirQuality(isChecked);
  };

  return (
    <Form onSubmit={onSearchCityHandler}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          placeholder="Search a city..."
          value={city}
          onChange={onCityInputChangeHandler}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error} </Alert>}
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Show air quality data"
          className="aqi"
          onChange={onCheckBoxChangeHandler}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isFormValid}>
        Search
      </Button>
    </Form>
  );
};

export default SearchCity;
