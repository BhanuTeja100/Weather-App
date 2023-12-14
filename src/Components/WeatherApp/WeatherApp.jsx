import React, { useState } from 'react'
import './WeatherApp.css'

// defining the variables for images
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp =  () => {

  let api_key = "371026b0c0ed8135dc936697d5237ea8";
  const [wicon, setWicon] = useState(cloud_icon);

  const [cityExists, setCityExists] = useState(true);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");

    if(element[0].value === ""){
      return 0;
    }


    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;


    try{

      // using fetch api to get the data to our variable
      
      let response = await fetch(url);

      if (!response.ok) {
        // Handle the case where the request was not successful
        console.error(`Error: ${response.status} - ${response.statusText}`);
        setCityExists(false);
        // You can display an error message or take appropriate action here
        return;
      }

      let data = await response.json();
      // console.log(data);
      console.log(element[0]);
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      
      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h"; 
      temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
      location[0].innerHTML = data.name;
      
      
      if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
        setWicon(clear_icon);
      }
      else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
        setWicon(cloud_icon);
      }
      else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
        setWicon(snow_icon);
      }
      else {
        setWicon(clear_icon);
      }

      setCityExists(true);
    }catch(error){
      console.log("Error: ", error);
    }

  }
  return (
    <>
    

      <div className="container">

        <div className="top-bar">
          <input type="text" className="cityInput" placeholder='search'/>
          <div className="search-icon" onClick={()=>{search()}}>
            <img src={search_icon}  alt="search" />
          </div>
        </div>

        <div className="weather-image">
          <img src={wicon} alt="icon" />
        </div>

        <div className="weather-temp">24°C</div>
        <div className="weather-location">London</div>
        
        <div className="data-container">

          <div className="element">
            <img src={humidity_icon} alt="" className="icon"/>
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
            
          </div>

          <div className="element">
            <img src={wind_icon} alt="" className="icon"/>
            <div className="data">
              <div className="wind-rate">18 Km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>

        </div>

      
      </div>
      {!cityExists && <div className="error-message">City not found</div>}
    
    </>
  )
}

export default WeatherApp