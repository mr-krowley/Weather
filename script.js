let container = document.querySelector(".container");
navigator.geolocation.getCurrentPosition(success, error);
// ключ с OpenWeather
const KEY_KEY = "8a7e864e357a0fb36c793bdf68016d3f";
// ключ айпи
const API_KEY = "at_VU59RCPRh82KkIPCzn34g4rdF16PV";

// функция  по коордмнатам и ключу определяем погоду у меня
function success(position) {
  //декомпозиция координат в отдельные переменные
  const { longitude, latitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY_KEY}`
  )
    .then((promis) => promis.json())
    .then((data) => dataRendering(data));
}

// функция отрисовщик 1 страницы
function dataRendering(data) {
  data.main ?? recyclerEnd(); //если data.main возращает андефаинт то вызываю заного // проверка если ввел непрвильный город
  container.innerHTML = `<p class ="weather">${Math.round(
    data.main.temp - 273
  )} ℃</p>
                            <p class="city"> ${
                              data.weather[0].description
                            } in ${data.name}</p>  
                            <a class="link" href="#">Change city</a>
      `;
  let link = container.querySelector(".link");
  link.addEventListener("click", recycler);
  console.log(data);
}

// отрисовщик второй страницы
function recycler() {
  container.innerHTML = ` <form class="form">
                          <input class="input" type="text" placeholder="Type your city here">
                          <button class="button find" >Find</button>
                          </form>
  `;
  //находим инпут и подписываем на событие (прослушку)
  let inputCity = container.querySelector(".input");
  inputCity.addEventListener("change", () => {
    //принимаем значение из импута в новую переменную и вставляем в fetch
    let newValue = inputCity.value;
    fetch(
      ` https://api.openweathermap.org/data/2.5/weather?q=${newValue}&appid=${KEY_KEY}  `
    )
      .then((promis) => promis.json())
      .then((data) => dataRendering(data));
  });

  //let buttonCiti = container.querySelector(".button");
  // buttonCiti.addEventListener("click", successCity(dataRendering(data)));
}

//отрисовщик 3 страницы  проверка на правильность написания города  21 стр кода
function recyclerEnd() {
  container.innerHTML = ` <form class="form">
                          <p class="Ooops">Ooops. Something went wrong.</p>
                          <p class="Errorinfo">Error info</p>
                          <button class="button find" >Try again</button>
                          </form> `;
  let button2 = container.querySelector(".button");
  button2.addEventListener("click", recycler);
}

// если пользователь запреетил то поиск по айпи
function error() {
  fetch(`https://geo.ipify.org/api/v2/country?apiKey=${API_KEY}`)
    .then((promis) => promis.json())
    .then((data) => {
      //запрос по городу
      fetch(
        ` https://api.openweathermap.org/data/2.5/weather?q=${data.location.region}&appid=${KEY_KEY}
        `
      )
        .then((promis) => promis.json())
        .then((data) => dataRendering(data)); //
    });
}
