const apikey = "3c5bbea8b5a9d6e3cf860ea8a2fd8767";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const url = `${apiUrl}&q=${city}&appid=${apikey}`;
    console.log("Requesting Weather Data for:", city);

    try {
        const response = await fetch(url);

        // Check if the city is not found
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return; // Exit the function if city is not found
        }

        const data = await response.json();
        console.log("Weather Data:", data);

        // Update weather details in the DOM
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Update weather icon based on condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "image/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "image/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "image/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "image/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "image/mist.png";
        }

        // Show the weather details and hide the error
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Failed to fetch weather data:", error.message);
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
