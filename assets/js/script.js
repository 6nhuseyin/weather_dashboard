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
            handleCurrentWeatherData(weatherData);
            console.log(weatherData);
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
    todaySection.innerHTML = `
    <h2>${weatherData.city.name} (${currentDate})</h2>
    <p>Temperature: ${temperatureCelsius.toFixed(1)} °C</p>
    <p>Humidity: ${currentWeather.main.humidity}%</p>
    <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
`;
}

