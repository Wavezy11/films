document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Normally this would be handled by the PHP script
      // This is just for demo purposes
      console.log("Login attempt:", email, password)

      // Simulate login success
      // In a real app, this would be handled by the PHP response
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)

      // Redirect to home page
      window.location.href = "home.html"
    })
  }
})

