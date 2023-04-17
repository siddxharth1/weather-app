import React from 'react'
import './Weather.css'
import images from './images'
// import pic from './images/sunny.svg'

function Weather() {
    return (
        <div className='main-weather'>
            <div className='blur'>

                <div className='loc-unit'>
                    <div className='location'>
                        <i className='bi bi-geo-alt' />
                        <p>Delhi, India</p>
                    </div>

                    <div>
                        &deg;C/&deg;F
                    </div>

                </div>
                <div className='weather-details'>
                    <div className='temp'>23&deg;C</div>
                    <div className='info'>
                        {/* <img className='image' src={pic}/> */}
                        {/* <img className='image' src={(require('./images/sunny.svg')).default}/> */}
                        <img className='image' src={images.sunny} alt='img' />
                        <p className='about'>Sunny</p>
                    </div>
                </div>
                <div>
                    <div className='more-abt-weather'>
                        <div className='more-info'>
                            <i className="bi bi-thermometer-half"></i>
                            Real felt:<span>32&deg;</span>
                        </div>
                        |
                        <div className='more-info'>
                            <i className="bi bi-droplet"></i>
                            Humidity:<span>32%</span>
                        </div>
                        |
                        <div className='more-info'>
                            <i className="bi bi-wind"></i>
                            Wind:<span>32 km/h</span>
                        </div>
                    </div>
                    <div className='moreinfo'>
                        <div className='high-low'>
                            <div className='more-info'>
                                <i className="bi bi-thermometer-sun"></i>High:<span>33&deg;</span>
                            </div>
                            <div className='more-info'>
                                <i className="bi bi-thermometer-snow"></i>Low:<span>23&deg;</span>
                            </div>
                        </div>
                        <div className='sunrise-set'>
                            <div className='circle'></div>
                            <div className='sun-rise-set'>
                                <div>
                                <i className="bi bi-sunrise"></i> <span>6:30AM</span>
                                </div>
                                <div>
                                <span>6:30PM</span><i className="bi bi-sunset"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather