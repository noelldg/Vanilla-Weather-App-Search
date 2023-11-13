function refreshWeatherData(response) {
  let temperatureElement = document.querySelector("#main-city-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#main-city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement = addEventListener("submit", handleSearchSubmit);

searchCity("Herriman");
