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

//weather by defauly = CHICAGO ~ it will search for Chicago on page load

function displayWeather(response) {
  let cityDiv = document.querySelector("#city");
  let currentCity = response.data.name;

  let weatherDiv = document.querySelector("#degrees");
  let temperature = Math.round(response.data.main.temp);

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
}

let auckland = "Chicago";
let key = "5275fa016fd7058fa1d4233b4614b62d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${auckland}&appid=${key}&units=metric`;

axios.get(apiUrl).then(displayWeather);

// Current cites weather

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-imput");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;

  function displayWeather(response) {
    let cityDiv = document.querySelector("#city");
    let currentCity = response.data.name;

    let weatherDiv = document.querySelector("#degrees");
    let temperature = Math.round(response.data.main.temp);

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
  }

  let city = searchInput.value;
  let key = "5275fa016fd7058fa1d4233b4614b62d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
let form1 = document.querySelector("#formSite");
form1.addEventListener("submit", search);

// current location weather ~ Button

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button1 = document.querySelector("#button_current");
button1.addEventListener("click", currentLocation);

function handlePosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "5275fa016fd7058fa1d4233b4614b62d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
