import './App.css';
import Navbar from './components/Navbar';
import DataBody from './components/DataBody';
import getFormattedWeatherData from './services/weatherService'
import { useEffect, useState } from 'react';


function App() {

  const fetchWeatherData1 = async()=>{
    const dataa = await getFormattedWeatherData({q:'delhi', units:'metric'})
    console.log(dataa)
  }
  fetchWeatherData1()

  const [query, setQuery] = useState({ q: "delhi" })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      await getFormattedWeatherData({ query, units }).then((data)=>{
        setWeather(data)
      })
    }
    fetchWeatherData()
  }, [query, units])


  return (
    <div className='main'>
      <Navbar />
      <DataBody weather={weather} />
    </div>
  );
}

export default App;