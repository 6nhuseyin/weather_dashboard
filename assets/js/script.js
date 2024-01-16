//

let openWeatherAPIKey = "7f9396ef9b0898f3254c073ab6d925be";

let city;

// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid" + openWeatherAPIKey;
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid" + openWeatherAPIKey;

// fetch(queryURL);


document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents page reload

    // Get the city from the input field
    city = document.getElementById('search-input').value;
    console.log(city);
    // Call function to fetch coordinates for the city
    fetchCoordinates(city);
});

function fetchCoordinates(city) {
    // Construct URL for Geocoding API
    var geocodeURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + openWeatherAPIKey;

    // Fetch the coordinates
    fetch(geocodeURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Assuming the first result is the desired one
            var lat = data[0].lat;
            var lon = data[0].lon;

            // Call function to fetch weather using these coordinates
            fetchWeather(lat, lon);
        });
}

function fetchWeather(lat, lon) {
    // Construct URL for Weather API
    var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + openWeatherAPIKey;

    // Fetch the weather data
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (weatherData) {
            // Log the entire forecast data
            console.log("Complete Forecast Data:", weatherData);
            handleCurrentWeatherData(weatherData);
            console.log(weatherData);
            // Call this function to process and display forecast data
            handleForecastData(weatherData);
        });
}


function handleCurrentWeatherData(weatherData) {
    // Assuming the first item in the list is the current weather
    var currentWeather = weatherData.list[0];

    // Log the current weather data to the console
    console.log("Current Weather Data:", currentWeather);

    // Convert temperature from Kelvin to Celsius (if API returns temperature in Kelvin)
    var temperatureCelsius = currentWeather.main.temp - 273.15;
    console.log("Current Temp:", temperatureCelsius);

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    console.log(dateOptions);
    var currentDate = new Date(currentWeather.dt * 1000).toLocaleDateString('en-GB', dateOptions);
    console.log(currentDate);
    // Update the #today section with current weather data
    var todaySection = document.getElementById('today');
    todaySection.className = 'today-weather';

    /* todaySection.innerHTML = `
     <h2>${weatherData.city.name} (${currentDate})</h2>
     <p>Temperature: ${temperatureCelsius.toFixed(1)} °C</p>
     <p>Humidity: ${currentWeather.main.humidity}%</p>
     <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
 `;*/
    
 todaySection.innerHTML = `
        <h2>${weatherData.city.name} (${currentDate})</h2>
        <div class="today-weather-details">
            <img src="https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png" alt="Weather Icon">
            <p>Temperature: ${temperatureCelsius.toFixed(1)} °C</p>
            <p>Humidity: ${currentWeather.main.humidity}%</p>
            <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
        </div>
            `;
        
    /* var weatherIconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;
     var weatherIconImg = document.createElement('img');
     weatherIconImg.src = weatherIconUrl;
     weatherIconImg.alt = 'Weather Icon';
     todaySection.appendChild(weatherIconImg);*/
}

function handleForecastData(weatherData) {
    const forecastContainer = document.getElementById('forecast');

    forecastContainer.innerHTML = ''; // Clear existing forecast content
    // Create and append the forecast heading
    const forecastHeading = document.createElement('h1');
    forecastHeading.textContent = '5-Day Forecast:';
    forecastContainer.appendChild(forecastHeading);

    for (let i = 0; i < weatherData.list.length; i += 8) { // Skip 8 intervals for daily data (3-hour intervals)
        // Create a card element for the forecast
        const forecastElement = document.createElement('div');

        forecastElement.classList.add('forecast-card'); // Add classes for styling
        // Extract data for this day
        const forecast = weatherData.list[i];
        const date = new Date(forecast.dt * 1000).toLocaleDateString('en-GB');
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        const temperature = forecast.main.temp - 273.15; // Convert from Kelvin to Celsius
        const windSpeed = forecast.wind.speed; // Wind speed in m/s


        // Construct the card content
        forecastElement.innerHTML = `
        <div class="card text-white bg-primary mb-3" style="max-width: 18rem;"> <!-- Bootstrap card with blue background -->
            <div class="card-header">${date}</div> <!-- Date as card header -->
            <div class="card-body">
                <h5 class="card-title"><img src="${iconUrl}" alt="Weather icon"></h5> <!-- Weather icon next to the title -->
                <p class="card-text">Temp: ${temperature.toFixed(1)} °C</p>
                <p class="card-text">Wind: ${windSpeed.toFixed(1)} m/s</p>
                <p class="card-text">Humidity: ${forecast.main.humidity}%</p>
            </div>
        </div>
    `;

        // Append the card to the forecast container
        forecastContainer.appendChild(forecastElement);
    }
}
