let jokeCount = 0;
let favorites = [];

document.addEventListener("DOMContentLoaded", () => {
  const jokeButton = document.getElementById("jokeButton");
  const jokeOutput = document.getElementById("jokeOutput");
  const addFavoriteButton = document.getElementById("addFavoriteButton");
  const favoritesList = document.getElementById("favoritesList");

  jokeButton.addEventListener("click", fetchNewJoke);
  addFavoriteButton.addEventListener("click", addFavorite);

  loadFavoritesFromLocalStorage();
  loadJokeCountFromLocalStorage();

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
      saveJokeCountToLocalStorage();
      updateJokeCount();
    })
    .catch((error) => console.error("Error:", error));
}

function updateJokeCount() {
  document.getElementById("jokeCount").textContent = jokeCount;
}

function saveJokeCountToLocalStorage() {
  localStorage.setItem("jokeCount", jokeCount.toString());
}

function saveFavoritesToLocalStorage() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function loadFavoritesFromLocalStorage() {
  const savedFavorites = localStorage.getItem("favorites");
  if (savedFavorites) {
    favorites = JSON.parse(savedFavorites);
    updateFavoritesList();
  } else {
    console.log("No favorites found in local storage.");
  }
}

function loadJokeCountFromLocalStorage() {
  const savedJokeCount = localStorage.getItem("jokeCount");
  if (savedJokeCount) {
    jokeCount = parseInt(savedJokeCount, 10);
    updateJokeCount();
  }
}

function addFavorite() {
  const jokeId = jokeOutput.dataset.jokeId;
  const jokeText = jokeOutput.textContent;

  if (!favorites.some((fav) => fav.id === jokeId)) {
    favorites.push({ id: jokeId, text: jokeText });
    saveFavoritesToLocalStorage();
    updateFavoritesList();
  }
}

function removeFavorite(jokeId) {
  const index = favorites.findIndex((fav) => fav.id === jokeId);
  if (index > -1) {
    favorites.splice(index, 1);
    saveFavoritesToLocalStorage();
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
