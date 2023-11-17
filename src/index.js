function refreshWeatherData(response) {
  let temperatureElement = document.querySelector("#main-city-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#main-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="main-city-icon" />`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  //make API call and update the interface
  let apiKey = "b0tab7d2df4abf5923fo8297f1d5a565";
  let units = "imperial";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiURL).then(refreshWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "b0tab7d2df4abf5923fo8297f1d5a565";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiURL).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="row">
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <img
                src="${day.condition.icon_url}"
                width="48"
              />
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max">${Math.round(
                  day.temperature.maximum
                )}°</span>
                <span class="weather-forecast-temp-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHTML;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b0tab7d2df4abf5923fo8297f1d5a565";
  let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;

  https: axios.get(apiURL).then(refreshWeatherData);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentElement = document.querySelector("#current-submit");
currentElement.addEventListener("click", getCurrent);

let searchFormElement = document.querySelector("#search-form");
searchFormElement = addEventListener("submit", handleSearchSubmit);

searchCity("Manila");
getForecast("Manila");
//displayForecast();
