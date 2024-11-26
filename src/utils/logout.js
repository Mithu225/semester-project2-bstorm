import "@app/main";
const logoutButtonElm = document.querySelector("#logout-button");
logoutButtonElm.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  alert("You have been logged out successfully!");
  introduction.classList.remove("hidden");
  window.location.href = "/";
});
