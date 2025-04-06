const apiBaseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=b0d399bf4c8dab2de2af05107af74c24";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiBaseUrl}&q=${city}`);

        if (!response.ok) {
            throw new Error(`City not found: ${city}`);
        }

        const data = await response.json();
        // console.log(data);

        // Updating the UI
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // **Update Weather Icon Based on Weather Condition**
        const weatherConditions = {
            "Clear": "clear.png",
            "Clouds": "clouds.png",
            "Rain": "rain.png",
            "Drizzle": "drizzle.png",
            "Mist": "mist.png",
            "Snow": "snow.png",
            "Thunderstorm": "storm.png"
        };

        const weatherType = data.weather[0].main;
        weatherIcon.src = `imgs/${weatherConditions[weatherType] || "default.png"}`;

        // **Make the Weather Container Visible**
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);

        // Display error message in UI
        document.querySelector(".city").innerHTML = "City not found!";
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "-- km/h";

        // Reset weather icon to a default error image
        weatherIcon.src = "imgs/error.png";  

        // Hide weather display on error
        document.querySelector(".weather").style.display = "none";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});
