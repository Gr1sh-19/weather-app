const apiKey = "d30352adf546160cc3b7co4bf1t16aee";

function showCityName(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let conditionsElement = document.querySelector("#weather-conditions");
  conditions = response.data.condition.description;
  conditionsElement.innerHTML = conditions.charAt(0).toUpperCase() + conditions.slice(1);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let currentTemperatureElement = document.querySelector("#current-temperature");
  currentTemperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let imageElement = document.querySelector("#current-temperature-img");
  imageElement.setAttribute("src", response.data.condition.icon_url);
}

let cityElement = document.querySelector("#city");
cityName = "Munich";
let cityUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=d30352adf546160cc3b7co4bf1t16aee&units=metric`;
axios.get(cityUrl).then(showCityName);