const apiKey = "d5309c7fe60a5fb1ab08c239a2fa1c17";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherimage = document.querySelector(".weather-img");
const errorDisplay = document.querySelector(".error");

function checkWeather(city) {
    fetch(`${apiUrl}${city}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            weatherUpdate(data);
        })
        .catch(error => {
            displayError();
        });
}

function weatherUpdate(data) {
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}<sup>°</sup>C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
    weatherImg(data.weather[0].main);
    hideError();
}

function weatherImg(weatherType) {
    const weatherImgs = {
        "Clouds": "Weather Website/clouds.png",
        "Clear": "Weather Website/clear.png",
        "Rain": "Weather Website/rain.png",
        "Drizzle": "Weather Website/drizzle.png",
        "Mist": "Weather Website/mist.png",
        "Snow": "Weather Website/snow.png"
    };
    weatherimage.src = weatherImgs[weatherType] || "clear.png";
}

function displayError() {
    errorDisplay.style.display = "block";
}

function hideError() {
    errorDisplay.style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
