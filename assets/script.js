var userFormEl = document.querySelector('#user-form');
var cityInputEl = $('#city');
var weatherContainer = document.querySelector('#weather-container');
var fivedayWeatherContainer = document.querySelector('#five-day-weather');
var submitBtn = document.querySelector('.btn');
var searchListElement = document.querySelector('#city-buttons')

//code for local storage is breaking - need to fix
// var searchHistory = JSON.parse(localStorage.getItem("searchedcity"));
// if(searchHistory === null) {
//     searchHistory = []
// }
// console.log(searchHistory)


var apiKey = '4894486d815e0e939f58bd7e60ff1f43';


//function to get API response given user input for city
function getApi(event) {
    event.preventDefault();
    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityInputEl.val() + "&appid=" + apiKey;
    // storeCities(cityInputEl.val());
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            var city = document.createElement("h3")
            city.innerText = "Current weather for " + data[0].name + " on " + moment().format("dddd, MMM Do YYYY");
            weatherContainer.appendChild(city);
            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + apiKey + "&units=imperial";
            fetch(queryURL2)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data);
                    displayCurrentWeather(data);
                })
        });
}

function displayCurrentWeather(data) {

    var temp = document.createElement("p");
    var wind = document.createElement("p");
    var humidity = document.createElement("p");
    var uvIndex = document.createElement("p");
    temp.innerText = "Temp: " + data.current.temp + " F";
    wind.innerText = "Wind: " + data.current.wind_speed + " mph";
    humidity.innerText = "Humidity: " + data.current.humidity + " %";
    uvIndex.innerText = "UV Index: " + data.current.uvi;
    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(wind);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(uvIndex);
    display5dayweather(data.daily);
}

function display5dayweather(fivedaydata) {
    for (var i = 1; i < 5; i++) {
        console.log(fivedaydata[i])
        var card = document.createElement("div");
        var date = document.createElement("h4");
        date.innerText = moment.unix(fivedaydata[i].dt).format("dddd, MMM Do YYYY");
        card.appendChild(date);
        var image = document.createElement("img");
        var imageUrl = "http://openweathermap.org/img/wn/" + fivedaydata[i].weather[0].icon + ".png"
        var temp = document.createElement("p");
        var wind = document.createElement("p");
        var humidity = document.createElement("p");
        temp.innerText = "Temp: " + fivedaydata[i].temp.day + " F";
        wind.innerText = "Wind Speed: " + fivedaydata[i].wind_speed + " mph";
        humidity.innerText = "Humidity: " + fivedaydata[i].humidity + "%";
        card.appendChild(image)
        card.appendChild(temp)
        card.appendChild(wind)
        card.appendChild(humidity)
        image.setAttribute("src", imageUrl)
        card.classList.add('card', 'col-2', 'm-1', 'bg-primary', 'text-white');
        fivedayWeatherContainer.appendChild(card);

    }
}
//code is breaking for local storage - need to fix this
// function storeCities(city) {
//     searchHistory.push(city);
//     console.log(searchHistory)
//     localStorage.setItem("searchedcity", JSON.stringify(city));
// }

// function displayStoredCities() {
//     console.log(typeof searchHistory)
//     for(var i = 0; i < searchHistory.length; i++) {
//         console.log(searchHistory[i])
//         var btn = document.createElement("button")
//         btn.innerText = searchHistory[i]
//         searchListElement.appendChild(btn)
//     }
// }
// displayStoredCities();


userFormEl.addEventListener("submit", getApi)



