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

  // Fetch all movies
  let allMovies = []

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

      allMovies = movies
      return movies
    } catch (error) {
      console.error("Error fetching movies:", error)
      return []
    }
  }

  // Search functionality
  const searchInput = document.getElementById("search-input")
  const searchBtn = document.getElementById("search-btn")
  const searchResults = document.getElementById("search-results")

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim()

    if (query === "") {
      searchResults.innerHTML = '<div class="no-results">Enter a search term to find movies</div>'
      return
    }

    const results = allMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        (movie.category && movie.category.toLowerCase().includes(query)) ||
        (movie.description && movie.description.toLowerCase().includes(query)),
    )

    displaySearchResults(results)
  }

  function displaySearchResults(results) {
    searchResults.innerHTML = ""

    if (results.length === 0) {
      searchResults.innerHTML = '<div class="no-results">No movies found matching your search</div>'
      return
    }

    results.forEach((movie) => {
      const resultItem = document.createElement("div")
      resultItem.className = "search-result"
      resultItem.dataset.id = movie.id

      // Determine image URL (handle both local and remote paths)
      let imageUrl = movie.image_url
      if (imageUrl && !imageUrl.startsWith("http")) {
        imageUrl = `http://localhost:3000${imageUrl}`
      }

      resultItem.innerHTML = `
        <img src="${imageUrl || "/placeholder.svg?height=300&width=200"}" alt="${movie.title}" class="result-poster">
        <div class="result-info">
          <h3 class="result-title">${movie.title}</h3>
          <p class="result-genre">${movie.category || "Geen categorie"}</p>
          <span class="result-rating">${movie.rating || "4.0"}</span>
        </div>
      `

      resultItem.addEventListener("click", () => {
        localStorage.setItem("selectedMovie", JSON.stringify(movie))
        window.location.href = "movie-details.html"
      })

      searchResults.appendChild(resultItem)
    })
  }

  // Add event listeners
  searchBtn.addEventListener("click", performSearch)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Initialize
  fetchMovies().then(() => {
    searchResults.innerHTML = '<div class="no-results">Enter a search term to find movies</div>'
  })
})

