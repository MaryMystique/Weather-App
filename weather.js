const apiKey = "e2d1843f3bd9d749d40ba7cf84d10df3";
const button = document.getElementById("searchbtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const errorMsg = document.getElementById("errorMsg");

 async function getWeather(city) {
   try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const res = await fetch(url);

    if (!res.ok) {
      throw new error ("city not found");  
    }
    const data = await res.json();

    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = ` Temperature: ${data.main.temp}°C`;
    document.getElementById("description").textContent = ` Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;
    
   } catch (error) {
    weatherInfo.querySelectorAll("h4, h2").forEach(e => e.textContent = "");
    errorMsg.textContent = "Oops!"  + error.message;
   }
}
button.addEventListener("click", () => {
    const city = cityInput.value.trim();
    console.log(city);
    if (city) {
       getWeather(city); 
    } else {
      errorMsg.textContent = "Please enter a city name!"; 
    }   
});
cityInput.addEventListener("keypress", (e) => {
    if (e.key ==="Enter") {
      searchbtn.click();  
    }
});
