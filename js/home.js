document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "index.html"
    return
  }

  // API endpoints
  const localAPI = "http://localhost:3000/films"
  const remoteAPI = "https://project-bioscoop-restservice.azurewebsites.net/list/P76BWGQysAgp5rxw"

  // Fetch movies from API
  async function fetchMovies() {
    try {
      // Try local API first
      let response = await fetch(localAPI)
      let movies = await response.json()

      // If local API fails or returns empty, try remote API
      if (!movies || movies.length === 0) {
        response = await fetch(remoteAPI)
        movies = await response.json()
      }

      return movies
    } catch (error) {
      console.error("Error fetching movies:", error)
      return []
    }
  }

  // Filter movies by genre
  function filterMoviesByGenre(movies, genre) {
    if (genre === "action") {
      return movies.filter((movie) => movie.category && movie.category.toLowerCase().includes("actie"))
    } else if (genre === "comedy") {
      return movies.filter((movie) => movie.category && movie.category.toLowerCase().includes("comedy"))
    } else if (genre === "arthouse") {
      return movies.filter((movie) => movie.category && movie.category.toLowerCase().includes("arthouse"))
    }
    return movies
  }

  // Display movies in the container
  function displayMovies(movies) {
    const moviesContainer = document.querySelector(".movies-container")
    moviesContainer.innerHTML = ""

    if (movies.length === 0) {
      moviesContainer.innerHTML = '<p class="no-movies">Geen films gevonden in deze categorie</p>'
      return
    }

    movies.forEach((movie) => {
      const movieCard = document.createElement("div")
      movieCard.className = "movie-card"
      movieCard.dataset.id = movie.id

      // Determine image URL (handle both local and remote paths)
      let imageUrl = movie.image_url
      if (imageUrl && !imageUrl.startsWith("http")) {
        imageUrl = `http://localhost:3000${imageUrl}`
      }

      movieCard.innerHTML = `
        <img src="${imageUrl || "/placeholder.svg?height=300&width=200"}" alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-genre">${movie.category || "Geen categorie"}</p>
          <span class="movie-rating">${movie.rating || "4.0"}</span>
        </div>
      `

      movieCard.addEventListener("click", () => {
        localStorage.setItem("selectedMovie", JSON.stringify(movie))
        window.location.href = "movie-details.html"
      })

      moviesContainer.appendChild(movieCard)
    })
  }

  // Initialize with all movies
  async function initializeMovies() {
    const movies = await fetchMovies()

    // Initially show all movies
    displayMovies(movies)

    // Add event listeners to genre tabs
    const genreTabs = document.querySelectorAll(".genre-tab")
    genreTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        genreTabs.forEach((t) => t.classList.remove("active"))
        // Add active class to clicked tab
        tab.classList.add("active")

        // Filter and display movies
        const genre = tab.dataset.genre
        const filteredMovies = filterMoviesByGenre(movies, genre)
        displayMovies(filteredMovies)
      })
    })
  }

  // Start loading movies
  initializeMovies()
})

