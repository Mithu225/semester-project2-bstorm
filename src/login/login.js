import axios from "axios";

export function initLogin() {
  const loginButtonElm = document.querySelector("#login-button");
  const loginFormElm = document.querySelector("#login-form");
  const profileButton = document.querySelector("#profile-button")

  if (localStorage.getItem("token")) {
    profileButton.classList.remove("hidden");
  }

  loginButtonElm.addEventListener("click", () => {
    loginFormElm.classList.toggle("hidden");
   
  });

  //// b1
  const loginForm = document.forms.login;
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;
    //// end b1
    ////b2
    try {
      const response = await axios.post(
        "https://v2.api.noroff.dev/auth/login",
        {
          email: email,
          password: password,
        },
      );
      ///end b2
      //b3.1
      const result = response.data;
      const accessToken = result.data.accessToken;
      localStorage.setItem("token", result.data.accessToken);
      localStorage.setItem("user", JSON.stringify(result.data));
      profileButton.classList.remove("hidden");
      window.location.reload();
      ///endb3.1
      ///b3.2
    } catch (error) {
      const errors = error.response.data.errors;
      const errorsElm = document.getElementById("errors");

      const newErrors = errors.map((item) => {
        return `<p>${item.message}</p>`;
      });

      errorsElm.innerHTML = newErrors;
    }
  });
  ///end b3.2
}
