const contianer = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".not-found");


search.addEventListener("click", (e) => {

    const APIKey = "cb70bce4e71b42ba6acfab1c11917c21";
    const city = document.querySelector(".search-box input").value;

    if (city === "") 
        return;
    
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
        ).then(response => response.json()).then(json => {

            if (json.cod === "404") {
                notFound.style.display = "block";
                weatherBox.style.opacity = "0";
                weatherDetails.style.opacity = "0";
            }else {
                notFound.style.display = "none";
                weatherBox.style.opacity = "1";
                weatherDetails.style.opacity = "1";
            }

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".temperature");
            const description = document.querySelector(".description");
            const humidity = document.querySelector(".humidity span");
            const wind = document.querySelector(".wind span");

            switch (json.weather[0].main) {
              case "Clear":
                image.src = "images/clear.png";
                break;

              case "Rain":
                image.src = "images/rain.png";
                break;

              case "Snow":
                image.src = "images/snow.png";
                break;

              case "Clouds":
                image.src = "images/cloud.png";
                break;

              case "Haze":
                image.src = "images/haze.png";
                break;  

              default:
                image.src = "images/cloud.png";
            }

            temperature.textContent = Math.floor(`${json.main.temp}`);
            description.textContent = `${json.weather[0].description}`;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${json.wind.speed}Km/h`;

        })
})