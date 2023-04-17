import React from 'react'
import HourlyForcast from './HourlyForcast'
import DailyForcast from './DailyForcast'

function DayWeekForcast() {
  return (
    <div className='forcast-main'>
      <HourlyForcast/>
      <br />
      <br />
      <DailyForcast/>
    </div>
  )
}

export default DayWeekForcast
