import React from 'react'
import './DayWeekForcast.css'
import ForcastData from './ForcastData'

function HourlyForcast() {
    return (
        <div>
            <div className='forcast-heading'>
                <p>Hourly Forcast</p>
            </div>
            <hr />
            <ForcastData/>
        </div>
    )
}

export default HourlyForcast
