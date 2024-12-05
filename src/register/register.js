import axios from "axios";
export function initRegister() {

const API_REGISTER = "https://v2.api.noroff.dev/auth/register";
const registerButtonElm = document.querySelector("#register-button");
const registerFormElm = document.querySelector("#register-form");

registerButtonElm.addEventListener("click", () => {
  registerFormElm.classList.toggle("hidden");
});

const registerForm = document.forms.register;
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = event.target.elements["name"].value;
  const email = event.target.elements["email"].value;
  const password = event.target.elements["password"].value;

  try {
    const response = await axios.post(API_REGISTER, {
      name: name,
      email: email,
      password: password,
    });

    const popupMessageElm = document.querySelector("#register-success-popup");
    popupMessageElm.classList.remove("hidden");

    const closePopupButton = document.querySelector("#close-popup");
    closePopupButton.addEventListener("click", () => {
      popupMessageElm.classList.add("hidden");
      window.location.href = "/";
    });
  } catch (error) {
    const errors = error.response.data.errors;
    const errorsElm = document.getElementById("errors-register");
    const newErrors = errors.map((item) => {
      return `<p>${item.message}</p>`;
    });
    errorsElm.innerHTML = newErrors;
    
  }
});
}
