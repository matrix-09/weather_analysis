const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.OPENWEATHER_API_KEY;

console.log(apiKey)