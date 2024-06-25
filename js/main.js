const myKey = "2184df9247834dfcb29211416242306";

const cityName = document.querySelector(".cityName");
const temp = document.querySelector(".temp");
const current = document.querySelector(".current");
const currentIcon = document.querySelector(".currentIcon");
const todayDate = document.getElementById("todayDate");
const todayDay = document.getElementById("todayDay");
const tomDay = document.getElementById("tomorrowDay");
const NTDay = document.getElementById("nextTomorrowDay");

const secondIcon = document.querySelector(".secondIcon");
const secondLargeTemp = document.querySelector(".secondLargeTemp");
const secondSmallTemp = document.querySelector(".secondSmallTemp")
const secondCurrent = document.querySelector(".secondCurrent");

const thirdIcon = document.querySelector(".thirdIcon");
const thirdLargeTemp = document.querySelector(".thirdLargeTemp");
const thirdSmallTemp = document.querySelector(".thirdSmallTemp")
const thirdCurrent = document.querySelector(".thirdCurrent");

const cityInput = document.getElementById("cityInput");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const windDirection = document.querySelector(".windDirection");
const searchBtn = document.getElementById("searchBtn");

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();

/* First Day */
todayDay.innerHTML = weekdays[d.getDay()];

/* Second Day */
if (d.getDay() == 6) { 
    tomDay.innerHTML = weekdays[0];
} else
{
    tomDay.innerHTML = weekdays[d.getDay()+1];
}
    
/* Third Day */
if (d.getDay() == 5) { 
    NTDay.innerHTML = weekdays[0];
} else if (d.getDay() == 6) {
    NTDay.innerHTML = weekdays[1];
} else
{
    NTDay.innerHTML = weekdays[d.getDay()+2];
}
/* Date */
todayDate.innerHTML = d.getDate() + months[d.getMonth()];

/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */
if (navigator.geolocation) {
  // Get the current position
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  getCity()  }

// Success callback function
function successCallback(position) {
  // Access the latitude and longitude from the position object
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  console.log("Latitude: " + latitude);
  console.log("Longitude: " + longitude);
  getCityGeo(latitude, longitude);
}
/* --------------------------------------------------------------------------------------------------------------------------- */
cityInput.addEventListener("keyup", getCity);
cityInput.addEventListener("blur", getCity);
searchBtn.addEventListener("click", getCity);

async function getCity() {
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${cityInput.value}&days=3&aqi=no&alerts=no`);  
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        var data = await response.json();
        cityName.innerHTML = data.location.name;
        temp.innerHTML = `${data.current.temp_c}°C`;
        current.innerHTML = data.current.condition.text;
        currentIcon.setAttribute("src", `https:${data.current.condition.icon}`);
        humidity.innerHTML = `${data.current.humidity}%`;
        wind.innerHTML = `${data.current.wind_mph}km/h`;
        windDirection.innerHTML = data.current.wind_dir;
        /* second container get data from api */
        secondIcon.setAttribute('src', `https:${data.forecast.forecastday[1].day.condition.icon}`);
        secondLargeTemp.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}°C`;
        secondSmallTemp.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}°`;
        secondCurrent.innerHTML = data.forecast.forecastday[1].day.condition.text;
        /* third container get data from api */
        thirdIcon.setAttribute('src', `https:${data.forecast.forecastday[2].day.condition.icon}`);
        thirdLargeTemp.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}°C`;
        thirdSmallTemp.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}°`;
        thirdCurrent.innerHTML = data.forecast.forecastday[2].day.condition.text;
    
    } catch (error) {
        console.error('Error fetching weather data:');
    }
}

  /* ------------------------------------------------------------------------------------------------------------- */
async function getCityGeo(latitude, longitude) {
  try {
    console.log("enter");
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`)
    var data = await response.json();
    cityName.innerHTML = data.location.name;
    temp.innerHTML = `${data.current.temp_c}°C`;
    current.innerHTML = data.current.condition.text;
    currentIcon.setAttribute("src", `https:${data.current.condition.icon}`);
    humidity.innerHTML = `${data.current.humidity}%`;
    wind.innerHTML = `${data.current.wind_mph}km/h`;
    windDirection.innerHTML = data.current.wind_dir;
    /* second container get data from api */
    secondIcon.setAttribute('src', `https:${data.forecast.forecastday[1].day.condition.icon}`);
    secondLargeTemp.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}°C`;
    secondSmallTemp.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}°`;
    secondCurrent.innerHTML = data.forecast.forecastday[1].day.condition.text;
    /* third container get data from api */
    thirdIcon.setAttribute('src', `https:${data.forecast.forecastday[2].day.condition.icon}`);
    thirdLargeTemp.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}°C`;
    thirdSmallTemp.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}°`;
    thirdCurrent.innerHTML = data.forecast.forecastday[2].day.condition.text;

    } catch (error) {
    console.error("Error fetching data from API:", error);
  }
}
    function errorCallback(error) {
      // Handle errors such as user denying location access or other issues
      console.error("Error getting location: " + error.message);
    }