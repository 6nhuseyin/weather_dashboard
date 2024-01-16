//

let openWeatherAPIKey = "7f9396ef9b0898f3254c073ab6d925be";

let city;
let lat;
let lon;

// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid" + openWeatherAPIKey;
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid" + openWeatherAPIKey;

// fetch(queryURL);


document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents page reload

    // Get the city from the input field
    city = document.getElementById('search-input').value;

    // Call function to fetch coordinates for the city
    fetchCoordinates(city);
});

function fetchCoordinates(city) {
    // Construct URL for Geocoding API
    var geocodeURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + openWeatherAPIKey;

    // Fetch the coordinates
    fetch(geocodeURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
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
        .then(function(response) {
            return response.json();
        })
        .then(function(weatherData) {
            // Handle the weather data (display it on the webpage)
            console.log(weatherData); // This is for testing; replace with your display logic
        });
}



