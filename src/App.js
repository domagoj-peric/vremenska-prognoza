import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=55d9a0425950814829d45b5503ce278d`


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        if (error.response) {
          console.error('Server Error:', error.response.status);
        } else if (error.request) {
          console.error('Network Error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
        setData('')
      });
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p className='black'>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p className='black'>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold '>{data.main.humidity}%</p> : null}
              <p className='black'>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KMH</p> : null}
              <p className='black'>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;