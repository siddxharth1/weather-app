import React from 'react'
import HourlyForcast from './HourlyForcast'
import DailyForcast from './DailyForcast'

function DayWeekForcast({forcastWeather}) {
  return (
    <div className='forcast-main'>
      <HourlyForcast hourlyForcast={forcastWeather.hourly}/>
      <br />
      <br />
      <DailyForcast dailyForcast={forcastWeather.daily}/>
    </div>
  )
}

export default DayWeekForcast
