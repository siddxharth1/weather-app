const API_KEY = "c4be0c8811c9d94722b0f8cb46eb7f4e"
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
    const formattedWeatherData = await getWeatherData('weather', searchParams).then(data=>formatCurrentData(data));
    // const {lat, lon} = formatCurrentData;
    
    return formattedWeatherData;
}

export default getFormattedWeatherData;