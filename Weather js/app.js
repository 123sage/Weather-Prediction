let apikey = "bffba702e8bd34ffa35363afef1483f2";
let apiUrl =  `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=`;

let searchInput  = document.querySelector(".search-box input");
let searchButton = document.querySelector(".search-box button");

let weatherIcon = document.querySelector(".weather-image i");

let weather = document.querySelector(".weather");
let error = document.querySelector(".error");

async function checkWeather(city) {
    let response = await fetch(apiUrl + city + `&appid=${apikey}`) ;
    if(response.status == 404) {
        error.style.display = "block";
        weather.style.display = "none";
    }
    let data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;C";
    document.querySelector(".Humidity").innerHTML = Math.round(data.main.humidity) + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h";

    if(data.weather[0].main == "Clear") {
        weatherIcon.className = "fa-solid fa-sun";
    } else if(data.weather[0].main== "Rain") {
        weatherIcon.className = "fa-solid fa-cloud-rain";
    } else if(data.weather[0].main == "Snow") {
        weatherIcon.className = "fa-solid fa-snowflake";
    } else if(data.weather[0].main == "CLouds") {
        weatherIcon.className = "fa-solid fa-cloud";
    }

    weather.style.display = "block";
    error.style.display = "none";

}
    



searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
    searchInput.value = "";
});


searchInput.addEventListener("keyup", (e) => {
    if(e.keyCode == 13) {
        checkWeather(searchInput.value);
        searchInput.value = "";
    }
});
