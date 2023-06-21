var temp_box = document.getElementById("show_temp_h1");
var updating_status = document.getElementById("updating_status");

function getWeatherUpdate(location) {
  // api key for openweathermap.org
  var api_key = "4d8fb5b93d4af21d66a2948710284366";

  // get the weather data from openweathermap.org
  var api_url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=" +
    api_key +
    "&units=metric";

  updating_status.innerHTML = "Updating...";

  // get the weather data from openweathermap.org
  fetch(api_url).then(function (response) {
    response.json().then(function (data) {
      // get the weather data
      var temp = data.main.temp + "°C";
      temp_box.innerHTML = temp;
      updating_status.innerHTML = "last updated at " + getTimeUpdate();
      // console.log("got the response");
    });
  });
  // console.log("hi...");
}

// fetch("https://api.openweathermap.org/data/2.5/weather?q=nagpur&appid=4d8fb5b93d4af21d66a2948710284366&units=metric").then(function (response) {
//     response.json().then(function (data) {
//       // get the weather data
//       var temp = data.main.temp + "°C";
//       console.log(temp);
//     });
//   });

// get current time IST kolkata

function getTimeUpdate() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
}

getWeatherUpdate("nagpur");

// set internal of 5 sec
setInterval(function () {
  getWeatherUpdate("nagpur");
}, 5000);
