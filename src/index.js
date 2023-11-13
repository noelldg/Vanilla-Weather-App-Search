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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
                width="48"
              />
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max">61°</span>
                <span class="weather-forecast-temp-min">38°</span>
              </div>
            </div>
          </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement = addEventListener("submit", handleSearchSubmit);

searchCity("Herriman");
displayForecast();
