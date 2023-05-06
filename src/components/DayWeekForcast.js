import React from 'react'
import ForcastData from './ForcastData'
import './css/DayWeekForcast.css'

function DayWeekForcast({ forcastWeather }) {
  return (
    <div className='forcast-main'>
      <ForcastData title={'Hourly Forcast'} ForcastData = {forcastWeather.hourly} />
      <br />
      <br />
      <ForcastData title={'Daily Forcast'} ForcastData = {forcastWeather.daily} />
    </div>
  )
}

export default DayWeekForcast
