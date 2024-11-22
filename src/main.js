import "@app/login/login";
import "@app/register/register";
import axios from "axios";

export const API_LISTING = "https://v2.api.noroff.dev/auction/listings";

const listingSelector = document.querySelector("#listing");
const getListing = async () => {
  const response = await axios.get(
    `${API_LISTING}?_seller=true&_active=true&sort=created`,
  );
  // {
  //   title: title,
  //   description: description,
  //   tags: tags.split(","),
  //   media: [
  //     {
  //       url: url,
  //       alt: alt,
  //     },
  //   ],
  //   endsAt: new Date(date).toISOString(),
  // });
  console.log(response.data);
  const listing = response.data;

  const getSinglePost = listing.data.map(
    (item) => `
          <div
            class="flex-1 basis-full md:basis-1/3 xl:basis-1/4 overflow-hidden rounded-lg border bg-white p-8 shadow-md transition duration-300 hover:bg-gray-100 hover:border-gray-400"
          >
            <img
              src="${item.media[0]?.url}"
              alt="${item.media[0]?.alt}"
              class="rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
           
            <h2 class="mt-4 pb-2 text-lg font-semibold">${item.title}</h2>
            <p class="text-common pb-2">
              Current bid: <span class="font-bold text-gray-700">7,068.0$</span>
            </p>
           
          
              <div class="flex text-center gap-1">
                <p class="text-lg text-common">Updated:</p>
                <p class="text-lg text-red-700">${item.updated}</p>
              </div>
          <button
              class="mt-2 rounded bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
            >
              Place A Bid
            </button>
            
          </div>`,
  );

  listingSelector.innerHTML = getSinglePost.join("");
};
getListing();

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

document.getElementById("create-button").addEventListener("click", () => {
  window.location.href = "/create/";
});

/////show post

// async function displayPost() {
//   try {
//     const user = getLoggedUser();

//     const id = localStorage.getItem("single-post-id");
//     if (!id) {
//       throw new Error("No post ID found in localStorage");
//     }
//     const { data: item } = await singlePost(id);

//     const respone =
//     document.getElementById("post-container").innerHTML = respone;
//   } catch (error) {
//     console.error("Failed to fetch the post:", error);
//   }

//   handlePostButtons();

//   handleHeaderButtons();
// }

// displayPost();
