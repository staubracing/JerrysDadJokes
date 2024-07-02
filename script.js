document.getElementById("jokeButton").addEventListener("click", function () {
  axios
    .get("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      console.log(response.data.joke);
      const jokeOutput = document.getElementById("jokeOutput");
      jokeOutput.textContent = response.data.joke;
    })
    .catch((error) => console.error("Error:", error));
});

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("weatherButton");
//   if (weatherButton) {
//     weatherButton.click();
//   }
//   navigator.geolocation.getCurrentPosition(function (position) {
//     var lat = position.coords.latitude;
//     var lon = position.coords.longitude;

// axios
//   .get(`https://api.weather.gov/points/${lat},${lon}`)
//   .then(function (response) {
//     var forecastUrl = response.data.properties.forecast;
//     var city = response.data.properties.relativeLocation.properties.city;
//     return axios.get(forecastUrl).then(function (forecastResponse) {
//       return { forecast: forecastResponse, city: city };
//     });
//   })
//   .then(function (data) {
//     var forecast = data.forecast.data.properties.periods[0];
//     document.getElementById(
//       "weatherOutput"
//     ).innerText = `In  ${data.city}, Today's forecast is ${forecast.shortForecast}, Temperature: ${forecast.temperature} ${forecast.temperatureUnit}`;
//   })
//   .catch(function (error) {
//     console.log(error);
//       });
//   });
// });
