import React from 'react'
import './css/DataBody.css'
import Weather from './Weather'
import './css/DayWeekForcast.css'
import ForcastData from './ForcastData'

function DataBody({ weatherData }) {
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
        <div className='date-time'>{weatherData.date_time.displayTime}</div>
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