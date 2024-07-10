let jokeCount = 0;
let favorites = [];

document.addEventListener("DOMContentLoaded", () => {
  const jokeButton = document.getElementById("jokeButton");
  const jokeOutput = document.getElementById("jokeOutput");
  const addFavoriteButton = document.getElementById("addFavoriteButton");
  const favoritesList = document.getElementById("favoritesList");

  jokeButton.addEventListener("click", fetchNewJoke);
  addFavoriteButton.addEventListener("click", addFavorite);

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
    })
    .catch((error) => console.error("Error:", error));
}

function updateJokeCount() {
  document.getElementById("jokeCount").textContent = jokeCount;
}

function addFavorite() {
  const jokeId = jokeOutput.dataset.jokeId;
  const jokeText = jokeOutput.textContent;

  if (!favorites.some((fav) => fav.id === jokeId)) {
    favorites.push({ id: jokeId, text: jokeText });
    updateFavoritesList();
  }
}

function removeFavorite(jokeId) {
  const index = favorites.findIndex((fav) => fav.id === jokeId);
  if (index > -1) {
    favorites.splice(index, 1);
    updateFavoritesList();
  }
}

function updateFavoritesList() {
  favoritesList.innerHTML = "";
  favorites.forEach((fav) => {
    const li = document.createElement("li");
    li.textContent = fav.text;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-favorite-button";
    removeButton.addEventListener("click", () => removeFavorite(fav.id));

    li.appendChild(removeButton);
    favoritesList.appendChild(li);
  });
}
