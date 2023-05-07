import React from 'react'
import './css/DayWeekForcast.css'

function ForcastData({ title, forcastData, displayUnit}) {
    return (
        <div>
            <div className='forcast-heading'>
                <p>{title} </p>
            </div>

            <hr />

            <div className='hourly-forcast-main'>
                {
                    forcastData.map((item, i) => (
                        <div className='hourly-forcast' key={i}>
                            <p>{item.title} </p>
                            <img className='forcast-image' src={(require('./images/sunny.svg')).default} alt='' />
                            <p>{item.temp}{displayUnit.tempUnit} </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ForcastData