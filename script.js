let jokeCount = 0;
let favorites = [];

document.addEventListener("DOMContentLoaded", () => {
  const jokeButton = document.getElementById("jokeButton");
  const jokeOutput = document.getElementById("jokeOutput");
  const favoriteButton = document.getElementById("favoriteButton");
  const favoritesList = document.getElementById("favoritesList");

  jokeButton.addEventListener("click", fetchNewJoke);
  favoriteButton.addEventListener("click", toggleFavorite);

  fetchNewJoke();
});

function fetchNewJoke() {
  axios
    .get("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    })
    .then((response) => {
      console.log(response.data.joke);
      jokeOutput.textContent = response.data.joke;
      jokeOutput.dataset.jokeId = response.data.id;
      jokeCount++;
      updateJokeCount();
      updateFavoriteButton();
    })
    .catch((error) => console.error("Error:", error));
}

function updateJokeCount() {
  document.getElementById("jokeCount").textContent = jokeCount;
}

function toggleFavorite() {
  const jokeId = jokeOutput.dataset.jokeId;
  const jokeText = jokeOutput.textContent;

  const index = favorites.findIndex((fav) => fav.id === jokeId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push({ id: jokeId, text: jokeText });
  }

  updateFavoriteButton();
  updateFavoritesList();
}

function updateFavoriteButton() {
  const jokeId = jokeOutput.dataset.jokeId;
  const isFavorite = favorites.some((fav) => fav.id === jokeId);
  favoriteButton.textContent = isFavorite ? "Remove from Favorites" : "Add to Favorites";
}

function updateFavoritesList() {
  favoritesList.innerHTML = "";
  favorites.forEach((fav) => {
    const li = document.createElement("li");
    li.textContent = fav.text;
    favoritesList.appendChild(li);
  });
}
