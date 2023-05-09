import React from 'react'
import './css/Weather.css'
import images from './images'
import { DateTime } from "luxon";
// import pic from './images/sunny.svg'

function Weather({ currentWeather, displayUnit }) {
    const formatToLocalTime = (secs, zone, format) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)
    const sunriseTime = formatToLocalTime(currentWeather.currentData.sunrise, currentWeather.locInfo.Name, 'hh:mma')
    const sunsetTime = formatToLocalTime(currentWeather.currentData.sunset, currentWeather.locInfo.Name, 'hh:mma')
    // console.log(currentWeather.currentData.icon)
    const imageCode = currentWeather.currentData.currentIcon
    return (

        <div>
            <div className='weather-details'>
                <div className='temp'>{currentWeather.currentData.currentTemp}&deg;{displayUnit.tempUnit}</div>
                <div className='info'>
                    {/* <img className='image' src={pic}/> */}
                    {/* <img className='image' src={(require('./images/sunny.svg')).default}/> */}
                    <img className='image' src={images[imageCode]} alt='img' />
                    <p className='about'>{currentWeather.currentData.weatherDesc}</p>
                </div>
            </div>
            <div>
                <div className='more-abt-weather'>
                    <div className='more-info'>
                        <i className="bi bi-thermometer-half"></i>
                        Real felt:<span>{currentWeather.currentData.real_feel}&deg;{displayUnit.tempUnit}</span>
                    </div>
                    |
                    <div className='more-info'>
                        <i className="bi bi-droplet"></i>
                        Humidity:<span>{currentWeather.currentData.humidity}%</span>
                    </div>
                    |
                    <div className='more-info'>
                        <i className="bi bi-wind"></i>
                        Wind:<span>{currentWeather.currentData.speed} {displayUnit.speedUnit} </span>
                    </div>
                </div>
                <div className='moreinfo'>
                    <div className='high-low'>
                        <div className='more-info'>
                            <i className="bi bi-thermometer-sun"></i>High:<span>{currentWeather.currentData.max_temp} &deg;C</span>
                        </div>
                        <div className='more-info'>
                            <i className="bi bi-thermometer-snow"></i>Low:<span>{currentWeather.currentData.min_temp} &deg;C</span>
                        </div>
                    </div>
                    <div className='sunrise-set'>
                        <div className='circle'></div>
                        <div className='sun-rise-set'>
                            <div className='rowFlex'>
                                <i className="bi bi-sunrise"></i> <span>{sunriseTime} </span>
                            </div>
                            &nbsp;
                            <div className='rowFlex endDisplay'>
                                <i className="bi bi-sunset"></i><span>{sunsetTime} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather