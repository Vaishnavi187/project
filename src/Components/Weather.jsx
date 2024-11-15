import React,{useState,useEffect} from 'react'
import { PiWindDuotone } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { MdOutlineWaves } from "react-icons/md";




const Weather = () => {
 const [CityName,SetCityName]=useState('London');
 const [WeatherData,setWeatherData]=useState("");

 const fetchWeatherData=async()=>{
    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CityName}&units=metric&appid=7218dd1dcbc28905a889ddb3db50e7a9`)
    let data=await response.json();
    setWeatherData(data);
    console.log(data);
    SetCityName("");
    

 }
 useEffect(()=>{
if(CityName)
    fetchWeatherData(CityName)
 },[])
  
const handlesubmittion=(e)=>{
    e.preventDefault();
    fetchWeatherData();
   
}

  return (
    <>
    <div className='flex flex-col  items-center min-h-screen w-full justify-center bg-gradient-to-r from-purple-700 to-indigo-600  p-5 '>
         <div className='bg-purple-950  p-6 sm:p-8  md:p-10 lg:p-12 w-full h-full text-center  transition-all duration-100 hover:scale-110 overflow-hidden sm:w-96 sm:h-4/6 md:w-96 md:h-11/16  '>
            <form onSubmit={handlesubmittion} >
                <input  className='w-full rounded-lg outline-none text-center p-2 sm:p-4  'type="text"  
                value={CityName}
                onChange={(e)=>SetCityName(e.target.value)}
                placeholder='Search here....' />

          <button className="btn btn-outline mt-2 rounded-2xl"><FaSearch/></button>

            </form>
             
                    {WeatherData && (
          <div>
            
            <img src={`https://openweathermap.org/img/wn/${WeatherData.weather[0].icon}@2x.png`} className='mx-auto w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24' alt="" />
          
            <div className="text-4xl sm:text-5xl md:text-6xl  font-bold text-white mb-2 mt-5">
            {Math.round(WeatherData.main.temp)}°C
            </div>
            <div className="text-lg sm:text-2xl md:text:3xl  text-gray-300 mb-4 mt-5 font-bold">{WeatherData.name}</div>
            <div className="flex justify-around text-gray-300">
              
             <div className='mt-6 ml-6 text-2xl'> <MdOutlineWaves /></div>
             <div>
                <p className="text-lg sm:text-xl md:text-2xl mt-5">
                {WeatherData.main.humidity}%</p>
                <p className="text-sm font-semibold ">Humidity</p>
              </div>
             

             <div className='mt-6  ml-6 text-2xl  '> <PiWindDuotone /></div>
             <div>
                <p className="text-lg sm:text-xl md:text-2xl mt-5">
                {Math.round(WeatherData.wind.speed)} km/h</p>
                <p className="text-sm font-semibold">Wind Speed</p>
              </div>
            </div>
          </div>
        )}
            </div> 

    </div>
      
    </>
  )
}

export default Weather


