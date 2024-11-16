// document.querySelector("#app").innerHTML = `
//   <div>
//     <a href="/login">login</a> |
//     <a href="/profile">profile</a>
//   </div>
// `;

const loginButtonElm = document.querySelector("#login-button");
const loginFormElm = document.querySelector("#login-form");

loginButtonElm.addEventListener("click", () => {
  loginFormElm.classList.toggle("hidden");
});

const registerButtonElm = document.querySelector("#register-button");
const registerFormElm = document.querySelector("#register-form");

registerButtonElm.addEventListener("click", () => {
  loginFormElm.classList.toggle("hidden");
  registerFormElm.classList.toggle("hidden");
});

const closeLoginButtonElm = document.querySelector("#close-login-button");

closeLoginButtonElm.addEventListener("click", () => {
  loginFormElm.classList.add("hidden");
  registerFormElm.classList.add("hidden");
});
const closeRegisterButtonElm = document.querySelector("#close-register-button");
closeRegisterButtonElm.addEventListener("click", () => {
  loginFormElm.classList.add("hidden");
  registerFormElm.classList.add("hidden");
});
