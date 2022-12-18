// Show current day and tme
let now = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thuesday",
  "Friday",
  "Saturday",
  "Sunday"
];
let weekDay = weekdays[now.getDay()];

let time = now.getHours() + ":" + now.getMinutes();

let currentDayTime = document.querySelector("#DayTime");
currentDayTime.innerHTML = `${weekDay}, ${time}`;

//FORECAST

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5275fa016fd7058fa1d4233b4614b62d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Current cites weather +  Change ICONS images (sunny, clouldy...)

function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;

  let cityDiv = document.querySelector("#city");
  let currentCity = response.data.name;

  let weatherDiv = document.querySelector("#degrees");
  let temperature = Math.round(celsiusTemperature);

  let descriptionDiv = document.querySelector("#description_weather");
  let description = response.data.weather[0].main;

  let humidityDiv = document.querySelector("#humidity_weather");
  let humidity = response.data.main.humidity;

  let windDiv = document.querySelector("#wind_weather");
  let wind = response.data.wind.speed;

  cityDiv.innerHTML = `${currentCity}`;
  weatherDiv.innerHTML = `${temperature}`;
  descriptionDiv.innerHTML = `${description}`;
  humidityDiv.innerHTML = `Humidity: ${humidity}%`;
  windDiv.innerHTML = ` Wind: ${wind} mph`;

  let iconDiv = document.querySelector("#icon");
  iconDiv.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDiv.setAttribute("alt", response.data.weather[0].main);

  console.log(response.data.coordinates);
  getForecast(response.data.coord);
}

function search(city) {
  let key = "5275fa016fd7058fa1d4233b4614b62d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-imput");
  search(searchInput.value);
}

let form1 = document.querySelector("#formSite");
form1.addEventListener("submit", handleSubmit);

search("Auckland");

//Changing C to F

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let weatherDiv = document.querySelector("#degrees");
  weatherDiv.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsusTemperature(event) {
  event.preventDefault();
  let weatherDiv = document.querySelector("#degrees");
  weatherDiv.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit_link = document.querySelector("#fahrenheit");
fahrenheit_link.addEventListener("click", showFahrenheitTemperature);

//Chamging F to C
let celsus_link = document.querySelector("#celsus");
celsus_link.addEventListener("click", showCelsusTemperature);
