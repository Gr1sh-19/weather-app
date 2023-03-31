const apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";

/* Update data from search query */

function updateTemperature(response) {
  let temperatureElt = document.getElementById("main-city-temp");
  let temperature = Math.round(response.data.main.temp);
  temperatureElt.innerHTML = `${temperature} °C `;
}

function displayCityFromSearch(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let input = document.getElementById("form-input");
  city.innerText = input.value;
  let cityQuery = "https://api.openweathermap.org/data/2.5/weather";
  axios
    .get(`${cityQuery}?q=${city.innerText}&appid=${apiKey}&units=metric`)
    .then(updateTemperature);
}

let searchInput = document.getElementById("weather-form");
searchInput.addEventListener("submit", displayCityFromSearch);

/* Update data from current location */

function showCurrentCityTemp(response) {
  let city = document.querySelector("h1");
  city.innerText = response.data.name;
  let temperatureElt = document.getElementById("main-city-temp");
  let temperature = Math.round(response.data.main.temp);
  temperatureElt.innerHTML = `${temperature} °C `;
}

function showCurrentPostion(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentCityQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
  axios
    .get(`${currentCityQuery}&appid=${apiKey}&units=metric`)
    .then(showCurrentCityTemp);
}

function displayCurrentCity() {
  navigator.geolocation.getCurrentPosition(showCurrentPostion);
}

let currentCitySelect = document.getElementById("current-location");
currentCitySelect.addEventListener("click", displayCurrentCity);