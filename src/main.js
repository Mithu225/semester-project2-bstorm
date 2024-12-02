import "@app/utils/header";
import axios from "axios";

export const API_LISTING = "https://v2.api.noroff.dev/auction/listings";

const userInfo = document.querySelector("#avatar-home");
const introduction = document.querySelector("#introduction");

const creditName = document.querySelector("#credit-username");
const listingsSelector = document.querySelector("#listing");

const getListing = async () => {
  const response = await axios.get(
    `${API_LISTING}?_seller=true&_active=true&sort=created`,
  );

  const listings = response.data;

  const getPosts = listings.data.map(
    (item) => `
          <div
            class="card h-auto flex flex-col flex-1 basis-full md:basis-1/4 xl:basis-1/4 overflow-hidden rounded-lg border bg-white p-8 shadow-md transition duration-300 hover:bg-gray-100 hover:border-gray-400 cursor-pointer"
         data-id="${item.id}" 
            >
            <img
              src="${item.media[0]?.url}"
              alt="${item.media[0]?.alt}"
              class="rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
           
            <h2 class="mt-4 pb-2 text-lg font-semibold break-words">${item.title}</h2>
            <p class="text-common pb-2">
              Current bid: <span class="font-bold text-gray-700">7,068.0$</span>
            </p>
           
          
              <div class="flex text-center gap-1">
                <p class="text-lg text-common">Updated:</p>
                <p class="text-lg text-red-700">${item.updated}</p>
              </div>
              <div class="mt-auto">
          <button 
              class="place-bid-button hidden mt-2 rounded bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
            >
              Place A Bid
            </button>
            </div>
          </div>`,
  );

  listingsSelector.innerHTML = getPosts.join("");

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const itemId = card.getAttribute("data-id");
      localStorage.setItem("selected-listing", itemId);
      window.location.href = "/single-listing/";
    });
  });

  const listingToken = localStorage.getItem("token");
  if (listingToken) {
    const placeBidButtons = document.querySelectorAll(".place-bid-button");
    placeBidButtons.forEach((button) => {
      button.classList.remove("hidden");
    });
  }
};
getListing();

//user status b1

const userFromLocal = localStorage.getItem("user");
const user = userFromLocal != null ? JSON.parse(userFromLocal) : null;

const token = localStorage.getItem("token");

const userName = user?.name;

creditName.innerHTML = userName;
if (token) {
  userInfo.classList.remove("hidden");
} else {
  introduction.classList.remove("hidden");
}

document.getElementById("create-button").addEventListener("click", () => {
  window.location.href = "/create/";
});

const savedAvatarUrl = localStorage.getItem("avatarUrl");


if (savedAvatarUrl) {
  const avatarImageHome = document.querySelector("#avatar-image-home"); // Lấy thẻ img
  if (avatarImageHome) {
    avatarImageHome.src = savedAvatarUrl; 
  }

 
  
}
