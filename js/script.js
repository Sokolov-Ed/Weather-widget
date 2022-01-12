let dataField = document.getElementById("dataField") && document.getElementById("dataField");
let dataIsEmpty = document.getElementById("dataIsEmpty") && document.getElementById("dataIsEmpty");
window.onload = getMyLocation;

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(displayLocation, error);
  } else {
    alert("Определение местоположения не поддерживается");
  }
}

function error(err) {
  dataField.style.display = 'none';
  dataIsEmpty.style.display = 'block';
  dataIsEmpty.style.color = "white";
  dataIsEmpty.style.textAlign = "center";
  dataIsEmpty.style.textShadow = "0 0 1px #ffffff, 0 0 2px #ffffff, 0 0 4px #ffffff";
  dataIsEmpty.style.fontSize = "20px";
  dataIsEmpty.style.padding = "10px";
  dataIsEmpty.style.borderRadius = "10px";
  dataIsEmpty.style.boxShadow = "inset 0 0 1px #ffffff, inset 0 0 2px #ffffff, inset 0 0 4px #ffffff";
  dataIsEmpty.style.height = "max-content";
  dataIsEmpty.innerHTML = err.message;
}

function displayLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  latitude = parseFloat(latitude.toFixed(4));
  longitude = parseFloat(longitude.toFixed(4));

  let div = document.getElementById("location");
  div.innerHTML = "Ваши координаты: " + "Широта: " + latitude + ", Долгота: " + longitude;
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=dfa5fa07cd93458daf3122400211101&q=${latitude},${longitude}`
    )
    .then(function (resp) {
     return resp.json();
    })
    .then(function (data) {
      dataField.style.display = 'block';
      document.querySelector(".place-name").textContent = "Название вашего местоположения: " + data.location.name;
      document.querySelector(".country-name").textContent = "Ваша страна: " + data.location.country;
      document.querySelector(".region-name").textContent = "Ваш регион: " + data.location.region;
      document.querySelector(".icon").innerHTML = `<img src="https:${data.current.condition.icon}">`;
      document.querySelector(".date_and_time").textContent = "Дата и время: " + data.location.localtime;
      document.querySelector(".temp").innerHTML = "Температура: " + data.current.temp_c + "&deg;C";
      document.querySelector(".feels_like_temperature").innerHTML = "По ощущениям температура: " + data.current.feelslike_c + "&deg;C";
      document.querySelector(".weather_text").textContent = "Погода: " + data.current.condition.text;
      document.querySelector(".wind_speed").textContent = "Скорость ветра: " + data.current.wind_kph + " км/ч";
      document.querySelector(".direction_wind").innerHTML = "Направление ветра: " + data.current.wind_degree + "&deg;";
      document.querySelector(".humidity").textContent = "Влажность: " + data.current.cloud + "%";
      document.querySelector(".cloudiness").textContent = "Облачность: " + data.current.humidity + "%";
      document.querySelector(".gust_wind").textContent = "Порыв ветра: " + data.current.gust_kph + " км/ч";
      })
    }