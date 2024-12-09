import { initLogin } from "@app/login/login";
import { initRegister } from "@app/register/register";
import { initLogout } from "@app/utils/logout";
import { initSearch } from "./searchBar";

const headerSelector = document.querySelector("header");
const headerContent = `
  <div
    class="flex flex-col items-center justify-between gap-4 bg-common p-2.5 px-5 sm:flex-row"
  >
    <div class="w-full sm:w-auto flex justify-center sm:justify-end">
      <a href="/">
        <img
          class="cursor-pointer"
          src="/asset/bstorm-logo.png"
          alt="bStorm logo"
        />
      </a>
    </div>

    <div
      class="flex w-full items-center justify-center sm:flex-grow sm:justify-start sm:pl-4"
    >
      <div class="relative w-full sm:w-1/2">
        <input
          id="search-input"
          type="text"
          placeholder="Find listing...."
          class="w-full rounded-full border border-gray-300 p-2 text-lg outline-none"
        />
        <button
          id="search-button"
          class="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer border-0 bg-white"
        >
          <ion-icon
            class="text-lg text-common"
            name="search-outline"
          ></ion-icon>
        </button>
      </div>
    </div>

    <div class="flex w-full justify-center sm:w-auto sm:justify-end">
      <div class="flex items-center gap-2 pr-8">
        <button
          id="profile-button"
          class="hidden h-10 w-10 cursor-pointer rounded-md border-0 bg-icon p-1 text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-gray-200"
        >
          <ion-icon
            class="cursor-pointer text-white"
            size="large"
            name="person-outline"
          ></ion-icon>
        </button>
        <button
          id="login-button"
          class="h-10 w-10 cursor-pointer rounded-md border-0 bg-icon p-1 text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-gray-200"
        >
          <ion-icon
            class="cursor-pointer text-white"
            size="large"
            name="log-in-outline"
          ></ion-icon>
        </button>
        <button
          id="logout-button"
          class="h-10 w-10 cursor-pointer rounded-md border-0 bg-icon p-1 text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-gray-200"
        >
          <ion-icon
            class="cursor-pointer text-white"
            size="large"
            name="log-out-outline"
          ></ion-icon>
        </button>
      </div>
    </div>
  </div>
<div id="login-form" class="hidden">
          <div
            class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-75"
          >
            <div class="relative flex flex-grow items-center justify-center">
              <div class="relative flex w-3/4 rounded-lg border bg-common pb-6">
                <button
                  id="close-login-button"
                  class="absolute right-2 top-2 h-10 w-10 cursor-pointer rounded-md border-0 p-1 text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-gray-200"
                >
                  <ion-icon
                    class="cursor-pointer text-icon"
                    size="large"
                    name="close-outline"
                  ></ion-icon>
                </button>
                <div class="flex-1 rounded-lg p-6 text-white">
                  <div class="text-center">
                      <img
                      class="mx-auto mb-2 cursor-pointer"
                      src="/public/asset/bstorm-logo.png"
                      alt="bStorm logo"
                    />


                    <h1 class="mt-2 text-center text-white">
                      Bid Strong Win Stronger
                    </h1>
                  </div>

                  <form
                    class="mx-auto flex max-w-[40rem] flex-col pt-4 text-lg"
                    name="login"
                  >
                    <div
                      class="flex w-full flex-col gap-4 px-8 py-0 text-left sm:px-0"
                    >
                      <label class="text-white" for="email">Email</label>
                      <input
                        class="mb-4 rounded-md border-2 border-transparent bg-origin-border p-2 text-base text-black [background-clip:padding-box,border-box]"
                        id="email-login"
                        type="email"
                        name="email"
                        placeholder="mail@stud.noroff.no"
                        required
                      />

                      <label class="text-white" for="password">Password</label>
                      <input
                        class="mb-4 rounded-md border-2 border-transparent bg-origin-border p-2 text-base text-black [background-clip:padding-box,border-box]"
                        type="password"
                        name="password"
                        id="password-login"
                        minlength="8"
                        placeholder="Min 08 characters"
                        required
                      />
                    </div>
                    <div id="errors" class="text-red-500"></div>
                    <div class="p-8 text-center">
                      <button
                        id="login-submit-button"
                        type="submit"
                        class="cursor-pointer rounded-lg bg-icon px-4 py-2 text-common"
                      >
                        log in
                      </button>
                    </div>
                    <hr class="my-4 border-white" />
                    <div class="flex justify-center gap-4 pt-4">
                      <p class="text-white">Ready to register?</p>
                      <button
                        id="register-button"
                        type="button"
                        class="cursor-pointer rounded-lg bg-icon px-4 py-2 text-common"
                      >
                        register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="register-form" class="hidden">
          <div
            class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-75"
          >
            <div class="relative flex flex-grow items-center justify-center">
              <div
                class="relative flex w-3/4 items-center justify-center rounded-lg border bg-common pb-6 text-center"
              >
                <button
                  id="close-register-button"
                  class="absolute right-2 top-2 h-10 w-10 cursor-pointer rounded-md border-0 p-1 text-lg font-bold transition-colors duration-300 ease-in-out hover:bg-gray-200"
                >
                  <ion-icon
                    class="cursor-pointer text-icon"
                    size="large"
                    name="close-outline"
                  ></ion-icon>
                </button>
                <div class="flex-1 rounded-lg p-6 text-white">
                  <div class="text-center">
                    <img
                      class="mx-auto mb-2 cursor-pointer"
                      src="/public/asset/bstorm-logo.png"
                      alt="bStorm logo"
                    />

                    <h1 class="m-0 text-center text-white">
                      Bid Strong Win Stronger
                    </h1>
                  </div>
                  <form
                    class="mx-auto flex max-w-[40rem] flex-col pt-4 text-lg"
                    name="register"
                  >
                    <div
                      class="flex w-full flex-col gap-4 px-8 py-0 text-left sm:px-0"
                    >
                      <label class="text-white" for="username">User</label>
                      <input
                        class="mb-4 rounded-md border-2 border-transparent bg-origin-border p-2 text-base text-black [background-clip:padding-box,border-box]"
                        id="username"
                        type="username"
                        name="name"
                        maxlength="20"
                        pattern="^[a-zA-Z0-9_]+$"
                        title="Please enter a username using only letters and numbers"
                        placeholder="Max 20 characters"
                        required
                      />
                      <label class="text-white" for="email">Email</label>
                      <input
                        class="mb-4 rounded-md border-2 border-transparent bg-origin-border p-2 text-base text-black [background-clip:padding-box,border-box]"
                        id="email-register"
                        type="email"
                        name="email"
                        placeholder="mail@stud.noroff.no"
                        required
                      />

                      <label class="text-white" for="password">Password</label>
                      <input
                        class="mb-4 rounded-md border-2 border-transparent bg-origin-border p-2 text-base text-black [background-clip:padding-box,border-box]"
                        type="password"
                        name="password"
                        id="password-register"
                        minlength="8"
                        placeholder="Min 08 characters"
                        required
                      />
                    </div>
                    <div id="errors-register" class="text-red-500"></div>
                    <div class="p-8 text-center">
                      <button
                        id="register-submit-button"
                        type="submit"
                        class="cursor-pointer rounded-lg bg-icon px-6 pt-0 text-common"
                      >
                        register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="register-success-popup" class="hidden">
          <div
            class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
          >
            <div class="max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
              <h2 class="mb-2 text-2xl font-bold text-green-600">
                Registration Successful!
              </h2>
              <p class="mb-4 text-gray-700">Welcome to the platform.</p>
              <button
                id="close-popup"
                class="rounded bg-icon px-4 py-2 font-bold text-white hover:bg-gray-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
`;

headerSelector.innerHTML = headerContent;
initLogin();
initRegister();
initSearch();
initLogout();

const profileListingButton = document.querySelector("#profile-button");
if (profileListingButton) {
  profileListingButton.addEventListener("click", () => {
    window.location.href = "/profile/";
  });
}

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

const logoutButton = document.querySelector("#logout-button");
logoutButton.addEventListener("click", () => {

  const userData = JSON.parse(localStorage.getItem("user"));
  const userCredits = userData?.credits;
  const userEmail = userData?.email;
  
 
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  
 
  if (userCredits && userEmail) {
    localStorage.setItem("lastUserCredits", JSON.stringify({
      email: userEmail,
      credits: userCredits
    }));
  }
  
  window.location.href = "/";
});
