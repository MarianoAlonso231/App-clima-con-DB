import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  conditionText: String,
  icon: String,
});

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
