const axios = require('axios');
const dotenv = require('dotenv');
const convertKelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);
dotenv.config();
const apiKey = process.env.OPENWEATHER_API_KEY;

const getCityWeather = async (city) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );

        // Extracting necessary information from API response
        const weatherData = response.data.list.map(item => ({
            date: item.dt_txt,
            temp: convertKelvinToCelsius(item.main.temp),
            temp_min: convertKelvinToCelsius(item.main.temp_min),
            temp_max: convertKelvinToCelsius(item.main.temp_max),
            weather: item.weather[0].main,
            description: item.weather[0].description,
            wind_speed: item.wind.speed,
            humidity: item.main.humidity,
            visibility: item.visibility,
        }));

        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Unable to retrieve weather data');
    }
};

module.exports = { getCityWeather };
