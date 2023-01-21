const apiKey = 'dc511ac65ec748eaae7135405232101';


//Шапка по классу
const header = document.querySelector('.header');

/* Получаем значение из Формы */ 

const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

/* Слушаем отправку Формы */ 

form.onsubmit = function (event) {
    //Отменяем отправку формы
    event.preventDefault();

    // Берем значение из инпута. Обрезаем пробелы
    let city = input.value.trim();

    //Делаем запрос на сервер для получения погоды
    //Адрес запроса
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    //Сам запрос
    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        //Проверка на ошибку написания Города
        if(data.error){
            //Удаляем предыдущий поиск данных (карточек)
        const prevCard = document.querySelector('.card');
        if (prevCard) prevCard.remove();
            //Если есть ошибка, выводим эту ошибку
            const html = `<div class="card">${data.error.message}</div>`;

            //Отображаем карточку на странице
        header.insertAdjacentHTML('afterend', html);
        } else {
            //Если ошибки нет, выводим карточку с погодой
             //Отображаем полученные жанные в карточке  
        //Удаляем предыдущий поиск данных (карточек)
        const prevCard = document.querySelector('.card');
        if (prevCard) prevCard.remove();


        //Разметка для карточки
        const html = `<div class="card">
                        <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>

                        <div class="card-weather">
                            <div class="card-value">${data.current.temp_c}<sup>°C</sup></div>
                            <img class="card-img" src="./image/Cloudy_with_rain.jpg" alt="Weather">
                        </div>

                        <div class="card-description">${data.current.condition.text}</div>
                    </div>`;
        //Отображаем карточку на странице
        header.insertAdjacentHTML('afterend', html);
        }
       
    });
}
