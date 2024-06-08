import express from 'express';
import Weather from '../models/Weather.js';

const router = express.Router();


router.post('/weather', async (req, res) => {
  const { city, country, temperature, conditionText, icon } = req.body;
  const newWeather = new Weather({ city, country, temperature, conditionText, icon });

  try {
    await newWeather.save();
    console.log('Data saved:', newWeather);
    res.status(201).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error.message);
    res.status(500).send('Error saving data');
  }
});

export default router;
