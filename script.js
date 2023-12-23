document.getElementById('apiButton').addEventListener('click', function () {
  const existingJoke = document.querySelector('.joke');

  if (existingJoke) {
    existingJoke.remove();
  }

  axios
    .get('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
    .then((response) => {
      const p = document.createElement('p');
      p.textContent = response.data.joke;
      p.className = 'joke'; // Assign the class 'joke' to the paragraph
      document.body.appendChild(p);
    })
    .catch((error) => console.error('Error:', error));
});
