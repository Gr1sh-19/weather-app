const apiKey = "d30352adf546160cc3b7co4bf1t16aee";
let celsiusTemperature;
let cityName = "Munich";

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

function formatDay(timestamp) {
  date = new Date(timestamp * 1000);
  day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  day = days[day];
  console.log(day);
  return day;
}

function forecastTemperature(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML +
        `<div class="col-md-2">
            <div class="forecast-temperature-date">
              ${formatDay(forecastDay.time)} 
              </div>
                <img src=${forecastDay.condition.icon_url}>
              <div class = "forecast-temperature">
                  <span class = "forecast-temperature-max"> ${Math.round(forecastDay.temperature.minimum)}</span>°
                  <span class = "forecast-temperature-min" > ${Math.round(forecastDay.temperature.maximum)}</span>°
              </div>
       </div>`
      console.log(forecastDay.condition.icon_url);
    }
  })

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

}



function showTemperature(response) {

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

  /* Temperature forecast */
  cityName = cityElement.innerHTML;
  let forecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(forecastURL).then(forecastTemperature);
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
  axios.get(cityUrl).then(showTemperature)
}

/* Search a city */
let searchElement = document.querySelector("#search-input");
searchElement.addEventListener("submit", searchCity);



/* Default city */
let cityElement = document.querySelector("#city");
let cityUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
axios.get(cityUrl).then(showTemperature);