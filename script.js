const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            alert("City not found!");
            weatherDiv.style.display = "none";
            return;
        }

        const data = await response.json();

        // Update weather info
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity-value").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind-value").innerHTML = Math.round(data.wind.speed) + " km/h";
        document.querySelector(".condition").innerHTML = data.weather[0].description;
        document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like) + "°C";

        // Update weather icon based on weather condition
        const weatherId = data.weather[0].id;
        if (weatherId >= 200 && weatherId < 300) {
            weatherIcon.src = "img/storm.png";
        } else if (weatherId >= 300 && weatherId < 500) {
            weatherIcon.src = "img/drizzle.png";
        } else if (weatherId >= 500 && weatherId < 600) {
            weatherIcon.src = "img/rain.png";
        } else if (weatherId >= 600 && weatherId < 700) {
            weatherIcon.src = "img/snow.png";
        } else if (weatherId >= 700 && weatherId < 800) {
            weatherIcon.src = "img/mist.png";
        } else if (weatherId === 800) {
            weatherIcon.src = "img/clear.png";
        } else {
            weatherIcon.src = "img/clouds.png";
        }

        // Show weather information
        weatherDiv.style.display = "block";

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("An error occurred while fetching weather data");
    }
}

// Event listeners
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});

// Hide weather info initially
weatherDiv.style.display = "none";