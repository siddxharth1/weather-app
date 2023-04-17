import './App.css';
import Navbar from './components/Navbar';
import DataBody from './components/DataBody';
import getWeatherData from './services/weatherService'
function App() {
  
  const fetchWeatherData = async()=>{
    const wdata = await getWeatherData("weather", {q:"delhi"})
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
