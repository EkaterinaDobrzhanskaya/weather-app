//Get conditions(получаем условия из json)
import conditions from './conditions.js';
console.log(conditions);
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

function showCard({ name, country, temp, condition, imgPath }) {
  //Разметка для карточки
  const html = `<div class="card">
    <h2 class="card-city">${name} <span>${country}</span></h2>

    <div class="card-weather">
        <div class="card-value">${temp}<sup>°C</sup></div>
        <img class="card-img" src="${imgPath}" alt="Weather">
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

    console.log(data.current.condition.code);

    const info = conditions.find(function(obj){
        if (obj.code === data.current.condition.code) return true;
    });
    console.log(info);
    console.log(info.languages);
    console.log(info.languages[23]['day_text']);

    const filePath = './img/' + (data.current.is_day ? 'day' : 'night') + '/';
    const fileName = (data.current.is_day ? info.day : info.night) + '.png';
    const imgPath = filePath + fileName;

    console.log('filePath', filePath + fileName);

    const weatherData = {
        name: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.is_day 
            ? info.languages[23]['day_text'] 
            : info.languages[23]['night_text'],
    imgPath,  
    };

    showCard(weatherData);
  }
};
