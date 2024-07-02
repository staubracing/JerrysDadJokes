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
