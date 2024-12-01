import "@app/utils/header";

const updateAvatarBtn = document.querySelector("#update-avatar-button");
const avatarUpdateForm = document.querySelector("#update-avatar-form");

const closeUpdateBtn = document.querySelector("#close-update-button");

updateAvatarBtn.addEventListener("click", () => {
  avatarUpdateForm.classList.toggle("hidden");
});

closeUpdateBtn.addEventListener("click", () => {
  avatarUpdateForm.classList.add("hidden");
});

document.getElementById("create-button").addEventListener("click", () => {
  window.location.href = "/create/index";
});

const avatarUrlInput = document.querySelector("#avatar-url-input");
const updateAvatarSubmitBtn = document.querySelector(
  "#update-avatar-submit-button",
);
const avatarImage = document.querySelector("#avatar-image");
updateAvatarSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const newAvatarUrl = avatarUrlInput.value.trim();
  if (newAvatarUrl) {
    avatarImage.src = newAvatarUrl;
    localStorage.setItem("avatarUrl", newAvatarUrl);
    alert("Avatar updated successfully!");
  } else {
    alert("Please enter a valid image URL.");
  }
});

const savedAvatarUrl = localStorage.getItem("avatarUrl");

if (savedAvatarUrl) {
  avatarImage.src = savedAvatarUrl;
}
