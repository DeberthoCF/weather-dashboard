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

function showError(message){

cityInput.setAttribute("aria-invalid","true");

errorMessage.textContent=message;

}


function resetError(){

cityInput.setAttribute("aria-invalid","false");

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

    console.log(place);

    console.log(weatherData);

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