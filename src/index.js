const apiKey = "d30352adf546160cc3b7co4bf1t16aee";
let celsiusTemperature;


function formatDate(timestamp) {
  let date = new Date(timestamp);
  let month = date.getMonth();
  let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  month = months[month];
  day = date.getDay();
  days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  day = days[day];
  currentDate = date.getDate();
  return `${day}, ${month} ${currentDate}`;
}

function showFahrenheitTemperature() {
  let temperatureElement = document.querySelector("#current-temperature")
  fahrenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");
  let fahrenheitTemperature = (celsiusTemperature * 1.8) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showcelsiusTemperature() {
  let temperatureElement = document.querySelector("#current-temperature")
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

}



function updateValues(response) {

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  if (cityElement.innerHTML === "undefined") {
    alert("Please enter a valid city name")
    location.reload()
    return;
  }
  let dateElement = document.querySelector("#currrent-date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  let conditionsElement = document.querySelector("#weather-conditions");
  conditions = response.data.condition.description;
  conditionsElement.innerHTML = conditions.charAt(0).toUpperCase() + conditions.slice(1);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;

  let currentTemperatureElement = document.querySelector("#current-temperature");
  celsiusTemperature = response.data.temperature.current;
  currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);

  let imageElement = document.querySelector("#current-temperature-img");
  imageElement.setAttribute("src", response.data.condition.icon_url);


}



function searchCity(event) {
  event.preventDefault();
  let citySearchElement = document.querySelector("#search-city-form");
  cityName = citySearchElement.value;
  cityName = cityName.trim();
  if (cityName === "") {
    alert("Please enter a city name")
    return;
  }
  let cityUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(cityUrl).then(updateValues)

}

/* Search a city */
let searchElement = document.querySelector("#search-input");
searchElement.addEventListener("submit", searchCity);

/* Temperature switcher */
let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", showFahrenheitTemperature);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", showcelsiusTemperature);


/* Default city */
let cityElement = document.querySelector("#city");
cityName = "Munich";
let cityUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
axios.get(cityUrl).then(updateValues);