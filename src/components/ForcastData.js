import React from 'react'
import './DayWeekForcast.css'

function ForcastData() {
  return (
      <div className='hourly-forcast-main'>
                <div className='hourly-forcast'>
                    <p>Wed</p>
                    <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt=''/>
                    <p>21&deg;</p>
                </div>
                <div className='hourly-forcast'>
                    <p>Thu</p>
                    <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt=''/>
                    <p>21&deg;</p>
                </div>
                <div className='hourly-forcast'>
                    <p>Fri</p>
                    <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt=''/>
                    <p>21&deg;</p>
                </div>
                <div className='hourly-forcast'>
                    <p>Sat</p>
                    <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt=''/>
                    <p>21&deg;</p>
                </div>
                <div className='hourly-forcast'>
                    <p>Sun</p>
                    <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt=''/>
                    <p>21&deg;</p>
                </div>
            </div>
  )
}

export default ForcastData