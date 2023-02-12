const API_KEY = "6854d3862bbb47018b0114439230502";
const FETCH_CITY_WEATHER_URL = "http://api.weatherapi.com/v1/current.json";

export const fetchWeatherByCity = async (city, showAirQuality) => {
  const url = new URL(FETCH_CITY_WEATHER_URL);

  url.searchParams.append("key", API_KEY);
  url.searchParams.append("q", city);
  url.searchParams.append("aqi", showAirQuality ? "yes" : "no");

  //method await
  const response = await fetch(url);
  const data = await response.json();

  //通过在上面加断点，看到有error
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data;
};
