import React from 'react'
import './DayWeekForcast.css'
import ForcastData from './ForcastData'

function DailyForcast() {
    return (
        <div>
            <div className='forcast-heading'>
                <p>Daily Forcast</p>
            </div>
            <hr />
            <ForcastData/>
        </div>
    )
}

export default DailyForcast
