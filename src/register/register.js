const registerButtonElm = document.querySelector("#register-button");
const registerFormElm = document.querySelector("#register-form");

registerButtonElm.addEventListener("click", () => {
  registerFormElm.classList.toggle("hidden");
});
