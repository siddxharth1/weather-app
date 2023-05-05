import './App.css';
import Navbar from './components/Navbar';
import DataBody from './components/DataBody';
import getFormattedWeatherData from './services/weatherService'
import { useEffect, useState } from 'react';


function App() {  
  
  const fetchWeatherData = async()=>{
    const wdata = await getFormattedWeatherData({q:"delhi", units: 'metric' })
    console.log(wdata)
  }
  fetchWeatherData()

  const [query, setQuery] = useState({ q: "delhi" })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      await getFormattedWeatherData({ query, units }).then((data)=>{
        setWeather(data)
      })
    }
    // fetchWeatherData({ query, units })
  }, [query, units])

  return (
    <div className='main'>
      <Navbar/>
      <DataBody />
    </div>
  );
}

export default App;