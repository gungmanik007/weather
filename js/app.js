// Weather API Configuration
const API_KEY = '63b34358171529820c51deef2b3b548b';
const API_BASE = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

async function handleSearch() {
    const cityName = searchInput.value.trim();
    if (!cityName) return;

    const url = `${API_BASE}?q=${encodeURIComponent(cityName)},ID&appid=${API_KEY}&units=metric&lang=id`;
    
    const res = await fetch(url);
    const data = await res.json();

    // Icon cuaca otomatis tersedia
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Get city coordinates from city name
async function getCoordinates(cityName) {
    try {
        const response = await fetch(
            `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
        );
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return null;
        }

        const result = data.results[0];
        return {
            latitude: result.latitude,
            longitude: result.longitude,
            name: result.name,
            country: result.country
        };
    } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
    }
}

// Fetch weather data for coordinates
async function getWeatherData(coordinates) {
    try {
        const params = new URLSearchParams({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            current: 'temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility',
            timezone: 'auto'
        });

        const response = await fetch(`${API_BASE}?${params}`);
        const data = await response.json();

        if (!data.current) {
            throw new Error('Invalid weather data received');
        }

        return {
            coordinates,
            current: data.current,
            timezone: data.timezone
        };
    } catch (error) {
        console.error('Weather API error:', error);
        throw error;
    }
}

// Display weather information
function displayWeather(weatherData, originalCityName) {
    const { current, coordinates, timezone } = weatherData;

    // Get weather description from weather code
    const weatherDescription = getWeatherDescription(current.weather_code);
    
    // Update DOM elements
    document.getElementById('cityName').textContent = 
        `${coordinates.name}, ${coordinates.country}`;
    
    document.getElementById('date').textContent = 
        new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

    document.getElementById('temp').textContent = 
        Math.round(current.temperature_2m);

    document.getElementById('description').textContent = 
        weatherDescription;

    document.getElementById('feelsLike').textContent = 
        `Feels like ${Math.round(current.apparent_temperature)}°C`;

    document.getElementById('humidity').textContent = 
        `${current.relative_humidity_2m}%`;

    document.getElementById('windSpeed').textContent = 
        `${Math.round(current.wind_speed_10m)} km/h`;

    document.getElementById('pressure').textContent = 
        `${current.pressure_msl} mb`;

    document.getElementById('visibility').textContent = 
        `${(current.visibility / 1000).toFixed(1)} km`;

    // Set weather icon
    setWeatherIcon(current.weather_code, current.temperature_2m);

    // Show weather container
    weatherContainer.classList.remove('hidden');
}

// Get weather description from WMO weather code
function getWeatherDescription(code) {
    const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };

    return weatherCodes[code] || 'Unknown';
}

// Set weather icon based on weather code
function setWeatherIcon(code, temperature) {
    const iconElement = document.getElementById('weatherIcon');
    let emoji = '🌤️';

    if (code === 0 || code === 1) {
        emoji = temperature > 20 ? '☀️' : '🌤️';
    } else if (code === 2) {
        emoji = '⛅';
    } else if (code === 3) {
        emoji = '☁️';
    } else if (code === 45 || code === 48) {
        emoji = '🌫️';
    } else if (code >= 51 && code <= 67) {
        emoji = '🌧️';
    } else if (code >= 71 && code <= 86) {
        emoji = '❄️';
    } else if (code >= 95 && code <= 99) {
        emoji = '⛈️';
    }

    iconElement.textContent = emoji;
    iconElement.style.fontSize = '80px';
}

// Error handling
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

// Loading indicator
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('hidden');
        weatherContainer.classList.add('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// Load weather for default city on page load
window.addEventListener('load', () => {
    searchInput.value = 'London';
    handleSearch();
});
