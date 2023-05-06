import React, { useState } from 'react'
import './css/DataBody.css'
import Weather from './Weather'
import './css/DayWeekForcast.css'
import ForcastData from './ForcastData'
import {getTime} from '../services/weatherService'
// import {formatToLocalTime} from '../services/weatherService'
import {DateTime} from 'luxon'

function DataBody({ weatherData }) {
  const [time, setTime] =useState()
  const formatToLocalTime = (secs, zone, format)=>DateTime.fromSeconds(secs).setZone(zone).toFormat(format)
  const timeZone = weatherData.locInfo.Name

  const getTimee = async()=>{
    const unixSecs = await getTime(timeZone)
    let timeee = formatToLocalTime(unixSecs.timeSecs, timeZone,"cccc, dd LLL yyyy' |' hh:mm:ss a")
    setTime(timeee)
    return timeee
  }
  setInterval(() => {
    getTimee()
  }, 800);
  

  const greetingFn = () => {
    let hour = weatherData.date_time.time_hour
    if (hour >= 5 && hour < 12) {
      return ('Good morning');
    } else if (hour >= 12 && hour < 18) {
      return ('Good afternoon');
    } else {
      return ('Good evening');
    }
  }
  const greetingMsg = greetingFn()

  return (
    <div className='weather-main'>
      <div className='heading'>
        <div className='greating'>
          {greetingMsg}
        </div>
        {/* <div className='date-time'> {weatherData.date_time.displayTime}</div> */}
        <div className='date-time'>{time} </div>
      </div>

      <div className='weather-info'>
        <Weather currentWeather={weatherData} />


        <div className='forcast-main'>
          <ForcastData title={'Hourly Forcast'} forcastData={weatherData.hourly} />
          <br />
          <br />
          <ForcastData title={'Daily Forcast'} forcastData={weatherData.daily} />
        </div>
        {/* <DayWeekForcast forcastWeather={weatherData} /> */}
      </div>

    </div>
  )
}

export default DataBody