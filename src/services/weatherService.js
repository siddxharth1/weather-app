//time API
const timeBaseURL = 'https://api.ipgeolocation.io/timezone'
const timeAPI = '073d8aa2e34c441fb5de245741b4cf2a'

//openWeatherApi
const API_KEY = "c4be0c8811c9d94722b0f8cb46eb7f4e"
const Base_URL = "https://api.openweathermap.org/data/2.5"

//accuweatherApi
const accuWeatherApiKey = 'IivKY50fPmWgbjJ3TdCRgA5ylH1YZlR2';
const citySearchBaseURL = 'http://dataservice.accuweather.com/locations/v1/cities/search'; //for city search
const dailyForcastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' //daily forcast
const hourlyForcastURL = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' //hourly forcast

const getTime = (searchParams) => {
    const url = new URL(timeBaseURL);
    url.search = new URLSearchParams({ apiKey: timeAPI, ...searchParams })
    return fetch(url).then((resp) => resp.json());
}

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(Base_URL + "/" + infoType)
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })
    return fetch(url).then((resp) => resp.json());
}

const getLocationKey = async (searchParams) => {
    const cityURL = new URL(citySearchBaseURL);
    cityURL.search = new URLSearchParams({ apikey: accuWeatherApiKey, ...searchParams })
    const cityResponse = await fetch(cityURL).then((resp) => resp.json())
    const cityRequired = cityResponse[0]

    function getIdZone(data) {
        const { Key, TimeZone: { Name } } = data
        // console.log(Key, Name)
        return { Key, Name }
    }
    const keyName = getIdZone(cityRequired)
    // console.log(keyName)
    return keyName;
}

const getDailyForcastData = async (searchParams) => {
    const dailyForcastDataURL = new URL(dailyForcastURL + searchParams)
    dailyForcastDataURL.search = new URLSearchParams({ apikey: accuWeatherApiKey })
    const forcastResponse = await fetch(dailyForcastDataURL).then((resp) => resp.json())
    // console.log(forcastResponse)
    return forcastResponse.DailyForecasts;
}

const getHourlyForcastData = async (searchParams) => {
    const hourlyForcastDataURL = new URL(hourlyForcastURL + searchParams)
    hourlyForcastDataURL.search = new URLSearchParams({ apikey: accuWeatherApiKey })
    const hourlyForcastResponse = await fetch(hourlyForcastDataURL).then((resp) => resp.json())
    // console.log(hourlyForcastResponse);
    return hourlyForcastResponse;
}
const formatCurrentData = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        name,
        weather,
        wind: { speed },
        dt,
        sys: { country, sunrise, sunset },
        cod
    } = data

    const { main: weatherDesc, icon } = weather[0]

    return { lat, lon, temp, feels_like, temp_min, temp_max, pressure, humidity, name, speed, dt, country, sunrise, sunset, cod, weatherDesc, icon }
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedWeatherData = await getWeatherData('weather', searchParams).then(data => formatCurrentData(data));
    // const {lat, lon} = formatCurrentData;


    // const locationKey = await getLocationKey(searchParams).then(locKey => locKey)
    const locationKey = await getLocationKey(searchParams)
    console.log(locationKey)
    const dailyForcastData = await getDailyForcastData(locationKey.Key)
    const hourlyForcastData = await getHourlyForcastData(locationKey.Key)
    
    // const date_time = await getTime(searchParams.q)
    // console.log(date_time)

    console.log(dailyForcastData)
    console.log(hourlyForcastData)
    

    
    return formattedWeatherData;
}

export default getFormattedWeatherData;