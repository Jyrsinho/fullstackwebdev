import axios from "axios";
import weather from "../components/Weather.jsx";

const baseURL = "https://api.openweathermap.org/data/3.0/onecall"
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (country) => {
    const cityLat = country.capitalInfo.latlng[0];
    const cityLon = country.capitalInfo.latlng[1];

    const request = axios.get(`${baseURL}?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${api_key}`)
    return request.then(response => response.data)
}

export default {
    getWeather
}