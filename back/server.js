const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');
const cron = require('node-cron');
const cors = require('cors'); 

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Your frontend React app's URL (adjust the port if necessary)
    methods: ['GET', 'POST'], // Define allowed HTTP methods
    credentials: true          // Allow cookies (if needed)
}));

connectDB();

app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

cron.schedule('*/5 * * * *', () => {
    weatherService.getWeather();
});

