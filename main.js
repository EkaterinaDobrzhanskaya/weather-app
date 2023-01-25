const apiKey = "dc511ac65ec748eaae7135405232101";

//Шапка по классу
const header = document.querySelector(".header");
/* Получаем значение из Формы */
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

function removeCard() {
  //Удаляем предыдущий поиск данных (карточек)
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
  //Если есть ошибка, выводим эту ошибку
  const html = `<div class="card">${data.error.message}</div>`;
  //Отображаем карточку на странице
  header.insertAdjacentHTML("afterend", html);
}

function showCard({ name, country, temp, condition }) {
  //Разметка для карточки
  const html = `<div class="card">
    <h2 class="card-city">${name} <span>${country}</span></h2>

    <div class="card-weather">
        <div class="card-value">${temp}<sup>°C</sup></div>
        <img class="card-img" src="./image/Cloudy_with_rain.jpg" alt="Weather">
    </div>

    <div class="card-description">${condition}</div>
</div>`;
  //Отображаем карточку на странице
  header.insertAdjacentHTML("afterend", html);
}

//Делаем запрос на сервер для получения погоды
//Делаем ассинхронный запрос
async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

/* Слушаем отправку Формы */
form.onsubmit = async function (event) {
  //Отменяем отправку формы
  event.preventDefault();
  // Берем значение из инпута. Обрезаем пробелы
  let city = input.value.trim();

  //Получаем данные с сервера
  const data = await getWeather(city);

  //Проверка на ошибку написания Города
  if (data.error) {
    removeCard();
    showError(data.error.message);
  } else {
    //Если ошибки нет, выводим карточку с погодой
    //Отображаем полученные жанные в карточке
    //Удаляем предыдущий поиск данных (карточек)
    removeCard();

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
    };

    showCard(weatherData);
  }
};
