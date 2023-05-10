import React from 'react'
import './css/DayWeekForcast.css'
import images from './images'

function ForcastData({ title, forcastData, displayUnit}) {
    // const imageCode = forcastData;
    // console.log(imageCode)
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
                            <img className='forcast-image' src={images[item.icon]} alt='' title={item.info} />
                            <p>{item.temp}{displayUnit.tempUnit} </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ForcastData