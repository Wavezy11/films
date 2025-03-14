document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "index.html"
    return
  }

  // Get selected movie from localStorage
  const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"))

  if (!selectedMovie) {
    window.location.href = "home.html"
    return
  }

  // Set movie details
  document.title = `MovieFlix - ${selectedMovie.title}`
  document.getElementById("movie-title").textContent = selectedMovie.title
  document.getElementById("movie-type").textContent = "Movie"
  document.getElementById("movie-genres").textContent = selectedMovie.category || "Geen categorie"
  document.getElementById("movie-rating").textContent = selectedMovie.rating || "4.0"
  document.getElementById("movie-description").textContent =
    selectedMovie.description || "Geen beschrijving beschikbaar."

  // Set backdrop image
  const movieBackdrop = document.querySelector(".movie-backdrop")

  // Determine image URL (handle both local and remote paths)
  let imageUrl = selectedMovie.image_url
  if (imageUrl && !imageUrl.startsWith("http")) {
    imageUrl = `http://localhost:3000${imageUrl}`
  }

  movieBackdrop.style.backgroundImage = `url('${imageUrl || "/placeholder.svg?height=500&width=1000"}')`

  // Populate cast
  const castList = document.getElementById("cast-list")
  castList.innerHTML = ""

  if (selectedMovie.cast && selectedMovie.cast.length > 0) {
    const castContainer = document.createElement("div")
    castContainer.className = "cast-list"

    selectedMovie.cast.forEach((actor) => {
      const castItem = document.createElement("div")
      castItem.className = "cast-item"

      castItem.innerHTML = `
        <img src="/placeholder.svg?height=100&width=100" alt="${actor}" class="cast-photo">
        <p class="cast-name">${actor}</p>
      `

      castContainer.appendChild(castItem)
    })

    castList.appendChild(castContainer)
  } else {
    castList.innerHTML = "<p>Geen cast informatie beschikbaar</p>"
  }

  // Watch button functionality
  const watchBtn = document.querySelector(".watch-btn")
  watchBtn.addEventListener("click", () => {
    // If there's a trailer URL, open it
    if (selectedMovie.url_trailer) {
      window.open(selectedMovie.url_trailer, "_blank")
    } else {
      alert(`Starting playback for ${selectedMovie.title}`)
    }

    // Add to watched list
    const watchedMovies = JSON.parse(localStorage.getItem("watchedMovies") || "[]")

    // Check if movie is already in watched list
    if (!watchedMovies.some((movie) => movie.id === selectedMovie.id)) {
      watchedMovies.push(selectedMovie)
      localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies))
    }
  })
})

