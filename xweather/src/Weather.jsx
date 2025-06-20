import { useState,useEffect } from "react";
import "./weather.css"

function Weather(){
    const API_KEY = '86963b8e826b4f27a78111044252006';
    const [input,setInput] = useState('');
    const [weatherdata,setWeatherData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [fetchdata,SetFetchData] = useState(false);
  
    useEffect(()=>{
        if(!fetchdata){ return;}

        const getData = ()=>{
            setWeatherData(null);
            setLoader(true);
            fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input}`)
        .then(response=>response.json())
        .then(data =>{
            if(data.error){
                alert("Failed to fetch weather data");
                throw new Error("Falied to fetch data");
            } 
            setWeatherData(data);})
        .catch((e)=>{console.error(e);
        })
        .finally(()=>{
            setLoader(false);
            SetFetchData(false);
        }); 
        }
        getData();
    },[fetchdata,input])
  
    
    return(
        <>
        <div className="searchbox">
            <input value={input} onChange={(e)=>setInput(e.target.value)} type="text" required placeholder="Enter city name" />
            <button onClick={()=>SetFetchData(true)}>Search</button>
        </div>  
        {loader && <p style={{textAlign:"center"}}>Loading data ...</p>}
        {weatherdata && <div className="weather-cards">
            <div className="weather-card">
                <h4>Temperature</h4>
                <p>{weatherdata.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
                <h4>Humidity</h4>
                <p>{weatherdata.current.humidity}%</p>
            </div>
            <div className="weather-card">
                <h4>Condition</h4>
                <p>{weatherdata.current.condition.text}</p>
            </div>
            <div className="weather-card">
                <h4>Wind Speed</h4>
                <p>{weatherdata.current.wind_kph} kph</p>
            </div>
        </div> }
        
        
        </>
    )
}

export default Weather;