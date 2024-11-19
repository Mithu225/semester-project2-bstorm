import "@app/login/login";
import "@app/register/register";

const closeLoginButtonElm = document.querySelector("#close-login-button");
const loginFormElm = document.querySelector("#login-form");
const registerFormElm = document.querySelector("#register-form");

closeLoginButtonElm.addEventListener("click", () => {
  loginFormElm.classList.add("hidden");
  registerFormElm.classList.add("hidden");
});
const closeRegisterButtonElm = document.querySelector("#close-register-button");
closeRegisterButtonElm.addEventListener("click", () => {
  loginFormElm.classList.add("hidden");
  registerFormElm.classList.add("hidden");
});

//user status b1

const userFromLocal = localStorage.getItem("user");
const user = userFromLocal != null ? JSON.parse(userFromLocal) : null;

const token = localStorage.getItem("token");

const userInfo = document.querySelector("#avatar-home");
const introduction = document.querySelector("#introduction");
const creditName = document.querySelector("#credit-username");
const userName = user.name;

creditName.innerHTML = userName;
if (token) {
  userInfo.classList.remove("hidden");
} else {
  introduction.classList.remove("hidden");
}
