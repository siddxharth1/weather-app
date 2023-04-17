const API_KEY = "3bd80e7ef93fd3c5006de5547db8d6d7"
const Base_URL = "https://api.openweathermap.org/data/2.5"

const getWeatherData = (infoType, searchParams) =>{
    const url = new URL(Base_URL+ "/" + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})
    return fetch(url).then((resp)=>resp.json());
}

export default getWeatherData;