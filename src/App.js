import './App.css';
import Navbar from './components/Navbar';
import DataBody from './components/DataBody';
import getFormattedWeatherData from './services/weatherService'
import { useEffect, useState } from 'react';
import Skeleton from './components/Skeleton'

function App() {
  // const fetchWeatherData = async()=>{
  //   const allDatas = await getFormattedWeatherData({q:"surat", units: 'metric' })
  //   console.log(allDatas)
  // }
  // fetchWeatherData()

  let lat, lon

  const getLoc = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude
          lon = position.coords.longitude
          resolve({ lat, lon });
        }, showError)
      }

      function showError(error) {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            alert("Location access is turned off so it will show you the default location")
            setQuery({q: 'Delhi'})
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.")
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.")
            break;
        }
      }
    });
  }


  const [query, setQuery] = useState(() => {
    const initialLat = 0;
    const initialLon = 0;
  
    const fetchCoordinates = async () => {
      try {
        const coordinates = await getLoc();
        if(coordinates.lat === undefined){
          setQuery({lat: 28.7041, lon: coordinates.lon});
        }
        else{
          setQuery({ lat: coordinates.lat, lon: 77.1025 });
        }
      } catch (error) {
        console.error("Error getting coordinates:", error);
      }
    };
    fetchCoordinates();
    return { lat: initialLat, lon: initialLon };
  })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  const [isLoading, setLoad] = useState(true)

  useEffect(() => {
    setLoad(true)
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setLoad(false)
        setWeather(data)
      })
    }
    if((query.lat !== '' && query.lon !== '') || query.q !== ''){
      if((query.lat !== 0 && query.lon !== 0)){
        fetchWeather()
        // console.log(query)
      }
    }
  }, [query, units])

  return (
    <div className='main'>

      <Navbar setQuery={setQuery} />
      {/* {weather ? <DataBody weatherData={weather} units={units} setUnits={setUnits} /> : <div style={{color:'white', fontSize:50, margin:'100px 40%'}}> fetching data...</div>} */}
      {isLoading ? <Skeleton/> : <DataBody weatherData={weather} units={units} setUnits={setUnits} />}
      {/* <DataBody weatherData={weather} units={units} setUnits={setUnits} /> */}
    </div>
  );
}

export default App;