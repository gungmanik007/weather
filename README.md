# Weather Dashboard

A simple, responsive weather dashboard web application built with vanilla HTML, CSS, and JavaScript. Get current weather information for any city in the world.

## Features

- 🌍 Search weather by city name
- 🌡️ Real-time temperature display
- 💧 Humidity, wind speed, pressure, and visibility
- 🎨 Beautiful gradient UI with smooth animations
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ No API key required (uses Open-Meteo free API)
- 🚀 Lightweight and fast

## Project Structure

```
weather/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styling
├── js/
│   └── app.js          # JavaScript logic
└── README.md           # This file
```

## Tech Stack

- **HTML5** - Markup structure
- **CSS3** - Styling with gradients and animations
- **JavaScript (Vanilla)** - No frameworks or build tools needed
- **Open-Meteo API** - Free weather data
- **Geocoding API** - City name to coordinates conversion

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Enter a city name and click "Search"

### Alternative: Using a Local Server

For better development experience, run a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
http-server
```

Then visit: `http://localhost:8000`

## Deploying to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new public repository named `your-username.github.io`
3. (Optional: If you want a different name, use a regular repo and enable Pages from settings)

### Step 2: Push Your Code

```bash
# Initialize Git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/your-username/your-username.github.io.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Weather Dashboard"

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Scroll to "GitHub Pages" section
3. Select "main" branch as source
4. Click "Save"
5. Your site will be live at: `https://your-username.github.io`

## API Information

This project uses:

- **Open-Meteo Weather API** - Free, no authentication required
  - Documentation: https://open-meteo.com/

- **Open-Meteo Geocoding API** - Convert city names to coordinates
  - Documentation: https://open-meteo.com/en/docs/geocoding-api

## Features Explained

### Search Functionality
- Enter any city name
- Press Enter or click Search
- Real-time API calls with error handling

### Weather Display
- Current temperature
- Weather condition with emoji icons
- Feels-like temperature
- Humidity, wind speed, pressure, visibility

### Responsive Design
- Works on mobile, tablet, and desktop
- Touch-friendly search button
- Smooth animations and transitions

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Weather data not loading?
- Check your internet connection
- Verify the city name is spelled correctly
- Check browser console for error messages (F12)

### Page looks broken?
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh the page (Ctrl+R or Cmd+R)
- Try a different browser

## Future Enhancements

- [ ] 5-day forecast
- [ ] Multiple city comparison
- [ ] Temperature unit toggle (°C/°F)
- [ ] Save favorite cities (localStorage)
- [ ] Weather alerts
- [ ] Sunrise/sunset times
- [ ] Geolocation for auto-detection

## License

Free to use and modify. No attribution required.

## Credits

- Weather data: [Open-Meteo](https://open-meteo.com/)
- Icons: Unicode emoji
- Design: Custom gradient UI

---

**Happy weather tracking! ⛅**
