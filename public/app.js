import { showError } from './sweetAlert2.js';

// API onfigurations
const CONFIGS = {
  apiKey: '',
  baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
};

class WeatherApp {
  constructor (apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.searchForm = document.getElementById('weatherForm');
    this.searchInput = document.getElementById('citySearch');
  }

  // Build API URL
  getWeatherUrl () {
    const city = this.searchInput.value.trim();
    const params = new URLSearchParams({
      q: city,
      appid: this.apiKey,
      units: 'imperial'
    });

    const url = new URL(`${this.baseUrl}?${params}`);
    return url;
  }

  // Initialize weather search
  initWeatherSearch (callback) {
    this.searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(this.getWeatherUrl());

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Ciudad no encontrada');
        }

        const weatherData = await response.json();
        callback(weatherData);
      } catch (error) {
        // Show error in UI and log to console
        console.warn(error);
        showError(error.message);
      }
    });
  }

  // Update screen with weather data
  updateScreen () {
    this.initWeatherSearch((data) => {
      const iconCode = data.weather[0].icon;
      document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById('weatherTemp').textContent = `${Math.round(data.main.temp)}°F`; // temperature
      document.getElementById('weatherDescription').textContent = data.weather[0].description;
      document.getElementById('weatherHumidity').textContent = `${data.main.humidity}%`;
      document.getElementById('weatherWind').textContent = `${data.wind.speed}mph`;
    });
  }
}

// Create an instance of WeatherApp and update the screen
const myWeatherApp = new WeatherApp(CONFIGS.apiKey, CONFIGS.baseUrl);
myWeatherApp.updateScreen();
