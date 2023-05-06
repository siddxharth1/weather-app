import './App.css';
import Navbar from './components/Navbar';
import DataBody from './components/DataBody';
import getFormattedWeatherData from './services/weatherService'
import { useEffect, useState } from 'react';


function App() {  
  
  const fetchWeatherData = async()=>{
    const wdata = await getFormattedWeatherData({q:"surat", units: 'metric' })
    console.log(wdata)
  }
  fetchWeatherData()

  const [query, setQuery] = useState({ q: "surat" })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data)=>{
        setWeather(data)
      })
    }
    fetchWeather()
  }, [query, units])

  return (
    <div className='main'>
      <Navbar setQuery={setQuery}/>
      {weather ? <DataBody weatherData={weather} /> : <div style={{color:'white', fontSize:50, margin:'100px 40%'}}> fetching data...</div>}
      
    </div>
  );
}

export default App;