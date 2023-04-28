const API_KEY = "3bd80e7ef93fd3c5006de5547db8d6d7"
const Base_URL = "https://api.openweathermap.org/data/2.5"

const getWeatherData = (infoType, searchParams) =>{
    const url = new URL(Base_URL+ "/" + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})
    return fetch(url).then((resp)=>resp.json());
}

const formatCurrentData =(data)=>{
    const {
        coord:{lat, lon},
        main:{temp, feels_like, temp_min, temp_max, pressure, humidity},
        name,
        weather,
        wind:{speed}, 
        dt,
        sys:{country, sunrise, sunset},
        cod
    } = data

    const {main: weatherDesc, icon} = weather[0]

    return{lat, lon, temp, feels_like, temp_min, temp_max, pressure, humidity, name, speed, dt, country, sunrise, sunset,cod, weatherDesc, icon}
}

const getFormattedWeatherData = async (searchParams)=>{
    const formattedWeatherData = await getWeatherData('weather', searchParams).then(data=>formatCurrentData(data))
}

export default getWeatherData;