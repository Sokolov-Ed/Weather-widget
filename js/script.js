var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
window.onload = getMyLocation;
function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
    alert("Определение местоположения не поддерживается");
  }
}
function displayLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var lat = parseFloat(latitude.toFixed(4));
  var lon = parseFloat(longitude.toFixed(4));

  var div = document.getElementById("location");
  div.innerHTML = "Ваши координаты: " + "Широта: " + lat + ", Долгота: " + lon;
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=dfa5fa07cd93458daf3122400211101&q=${lat},${lon}`
    )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log(data);
      document.querySelector(".place-name").textContent =
      "Название вашего местоположения: " + data.location.name;
      document.querySelector(".country-name").textContent =
      "Ваша страна: " + data.location.country;
      document.querySelector(".region-name").textContent =
      "Ваш регион: " + data.location.region;
      document.querySelector(
        ".icon"
        ).innerHTML = `<img src="https:${data.current.condition.icon}">`;
      document.querySelector(".date_and_time").textContent =
      "Дата и время: " + data.location.localtime;
      document.querySelector(".temp").innerHTML =
      "Температура: " + data.current.temp_c + "&deg;C";
      document.querySelector(".feels_like_temperature").innerHTML =
      "По ощущениям температура: " + data.current.feelslike_c + "&deg;C";
      document.querySelector(".weather_text").textContent =
      "Погода: " + data.current.condition.text;
      document.querySelector(".wind_speed").textContent =
      "Скорость ветра: " + data.current.wind_kph + " км/ч";
      document.querySelector(".direction_wind").innerHTML =
      "Направление ветра: " + data.current.wind_degree + "&deg;";
      document.querySelector(".humidity").textContent =
      "Влажность: " + data.current.cloud + "%";
      document.querySelector(".cloudiness").textContent =
      "Облачность: " + data.current.humidity + "%";
      document.querySelector(".gust_wind").textContent =
      "Порыв ветра: " + data.current.gust_kph + " км/ч";
      })
    }
