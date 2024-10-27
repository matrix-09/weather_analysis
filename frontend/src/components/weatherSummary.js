import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherSummary = () => {
    const [selectedCity, setSelectedCity] = useState('Delhi');
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        if (selectedCity) {
            fetchWeatherData(selectedCity);
        }
    }, [selectedCity]);

    const fetchWeatherData = async (city) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/weather/${city}`);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

    return (
        <div>
            <h2>Weather Data</h2>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>

            <div>
                {weatherData.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Temp (°C)</th>
                                <th>Min Temp (°C)</th>
                                <th>Max Temp (°C)</th>
                                <th>Weather</th>
                                <th>Description</th>
                                <th>Wind Speed (m/s)</th>
                                <th>Humidity (%)</th>
                                <th>Visibility (m)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weatherData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.temp}</td>
                                    <td>{item.temp_min}</td>
                                    <td>{item.temp_max}</td>
                                    <td>{item.weather}</td>
                                    <td>{item.description}</td>
                                    <td>{item.wind_speed}</td>
                                    <td>{item.humidity}</td>
                                    <td>{item.visibility}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default WeatherSummary;
