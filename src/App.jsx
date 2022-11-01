import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [weather, setWeather] = useState({});

  const[isCelsius, setIsCelsius] = useState(true)
 
  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6fe7e185fde69531fd78a150ace1b241`)
        .then(res => setWeather(res.data))
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  console.log(weather)

  return (
    <div className="App">
      <div className='Card-Weather'>
        <h1>Weather App</h1>
        <h2>{weather.name}, {weather.sys?.country}</h2>
        <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        <h2>{isCelsius ? Math.round(weather.main?.temp - 273.15) : Math.round (weather.main?.temp - 273.15) * 9/5 + 32} {isCelsius ? "Celsius" : "Farenheit"} </h2>
        <p>{weather.weather?.[0].description}</p>
        <div className='Max-Min'>
        <p> <b>max:</b> {isCelsius ? Math.round(weather.main?.temp_max- 273.15) : Math.round(weather.main?.temp_max- 273.15) * 9/5 + 32} {isCelsius ? "°C" : "°F"}</p>
        <p> <b>min:</b> {isCelsius ? Math.round(weather.main?.temp_min- 273.15) : Math.round(weather.main?.temp_min- 273.15) * 9/5 + 32} {isCelsius ? "°C" : "°F"}</p>
        </div>
        <button onClick={()=> setIsCelsius(!isCelsius)}>Change °F / °C</button>
      </div>
    </div>
  )
}

export default App
