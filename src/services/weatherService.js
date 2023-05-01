const API_KEY = "c4be0c8811c9d94722b0f8cb46eb7f4e"
const Base_URL = "https://api.openweathermap.org/data/2.5"

const accuWeatherApiKey = 'IivKY50fPmWgbjJ3TdCRgA5ylH1YZlR2';
const citySearchBaseURL = 'http://dataservice.accuweather.com/locations/v1/cities/search'; //for city search
const forcastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'

const getWeatherData = (infoType, searchParams) =>{
    const url = new URL(Base_URL+ "/" + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})
    return fetch(url).then((resp)=>resp.json());
}

const getLocationKey = async (searchParams) => {
    const cityURL = new URL(citySearchBaseURL);
    cityURL.search = new URLSearchParams({apikey: accuWeatherApiKey, ...searchParams})
    const cityResponse = await fetch(cityURL).then((resp)=>resp.json())
    return cityResponse[0].Key;
}

const getForcastData = async (searchParams) => {  
    const forcastDataURL = new URL(forcastURL+searchParams)
    forcastDataURL.search = new URLSearchParams({apikey: accuWeatherApiKey})
    const forcastResponse = await fetch(forcastDataURL).then((resp)=>resp.json())
    // console.log(forcastResponse)
    return forcastResponse.DailyForecasts;
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


    const locationKey = await getLocationKey(searchParams).then(locKey => locKey)
    const forcastData = await getLocationKey(searchParams).then(getForcast => {return getForcastData(locationKey)})
    
    console.log(forcastData)
    // console.log(locationKey)
    return formattedWeatherData;
}

export default getFormattedWeatherData;