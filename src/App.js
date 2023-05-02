import './App.css';
import Navbar from './components/Navbar';
import DataBody from './components/DataBody';
import getFormattedWeatherData from './services/weatherService'


function App() {  
  const fetchWeatherData = async()=>{
    const wdata = await getFormattedWeatherData({q:"surat", units: 'metric' })
    console.log(wdata)
  }
  fetchWeatherData()
  
  return (
    <div className='main'>
      <Navbar/>
      <DataBody/>
    </div>
  );
}

export default App;
