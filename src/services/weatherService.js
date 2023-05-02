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

//returning current time date according to timezone(searchParams)(kolkata/india)
const getTime = async (searchParams) => {
    const url = new URL(timeBaseURL);
    url.search = new URLSearchParams({ apiKey: timeAPI, ...searchParams })
    const time = await fetch(url).then((resp) => resp.json());
    return time.date_time_txt
}

//returning all the current weather data openWeatherAPI
const getWeatherData = (infoType, searchParams) => {
    const url = new URL(Base_URL + "/" + infoType)
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })
    return fetch(url).then((resp) => resp.json());
}

//returning locationKey and timeZone required for forcast data and current time
const getLocationKey = async (searchParams) => {
    const cityURL = new URL(citySearchBaseURL);
    cityURL.search = new URLSearchParams({ apikey: accuWeatherApiKey, ...searchParams })
    const cityResponse = await fetch(cityURL).then((resp) => resp.json())
    const cityRequired = cityResponse[0] //we will get all the city name matches our search so we will pick the first one which is most relevent and used

    //destructuring key and timezone
    function getIdZone(data) {
        const { Key, TimeZone: { Name } } = data
        // console.log(Key, Name)
        return { Key, Name }
    }
    const keyName = getIdZone(cityRequired) //storing key and name in keyName variable
    // console.log(keyName)
    return keyName;
}

//returning daily forcast data
const getDailyForcastData = async (searchParams) => {
    const dailyForcastDataURL = new URL(dailyForcastURL + searchParams)
    dailyForcastDataURL.search = new URLSearchParams({ apikey: accuWeatherApiKey })
    const forcastResponse = await fetch(dailyForcastDataURL).then((resp) => resp.json())
    // console.log(forcastResponse)
    return forcastResponse.DailyForecasts;
}

//returning hourly forcast data
const getHourlyForcastData = async (searchParams) => {
    const hourlyForcastDataURL = new URL(hourlyForcastURL + searchParams)
    hourlyForcastDataURL.search = new URLSearchParams({ apikey: accuWeatherApiKey })
    const hourlyForcastResponse = await fetch(hourlyForcastDataURL).then((resp) => resp.json())
    // console.log(hourlyForcastResponse);
    return hourlyForcastResponse;
}

//formatting(destructuring) all the current data and returning all the required data as an object
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


//here we will call all the functions required and return all the values
const getFormattedWeatherData = async (searchParams) => {
    const formattedWeatherData = await getWeatherData('weather', searchParams).then(data => formatCurrentData(data));

    const locationKey = await getLocationKey(searchParams)
    console.log(locationKey)

    const dailyForcastData = await getDailyForcastData(locationKey.Key)
    const hourlyForcastData = await getHourlyForcastData(locationKey.Key)
    console.log(dailyForcastData)
    console.log(hourlyForcastData)
    
    const date_time = await getTime(locationKey.Name)
    console.log(date_time)

    return formattedWeatherData;
}

export default getFormattedWeatherData;