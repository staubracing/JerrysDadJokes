document.getElementById('apiButton').addEventListener('click', function () {
  axios
    .get('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
    .then((response) => {
      // Select the jokeOutput div and update its textContent with the new joke
      const jokeOutput = document.getElementById('jokeOutput');
      jokeOutput.textContent = response.data.joke;
    })
    .catch((error) => console.error('Error:', error));
});