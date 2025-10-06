const apiKey = "e2d1843f3bd9d749d40ba7cf84d10df3";
const button = document.getElementById("searchbtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("errorMsg");
const loader = document.getElementById("loader");

// Hide loader at start
// loader.style.display = "none";
async function getWeather(city) {
  try {
    console.log("Fetching weather for:", city);
    errorMsg.textContent = "";
    weatherInfo.classList.remove("show");
    loader.style.display = "block";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log("API URL:", url);
    const res = await fetch(url);
    console.log("Fetch response:", res);

    if (!res.ok) {
      throw new Error("City not found. Please try again.");
    }
    const data = await res.json();
    console.log("Data received:", data);
    loader.style.display = "none";
   
    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;
    const advice = getAdvice(data.weather[0].description);
    document.getElementById("weatherAdvice").textContent = advice;

    console.log("Weather info updated successfully :white_check_mark:");
    weatherInfo.classList.add("show");

  } catch (error) {
    console.error("Error fetching weather :x:", error);
    loader.style.display = "none";
    errorMsg.textContent = "Oops! " + error.message;
  }
}
function getAdvice(description) {
  description = description.toLowerCase();
  if (description.includes("rain")) return "Don’t forget your umbrella";
  if (description.includes("clear")) return "Looks sunny — enjoy your day!";
  if (description.includes("cloud")) return "Cloudy skies today";
  if (description.includes("snow")) return "Stay warm — it’s snowing";
  return "Have a great day out there!";
}
button.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    console.log("Button clicked. City:", city);
    getWeather(city);
  } else {
    console.warn("No city entered :warning:");
    errorMsg.textContent = "Please enter a city name!";
  }
});
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    console.log("Enter key pressed. Triggering search...");
    button.click();
  }
});
