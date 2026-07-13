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

// API viendra ici

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