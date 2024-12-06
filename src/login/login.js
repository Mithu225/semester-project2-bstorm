import axios from "axios";
const API_LOGIN = "https://v2.api.noroff.dev/auth/login";

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

  const loginForm = document.forms.login;
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;
  
    try {
      const response = await axios.post(
        API_LOGIN,
        {
          email: email,
          password: password,
        },
      );
     
      if (response.status === 200) {
        const result = response.data;
        const accessToken = result.data.accessToken;
        
        
        const storedUserData = localStorage.getItem(`userCredits_${email}`);
        let userCredits = 1000; 
        
        if (storedUserData) {
          userCredits = JSON.parse(storedUserData).credits;
        }
        
       
        const userData = {
          ...result.data,
          credits: userCredits
        };
        
        
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(userData));
        
       
        localStorage.setItem(`userCredits_${email}`, JSON.stringify({ credits: userCredits }));
        
        profileButton.classList.remove("hidden");
        window.location.reload();
      }
      
    } catch (error) {
      const errors = error.response.data.errors;
      const errorsElm = document.getElementById("errors");

      const newErrors = errors.map((item) => {
        return `<p>${item.message}</p>`;
      });

      errorsElm.innerHTML = newErrors;
    }
  });
  
}
