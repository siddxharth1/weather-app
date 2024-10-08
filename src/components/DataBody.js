import React, { useEffect, useState } from 'react'
import './css/DataBody.css'
import Weather from './Weather'
import './css/DayWeekForcast.css'
import ForcastData from './ForcastData'
import { getTime } from '../services/weatherService'
import { formatToLocalTime } from '../services/weatherService'

function DataBody({ weatherData, units, setUnits }) {

  const backgroungUrl = weatherData.backgroundImageUrl
  const [time, setTime] = useState()

  useEffect(() => {
    const getTimee = async () => {
      const unixSecs = await getTime(weatherData.locInfo.Name)
      let timeee = formatToLocalTime(unixSecs.timeSecs, weatherData.locInfo.Name, "cccc, dd LLL yyyy' |' hh:mm:ss a")
      setTime(timeee)  
      return timeee
    }
    getTimee()
    timeInc();
  },[] )
  
  const timeInc = async()=>{   
    let seconds =  weatherData.date_time.timeSecs;
    setInterval(() => {
      seconds = seconds+1
      let timee = formatToLocalTime(seconds, weatherData.locInfo.Name, "cccc, dd LLL yyyy' |' hh:mm:ss a")
      setTime(timee)
    }, 1000);
  }
  
  const greetingFn = () => {
    let hour = weatherData.date_time.time_hour
    if (hour >= 5 && hour < 12) {
      return ('Good Morning');
    } else if (hour >= 12 && hour < 18) {
      return ('Good Afternoon');
    } else {
      return ('Good Evening');
    }
  }
  const greetingMsg = greetingFn()

  const handleUnitsChange = (e) => {
    const selectedUnit = e.target.id
    // console.log(selectedUnit)
    if (units !== selectedUnit) setUnits(selectedUnit)
  }

  var tempUnit = 'C'
  var speedUnit ='m/s'
  if(units==='imperial'){
    tempUnit = 'F'
    speedUnit ='mi/h'
  }
  else{
    tempUnit = 'C'
    speedUnit ='m/s'
  }
  var displayUnits ={tempUnit, speedUnit}

  

  return (
    <div className='weather-main' style={{backgroundImage : `url(${backgroungUrl})`}}>
      <div className='blur_layer'>
      <div className='heading'>
        <div className='greating'>
          {greetingMsg}
        </div>
        <div className='date-time'>{time} </div>
      </div>

      <div className='weather-info'>
        <div className='main-weather' >
          <div className='blur'>
            <div className='loc-unit'>
              <div className='location'>
                <i className='bi bi-geo-alt'/>
                <p>{weatherData.locInfo.location}</p>
              </div>

              <div>
                <div className='switches'>
                  <input type="radio" name="unit" id="metric" defaultChecked onChange={handleUnitsChange} />
                  <label htmlFor="metric">°C</label>
                  <input type="radio" name="unit" id="imperial" onChange={handleUnitsChange} />
                  <label htmlFor="imperial">°F</label>
                </div>
              </div>
            </div>
            <Weather currentWeather={weatherData} displayUnit={displayUnits}/>
          </div>
        </div>


        <div className='forcast-main'>
          <ForcastData title={'Hourly Forcast'} forcastData={weatherData.hourly} displayUnit={displayUnits}/>
          <br />
          <br />
          <ForcastData title={'Daily Forcast'} forcastData={weatherData.daily} displayUnit={displayUnits}/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default DataBody