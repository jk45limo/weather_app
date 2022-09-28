import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

import { ThreeDots } from 'react-loader-spinner';


function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')

  const[loading, setLoading] =useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() =>{
      setLoading(false)
    }, 5000)
  }, [])
  
  const url= `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3a4639e96cf8c49f8556f9d199849a96`
  
  const searchLocation = (event) => {
    if(event.key === 'Enter')
    {
      axios.get(url).then((response)=> {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

 

  return (
    <div className="App">
      {
        loading ?
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
      
        <ThreeDots color="black" height="100" width="100" display = "center"/>
        </div>
        :
          <div>
          <h1>WEATHER APP.</h1>
          <div className="search-button">
            <input 
            value = {location}
            onChange = { event=>setLocation(event.target.value)}
            onKeyPress={searchLocation}
            type="text" 
            placeholder="Enter Location"
            />
            
          </div>
          
          <div className= "Location">
            <h2>{data.name}</h2>
          </div>
          <div className= "Country">
            <h3>{data.sys ? <p>{data.sys.country}</p> : null}</h3>
          </div>
          <div className= "Temprature">
            <h3>Temprature</h3>
            {data.main ? <p>{data.main.temp}°F</p> : null}
          </div>
          <div className= "wind">
            <h3>Wind Speed</h3>
            {data.wind ? <p>{data.wind.speed}MPH</p> : null}
          </div>
          <div className= "Humidity">
            <h3>Humidity</h3>
            {data.main ? <p>{data.main.humidity}</p> : null}
          </div>
          <div className= "Clouds">
            <h3>Clouds Description</h3>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          </div>
      }
    </div>
  );
}

export default App;
