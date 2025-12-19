import { useState, useEffect } from "react";
import "../styles/weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  ///   it is use for get default location weather
  const getWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported")
      return;
    }
    setLoading(true)
    setError('')

    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    const { latitude, longitude } = position.coords;

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d62ae84d24454e5f83245510251410&q=${latitude},${longitude}&aqi=no`)
      let data = await response.json()
      setWeather(data)
    }
    catch (error) {
      setError('Location Permission denied')
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getWeatherByLocation()
  }, [])

  /// it is use for get weather using type city name
  const getData = async () => {
    if (!city.trim()) return;

    setWeather(null)
    setError('')
    setLoading(true)
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d62ae84d24454e5f83245510251410&q=${city}&aqi=yes`)
      let data = await response.json()
      console.log(data)
      if (data.error) {
        setError(data.error.message);
        return;
      }
      setWeather(data)
    }
    catch (error) {
      console.error('Failed to fetch weather data', error)
    }
    finally {
      setLoading(false)
    }
    setCity('')
  }

  return (
    <div className="container">
      <div className="main-div">
        <h2 className="weather-title">Weather Update</h2>
        <div className="second-div">
          <input className="weather-input"
            placeholder="Enter the city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getData()}
          />
          <button className="search-btn" onClick={getData}>Search</button>
        </div>
      </div>

      <div>
        {weather && (
          <div className="rander-data">
            <h3>
              {weather.location.name}, {weather.location.region}
            </h3>
            <p>Country: {weather.location.country}</p>
            <p>Local Time: {weather.location.localtime}</p>
            <img
              className="weather-icon"
              src={`https:${weather.current.condition.icon}`}
              alt="weather"
            />
            <p>Temp: {weather.current.temp_c}°C</p>
            <p>Condition: {weather.current.condition.text}</p>
            <p>Feels Like: {weather.current.feelslike_c}°C</p>
            <p>Wind: {weather.current.wind_kph} kph</p>
            <p>Humidity: {weather.current.humidity}%</p>
          </div>
        )}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}