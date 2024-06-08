import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const WeatherCard = ({ weather }) => (
  <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 3 }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="h5" component="h2">
        {weather.city}, {weather.country}
      </Typography>
      <Box component="img" alt={weather.conditionText} src={weather.icon} sx={{ margin: '0 auto', width: '100px', height: '100px' }} />
      <Typography variant="h6" component="h3">
        {weather.temperature} °C
      </Typography>
      <Typography variant="subtitle1" component="h4">
        {weather.conditionText}
      </Typography>
    </CardContent>
  </Card>
);

export default WeatherCard;
