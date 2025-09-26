import weatherService from '../services/weatherService.js'
import countryService from "../services/countryService.js";
import {useEffect, useState} from "react";

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!country) {
            return;
        }
        weatherService.getWeather(country)
            .then(weather => {
                console.log(weather);
                setWeather(weather);
            })
    }, [country]);

    if (!country) {
        return null;
    }

    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature {weather.current.temp} Celsius</p>
            <p>Wind: {weather.current.wind_speed} m/s</p>
        </div>
    )
}

export default Weather