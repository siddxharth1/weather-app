import './css/Skeleton.css'
const Skeleton = () => {
    return (
        <div className="weather-main-skeleton">
            <div className="heading-skeleton">
                <div className="greeting-date-time-skeleton"></div>
                <div className="greeting-date-time-skeleton"></div>
            </div>
            <div className="weather-info-skeleton">
                <div className="main-weather-skeletn">
                    
                </div>


                <div className="forcast-main-skeleton">
                    {/* <div>
                        <div className="heading-forcast-skeleton"></div>
                        <hr />
                        <div className="hourly-forcast-main-skeleton"></div>
                        <br />
                        <br />

                        <div className="heading-forcast-skeleton"></div>
                        <hr />
                        <div className="hourly-forcast-main-skeleton"></div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Skeleton
