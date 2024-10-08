import { DateTime } from "luxon";

//----------------------------------------------API-------------------------------------------------------------
//time API
const timeUrl = 'http://worldtimeapi.org/api/timezone/'

//openWeatherApi
// const API_KEY = "c4be0c8811c9d94722b0f8cb46eb7f4e"
const API_KEY = process.env.REACT_APP_OPENWEATHER_APIKEY
const Base_URL = "https://api.openweathermap.org/data/2.5"


//accuweatherApi
// const accuWeatherApiKey = '8j7t0np4nHcDaTHN6tXFt4eJc8AWJ2ZT';
const accuWeatherApiKey = process.env.REACT_APP_ACCUWEATHER_APIKey
const accuWeatherApiKey2 = process.env.REACT_APP_ACCUWEATHER_APIKey2
const citySearchBaseURL = 'http://dataservice.accuweather.com/locations/v1/cities/search'; //for city search
const dailyForcastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' //daily forcast
const hourlyForcastURL = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' //hourly forcast
const currentURL = 'http://dataservice.accuweather.com/currentconditions/v1/'

//unsplashApi
const unsplashApi = process.env.REACT_APP_UNSPLASH_APIKey
const baseUnsplashUrl = 'https://api.unsplash.com/search/photos'

const getBackgroundImg = async (cityName) => {
    const url = new URL(baseUnsplashUrl)
    url.search = new URLSearchParams({ client_id: unsplashApi, query: cityName })
    const imageData = await fetch(url).then((resp) => resp.json());
    const imageUrl = imageData.results[0].urls.full
    return (imageUrl)
}

//---------------------------------Time------------------------------------
//-------------------------------formatting dates using luxon--------------------------------------
const formatToLocalTime = (secs, zone, format) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

//returning current time date according to timezone(searchParams)(kolkata/india)
const getTime = async (searchParams) => {
    const url = new URL(timeUrl + searchParams);
    const time = await fetch(url).then((resp) => resp.json())
    // console.log(time)
    const displayTime = formatToLocalTime(time.unixtime, searchParams, "cccc, dd LLL yyyy' |' hh:mm:ss a")
    const time_hour = formatToLocalTime(time.unixtime, searchParams, 'HH')

    // return {time_24_format:time.time_24, displayTime }
    return { time_hour, displayTime, timeSecs: time.unixtime }
}

//-----------------------------------{locationKey, timezone, cityName, CountryName, StateName}---------------------
//returning locationKey and timeZone required for forcast data and current time
const getLocationKey = async (searchParams) => {
    let cityRequired
    if (!searchParams.q) {
        if (searchParams.lat !== 0 && searchParams.lon !== 0) {
            // console.log(searchParams.lat+","+searchParams.lon)
            const stateNameUrlForLocationKey = new URL('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search')
            stateNameUrlForLocationKey.search = new URLSearchParams({ apikey: accuWeatherApiKey, q: (searchParams.lat + "," + searchParams.lon) })
            cityRequired = await fetch(stateNameUrlForLocationKey).then((resp) => resp.json())
            // console.log(cityRequired)
        }
    } else {
        const cityURL = new URL(citySearchBaseURL);
        cityURL.search = new URLSearchParams({ apikey: accuWeatherApiKey, q: searchParams.q })
        let cityResponse = await fetch(cityURL).then((resp) => resp.json())
        cityRequired = cityResponse[0] //we will get all the city name matches our search so we will pick the first one which is most relevent and used
        // console.log(cityRequired)
    }

    //destructuring key and timezone
    async function getIdZone(data) {
        const { Key, TimeZone: { Name }, EnglishName: cityName, AdministrativeArea: { LocalizedName: stateName }, Country: { EnglishName: countryName } } = data
        const location = cityName + ', ' + stateName + ', ' + countryName
        return { Key, Name, location, cityName }
    }
    const keyName = await getIdZone(cityRequired) //storing Key, timeZone as Name, cityName, countryName, stateName in keyName variable
    return keyName;
}


//----------------------------weather data--------------------------------------------

// current weather icon using accuweather 
const getWeatherIcon = async (locKey) => {
    const url2 = new URL(currentURL + locKey)
    url2.search = new URLSearchParams({ apikey: accuWeatherApiKey2 })
    let iconData = await fetch(url2).then((resp) => resp.json())
    // console.log(iconData[0])
    const icon = iconData[0].WeatherIcon
    const iconDesc = iconData[0].WeatherText
    return ({ icon, iconDesc })
}

//returning all the current weather data openWeatherAPI
const getWeatherData = (infoType, searchParams) => {
    const url = new URL(Base_URL + "/" + infoType)

    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })
    // console.log(url.search)
    return fetch(url).then((resp) => resp.json());
}

//formatting(destructuring) all the current data and returning all the required data as an object
const formatCurrentData = (data) => {
    const {
        main: { temp, feels_like, temp_min, temp_max, humidity },
        weather,
        wind: { speed },
        sys: { sunrise, sunset },
        cod
    } = data

    const { main: weatherDesc, icon } = weather[0]

    return { currentTemp: Math.round(temp), real_feel: Math.round(feels_like), min_temp: Math.round(temp_min), max_temp: Math.round(temp_max), humidity, speed, sunrise, sunset, cod, weatherDesc, icon }
}


//returning daily forcast data
const getDailyForcastData = async (searchParams, units) => {
    const dailyForcastDataURL = new URL(dailyForcastURL + searchParams.Key)
    dailyForcastDataURL.search = new URLSearchParams({ apikey: accuWeatherApiKey2, metric: units === 'metric' ? true : false })
    let forcastResponse = await fetch(dailyForcastDataURL).then((resp) => resp.json())
    let dailyData = forcastResponse.DailyForecasts

    const formatDailyForcastData = (dailyData) => {
        dailyData = dailyData.map((d) => {
            return {
                info: d.Day.IconPhrase,
                icon: d.Day.Icon,
                // date: d.Date,
                title: formatToLocalTime(d.EpochDate, searchParams.Name, 'ccc'),
                temp: Math.round(d.Temperature.Minimum.Value) + "°/" + Math.round(d.Temperature.Maximum.Value) + "°"
            }
        })
        return (dailyData)
    }
    let dailyForcastMain = formatDailyForcastData(dailyData);
    return dailyForcastMain;
}

//returning hourly forcast data
const getHourlyForcastData = async (searchParams, units) => {
    const hourlyForcastDataURL = new URL(hourlyForcastURL + searchParams.Key)
    hourlyForcastDataURL.search = new URLSearchParams({ apikey: accuWeatherApiKey2, metric: units === 'metric' ? true : false })
    let hourlyForcastResponse = await fetch(hourlyForcastDataURL).then((resp) => resp.json())
    // console.log(hourlyForcastResponse);

    //getting only required data 
    const formatHourlyForcastData = (hourlyForcastResponse) => {
        hourlyForcastResponse = hourlyForcastResponse.slice(1, 6).map((h) => {
            // console.log(searchParams.Name)

            return {
                temp: Math.round(h.Temperature.Value) + "°",
                icon: h.WeatherIcon,
                title: formatToLocalTime(h.EpochDateTime, searchParams.Name, 'hh:mm a'),
                info: h.IconPhrase
            }
        })
        return (hourlyForcastResponse)
    }
    let hourlyForcastMain = formatHourlyForcastData(hourlyForcastResponse);
    // console.log(hourlyForcastMain)
    return hourlyForcastMain;
}

let counter = 0
const autocompleteFn = async (input) => {
    const autocompleteURL = new URL('http://dataservice.accuweather.com/locations/v1/cities/autocomplete')
    autocompleteURL.search = new URLSearchParams({ apikey: accuWeatherApiKey2, q: input })
    let autocompleteResponse = await fetch(autocompleteURL).then((resp) => resp.json())
    // console.log(autocompleteResponse)
    // console.log("fetching ", counter++)

    const formatAutocompleteResponse = () => {
        autocompleteResponse = autocompleteResponse.map((a) => {
            return {
                city: a.LocalizedName,
                state: a.AdministrativeArea.LocalizedName,
                country: a.Country.ID
            }
            // return{autocompleteResponse.LocalizedName+", " + autocompleteResponse.AdministrativeArea.LocalizedName+ ", " + autocompleteResponse.Country.LocalizedName}
        })
        return autocompleteResponse
    }
    let autocompleteData = formatAutocompleteResponse(autocompleteResponse)
    // console.log(autocompleteData)
    return autocompleteData
}

//-------------getting all the data from the following function---------------------

//here we will call all the functions required and return all the values
const getFormattedWeatherData = async (searchParams) => {
    // console.log(searchParams)
    const formattedWeatherData = await getWeatherData('weather', searchParams).then(data => formatCurrentData(data));

    // console.log(formattedWeatherData)

    const locationInfo = await getLocationKey(searchParams)
    // console.log(locationInfo.cityName)
    const currentIcon = await getWeatherIcon(locationInfo.Key);
    const backgroundImageUrl = await getBackgroundImg(locationInfo.cityName)
    // const backgroundImageUrl= await getBackgroundImg(formattedWeatherData.weatherDesc)
    // console.log(backgroundImageUrl)


    const dailyForcastData = await getDailyForcastData(locationInfo, searchParams.units)
    const hourlyForcastData = await getHourlyForcastData(locationInfo, searchParams.units)
    // console.log(dailyForcastData)
    // console.log(hourlyForcastData)

    const date_time = await getTime(locationInfo.Name)
    // console.log(date_time)

    const finalData = { daily: [...dailyForcastData], hourly: [...hourlyForcastData], date_time, locInfo: { ...locationInfo }, currentData: { ...formattedWeatherData, iconId: currentIcon.icon, iconDesc: currentIcon.iconDesc }, backgroundImageUrl }
    // console.log(finalData)

    return finalData;
}


export default getFormattedWeatherData;
export { getTime }
export { formatToLocalTime }
export { autocompleteFn }