let currentDate = new Date();

function formatDate(date) {
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
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let mounth = currentMonth + 1;
  let number = date.getDate();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (mounth < 10) {
    mounth = `0${mounth}`;
  }
  if (number < 10) {
    number = `0${number}`;
  }
  let updateDate = ` ${number}.${mounth}.${currentYear}`;
  let dateHtml = document.querySelector("#date");
  dateHtml.innerHTML = updateDate;
  let time = document.querySelector("#time");
  time.innerHTML = ` ${day} ${hours}:${minutes}`;
}

formatDate(currentDate);

let city = document.querySelector("#search");
let header = document.querySelector("h2");

function enterCity(event) {
  event.preventDefault();

  let newCity = city.value;
  console.log(newCity);
  // console.log(searchQuery);
  header.innerHTML = newCity;

  function searchCity(newCity) {
    let key = "894a2e7aa7f46eeca5d8778f6faa5a5b";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=${key}`;

    axios.get(url).then(showData);
  }
  searchCity(newCity);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

//API

function showData(response) {
  let temperature = document.querySelector("p");
  let description = document.querySelector("#descr");
  let windy = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");

  temperature.innerHTML = `${Math.round(response.data.main.temp)} °C`;
  description.innerHTML = response.data.weather[0].description;
  windy.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
}
//geolocation

let btnCurrent = document.querySelector("#button-addon");
btnCurrent.addEventListener("click", getCurrentPosition);

function handlePosition(position) {
  console.log("hi");
  console.log(position);
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);
  let apiKey = "12bdbd86bcab685847fea4f4c4d743cf";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  header.innerHTML = "In your city";
  axios.get(url).then(showData);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
