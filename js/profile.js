document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.href = "index.html"
    return
  }

  // Set user name
  const userName = localStorage.getItem("userName") || "User"
  document.getElementById("user-name").textContent = userName

  // Get user stats
  const watchedMovies = JSON.parse(localStorage.getItem("watchedMovies") || "[]")
  const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
  const votes = JSON.parse(localStorage.getItem("votes") || "[]")

  // Update stats display
  document.getElementById("watched-count").textContent = watchedMovies.length
  document.getElementById("watchlist-count").textContent = watchlist.length
  document.getElementById("votes-count").textContent = votes.length

  // API endpoints
  const localAPI = "http://localhost:3000/films"
  const remoteAPI = "https://project-bioscoop-restservice.azurewebsites.net/list/P76BWGQysAgp5rxw"
  const voteAPI = "https://project-bioscoop-restservice.azurewebsites.net/vote/P76BWGQysAgp5rxw/"

  // Fetch movies for voting
  async function fetchMoviesForVoting() {
    try {
      // Try local API first
      let response = await fetch(localAPI)
      let movies = await response.json()

      // If local API fails or returns empty, try remote API
      if (!movies || movies.length === 0) {
        response = await fetch(remoteAPI)
        movies = await response.json()
      }

      // Limit to 9 movies for voting
      return movies.slice(0, 9)
    } catch (error) {
      console.error("Error fetching movies for voting:", error)
      return []
    }
  }

  // Display voting options
  async function displayVotingOptions() {
    const votingMovies = await fetchMoviesForVoting()
    const votingContainer = document.getElementById("voting-container")
    votingContainer.innerHTML = ""

    if (votingMovies.length === 0) {
      votingContainer.innerHTML = "<p>Geen films beschikbaar om op te stemmen</p>"
      return
    }

    votingMovies.forEach((movie) => {
      const voteCard = document.createElement("div")
      voteCard.className = "vote-card"
      voteCard.dataset.id = movie.id

      // Determine image URL (handle both local and remote paths)
      let imageUrl = movie.image_url
      if (imageUrl && !imageUrl.startsWith("http")) {
        imageUrl = `http://localhost:3000${imageUrl}`
      }

      // Check if user has already voted for this movie
      const hasVoted = votes.some((vote) => vote.id === movie.id)

      voteCard.innerHTML = `
        <img src="${imageUrl || "/placeholder.svg?height=200&width=150"}" alt="${movie.title}" class="vote-poster">
        <div class="vote-info">
          <h3 class="vote-title">${movie.title}</h3>
          <button class="vote-btn ${hasVoted ? "voted" : ""}">${hasVoted ? "Voted" : "Stem"}</button>
        </div>
      `

      votingContainer.appendChild(voteCard)
    })

    // Add event listeners to vote buttons
    const voteButtons = document.querySelectorAll(".vote-btn")
    voteButtons.forEach((button) => {
      button.addEventListener("click", async function (e) {
        e.stopPropagation()

        const voteCard = this.closest(".vote-card")
        const movieId = voteCard.dataset.id
        const movieTitle = voteCard.querySelector(".vote-title").textContent

        // Get current votes
        const votes = JSON.parse(localStorage.getItem("votes") || "[]")

        // Check if already voted
        const existingVoteIndex = votes.findIndex((vote) => vote.id === movieId)

        if (existingVoteIndex !== -1) {
          // Remove vote (only locally, API doesn't support removing votes)
          votes.splice(existingVoteIndex, 1)
          this.textContent = "Stem"
          this.classList.remove("voted")
        } else {
          // Add vote
          try {
            // Try to vote via API
            const response = await fetch(`${voteAPI}${movieId}`, {
              method: "PUT",
            })

            if (response.ok) {
              console.log("Vote registered with API successfully")
            } else {
              console.warn("Could not register vote with API, storing locally only")
            }
          } catch (error) {
            console.error("Error voting via API:", error)
          }

          // Store vote locally regardless of API success
          votes.push({
            id: movieId,
            title: movieTitle,
          })
          this.textContent = "Voted"
          this.classList.add("voted")
        }

        // Save votes
        localStorage.setItem("votes", JSON.stringify(votes))

        // Update vote count
        document.getElementById("votes-count").textContent = votes.length
      })
    })
  }

  // Initialize voting section
  displayVotingOptions()

  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn")
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    window.location.href = "index.html"
  })
})

