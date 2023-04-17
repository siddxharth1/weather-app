import React from 'react'
import './DayWeekForcast.css'

function HourlyForcast() {
    return (
        <div>
            <div className='forcast-heading'>
                <p>Hourly Forcast</p>
            </div>
            <hr />

            <div className='hourly-forcast-main'>
                <div className='hourly-forcast'>
                    <p>08:00 PM</p>
                    <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt=''/>
                    <p>21&deg;</p>
                </div>
                <div className='hourly-forcast'>
                    <p>09:00 PM</p>
                    <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt=''/>
                    <p>21&deg;</p>
                </div>
                <div className='hourly-forcast'>
                    <p>10:00 PM</p>
                    <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt=''/>
                    <p>21&deg;</p>
                </div>
                <div className='hourly-forcast'>
                    <p>11:00 PM</p>
                    <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt=''/>
                    <p>21&deg;</p>
                </div>
                <div className='hourly-forcast'>
                    <p>12:00 PM</p>
                    <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt=''/>
                    <p>21&deg;</p>
                </div>
            </div>
        </div>
    )
}

export default HourlyForcast
