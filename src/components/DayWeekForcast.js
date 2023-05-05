import React from 'react'
import ForcastData from './ForcastData'
import './DayWeekForcast.css'

function DayWeekForcast({forcastWeather}) {
  return (
    <div className='forcast-main'>
      {/* <HourlyForcast hourlyForcast={forcastWeather.hourly}/> */}
      <div>
            <div className='forcast-heading'>
                <p>Hourly Forcast</p>
            </div>
            <hr />
            <ForcastData/>
        </div>
      <br />
      <br />
      {/* <DailyForcast dailyForcast={forcastWeather.daily}/> */}
      <div>
            <div className='forcast-heading'>
                <p>Daily Forcast</p>
            </div>
            <hr />
            <ForcastData/>
        </div>
    </div>
  )
}

export default DayWeekForcast
