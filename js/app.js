// ================================
// HTML ELEMENTS
// ================================

const weatherForm = document.getElementById("weatherForm");

const cityInput = document.getElementById("city");

const errorMessage = document.getElementById("errorMessage");

const loading = document.querySelector(".loading");

const weatherCard = document.querySelector(".weather-card");

const cityName = document.getElementById("cityName");

const country = document.getElementById("country");

const temperature = document.getElementById("temperature");

const weatherDescription = document.getElementById("weatherDescription");

const windSpeed = document.getElementById("windSpeed");

const weatherIcon = document.getElementById("weatherIcon");


// ================================
// WEATHER CODE
// ================================

const weatherCodes = {

0:"Clear Sky",

1:"Mainly Clear",

2:"Partly Cloudy",

3:"Overcast",

45:"Fog",

48:"Depositing Rime Fog",

51:"Light Drizzle",

53:"Moderate Drizzle",

55:"Dense Drizzle",

61:"Light Rain",

63:"Moderate Rain",

65:"Heavy Rain",

71:"Light Snow",

73:"Moderate Snow",

75:"Heavy Snow",

80:"Rain Showers",

81:"Rain Showers",

82:"Heavy Showers",

95:"Thunderstorm"

};


// ================================
// FORM SUBMIT
// ================================

weatherForm.addEventListener("submit", handleSearch);


// ================================
// MAIN FUNCTION
// ================================

async function handleSearch(event){

event.preventDefault();

const city = cityInput.value.trim();

resetError();

weatherCard.classList.add("hidden");

if(city===""){

showError("Please enter a city name.");

return;

}

//ici, nous avons notre API :

// ================================
// SHOW LOADING
// ================================

loading.classList.remove("hidden");
clearWeather();
try{

    // ================================
    // STEP 1 : FIND CITY
    // ================================

    const geoUrl =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;

    const geoResponse = await fetch(geoUrl);

    if(!geoResponse.ok){

        throw new Error("CITY_NOT_FOUND");

    }

    const geoData = await geoResponse.json();

    if(!geoData.results || geoData.results.length===0){

        throw new Error("CITY_NOT_FOUND");

    }

    const place = geoData.results[0];

    const latitude = place.latitude;

    const longitude = place.longitude;

    // ================================
    // STEP 2 : GET WEATHER
    // ================================

    const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const weatherResponse = await fetch(weatherUrl);

    if(!weatherResponse.ok){

        throw new Error("WEATHER_ERROR");

    }

    const weatherData = await weatherResponse.json();

    displayWeather(place, weatherData);

}
catch(error){

    handleError(error);

}
finally{

    loading.classList.add("hidden");

}















}


// ================================
// ERROR FUNCTIONS
// ================================

// ================================
// SHOW ERROR
// ================================

function showError(message){

    cityInput.setAttribute("aria-invalid","true");

    cityInput.setAttribute(
        "aria-describedby",
        "errorMessage"
    );

    errorMessage.textContent=message;

}


// ================================
// RESET ERROR
// ================================

function resetError(){

    cityInput.setAttribute(
        "aria-invalid",
        "false"
    );

    errorMessage.textContent="";

}


// ================================
// REMOVE ERROR AUTOMATICALLY
// ================================

cityInput.addEventListener("input",()=>{

if(cityInput.value.trim()!==""){

resetError();

}

});



// ================================
// DISPLAY WEATHER
// ================================

function displayWeather(place, weatherData){

    const current = weatherData.current_weather;

    cityName.textContent = place.name;

    country.textContent = place.country;

    temperature.textContent = `${current.temperature} °C`;

    windSpeed.textContent = `💨 Wind Speed : ${current.windspeed} km/h`;

    weatherDescription.textContent =
        weatherCodes[current.weathercode] || "Unknown";

    weatherIcon.src = getWeatherIcon(current.weathercode);

    weatherIcon.alt = weatherDescription.textContent;

    weatherCard.classList.remove("hidden");

}



// ================================
// WEATHER ICONS
// ================================

function getWeatherIcon(code){

    if(code===0){

        return "https://openweathermap.org/img/wn/01d@2x.png";

    }

    if(code===1 || code===2){

        return "https://openweathermap.org/img/wn/02d@2x.png";

    }

    if(code===3){

        return "https://openweathermap.org/img/wn/03d@2x.png";

    }

    if(code===45 || code===48){

        return "https://openweathermap.org/img/wn/50d@2x.png";

    }

    if(code>=51 && code<=67){

        return "https://openweathermap.org/img/wn/09d@2x.png";

    }

    if(code>=71 && code<=77){

        return "https://openweathermap.org/img/wn/13d@2x.png";

    }

    if(code>=80 && code<=82){

        return "https://openweathermap.org/img/wn/10d@2x.png";

    }

    if(code>=95){

        return "https://openweathermap.org/img/wn/11d@2x.png";

    }

    return "https://openweathermap.org/img/wn/01d@2x.png";

}










// ================================
// HANDLE ERRORS
// ================================

function handleError(error){

    weatherCard.classList.add("hidden");

    if(error.message==="CITY_NOT_FOUND"){

        showError(
            "No results found. Please check the spelling."
        );

        cityInput.focus();

        return;

    }

    if(error.message==="WEATHER_ERROR"){

        showError(
            "Unable to retrieve weather information."
        );

        return;

    }

    showError(
        "Connection failed. Please check your Internet connection."
    );

}


// ================================
// CLEAR WEATHER CARD
// ================================

function clearWeather(){

    cityName.textContent="";

    country.textContent="";

    temperature.textContent="";

    weatherDescription.textContent="";

    windSpeed.textContent="";

    weatherIcon.src="";

    weatherIcon.alt="";

}