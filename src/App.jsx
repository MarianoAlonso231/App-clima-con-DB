import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import { darkTheme } from "./theme";
import "./index.css";


const API_KEY = "14f7fc2340f6435baad03803240906";
const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&lang=es&q=`;

export default function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ error: false, message: "" });
    setLoading(true);

    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };

      const res = await fetch(API_WEATHER + city);
      const data = await res.json();

      if (data.error) {
        throw { message: data.error.message };
      }

      const weatherData = {
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      };

      setWeather(weatherData);

      const response = await axios.post(
        "http://localhost:5001/api/weather",
        weatherData
      );
      console.log("Response from server:", response.data);
    } catch (error) {
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xs" className="container">
        <Typography variant="h4" component="h1" className="title">
          App Clima
        </Typography>
        <Box
          sx={{ display: "grid", gap: 2 }}
          component="form"
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            id="city"
            label="Ciudad"
            variant="outlined"
            size="small"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={error.error}
            helperText={error.message}
            className="textField"
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            loadingIndicator="Buscando..."
            className="loadingButton"
          >
            Buscar
          </LoadingButton>
        </Box>
        {weather && <WeatherCard weather={weather} />}
        <Typography className="footer">
          Powered by:{" "}
          <a href="https://www.weatherapi.com/" title="Weather API">
            WeatherAPI.com
          </a>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
