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

//weather by defauly = AUCKLAND ~ it will search for Chicago on page load

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
  windDiv.innerHTML = `Wind: ${wind} mph`;

  let iconDiv = document.querySelector("#icon");
  iconDiv.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDiv.setAttribute("alt", response.data.weather[0].main);
}

let auckland = "Auckland";
let key = "5275fa016fd7058fa1d4233b4614b62d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${auckland}&appid=${key}&units=metric`;

axios.get(apiUrl).then(displayWeather);

// Current cites weather +  Change ICONS images (sunny, clouldy...)

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-imput");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;

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
  }

  let city = searchInput.value;
  let key = "5275fa016fd7058fa1d4233b4614b62d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

let form1 = document.querySelector("#formSite");
form1.addEventListener("submit", search);

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
