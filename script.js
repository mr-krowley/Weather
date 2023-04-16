let container = document.querySelector(".container");
navigator.geolocation.getCurrentPosition(success, error);

const KEY_KEY = "8a7e864e357a0fb36c793bdf68016d3f";

function success(position) {
  //декомпозиция координат в отдельные переменные
  const { longitude, latitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY_KEY}`
  )
    .then((promis) => promis.json())
    .then((data) => {
      container.innerHTML = `<p class ="weather">${Math.round(
        data.main.temp - 273
      )} ℃</p>
                            <p class="city"> ${
                              data.weather[0].description
                            } in ${data.name}</p>  
                            <a class="link" href="#">Change city</a>
      `;
    });
}

function error() {}
