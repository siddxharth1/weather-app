import React from 'react'
import './DataBody.css'
import Weather from './Weather'
import DayWeekForcast from './DayWeekForcast'

function DataBody(weather) {
  return (
    <div className='weather-main'>
      <div className='heading'>
        <div className='greating'>
          Good Morning
        </div>
        <div className='date-time'>Tuesday, 31 May'22 | 12:46:20 PM</div>
      </div>

      <div className='weather-info'>
        <Weather/>
        <DayWeekForcast/>
      </div>

    </div>
  )
}

export default DataBody