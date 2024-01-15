document.getElementById('apiButton').addEventListener('click', function () {
  axios
    .get('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
    .then((response) => {
      console.log(response.data.joke);
      const jokeOutput = document.getElementById('jokeOutput');
      jokeOutput.textContent = response.data.joke;
    })
    .catch((error) => console.error('Error:', error));
});

// Add this to your script.js file
document.getElementById('weatherButton').addEventListener('click', function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    axios.get(`https://api.weather.gov/points/${lat},${lon}`)
      .then(function (response) {
        var forecastUrl = response.data.properties.forecast;
        return axios.get(forecastUrl);
      })
      .then(function (response) {
        var forecast = response.data.properties.periods[0];
        document.getElementById('weatherOutput').innerText = `Today's forecast: ${forecast.shortForecast}, temperature: ${forecast.temperature} ${forecast.temperatureUnit}`;
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});