import "@app/utils/header";
import axios from "axios";

export const API_LISTING = "https://v2.api.noroff.dev/auction/listings";

const userInfo = document.querySelector("#avatar-home");
const introduction = document.querySelector("#introduction");

const creditName = document.querySelector("#credit-username");
const listingsSelector = document.querySelector("#listing");

const getListing = async () => {
  try {
    const response = await axios.get(
      `${API_LISTING}?_seller=true&_active=true&sort=created&_bids=true`,
    );

    const listings = response.data;

    const getPosts = listings.data.map(
      (item) => {
        // Get the highest bid amount
        const bids = item.bids || [];
        const highestBid = bids.length > 0 
          ? Math.max(...bids.map(bid => bid.amount))
          : 0;

        return `
          <div class="card w-full md:w-[calc(25%-1rem)] flex flex-col overflow-hidden rounded-lg border bg-white p-8 shadow-md transition duration-300 hover:bg-gray-100 hover:border-gray-400 cursor-pointer"
            data-id="${item.id}" 
          >
            <img
              src="${item.media[0]?.url}"
              alt="${item.media[0]?.alt}"
              class="rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
        
            <h2 class="mt-4 pb-2 text-lg font-semibold break-words">${item.title}</h2>
            <p class="text-common pb-2">
              Current bid: <span class="font-bold text-gray-700">${highestBid > 0 ? `${highestBid} NOK` : 'No bids yet'}</span>
            </p>
            <p class="text-common pb-2">
              Total bids: <span class="font-bold text-gray-700">${bids.length}</span>
            </p>
            <div class="flex text-center gap-1">
              <p class="text-common">Ends at:</p>
              <p class="text-red-700">${new Date(item.endsAt).toLocaleString()}</p>
            </div>
            <div class="mt-auto">
              <button 
                class="place-bid-button hidden mt-2 rounded bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
              >
                Place A Bid
              </button>
            </div>
          </div>
        `;
      }
    );

    listingsSelector.innerHTML = `
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap pb-6 gap-4">
          ${getPosts.join("")}
        </div>
      </div>
    `;

    // Add click handlers to cards
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const itemId = card.getAttribute("data-id");
        localStorage.setItem("selected-listing", itemId);
        window.location.href = "/single-listing/";
      });
    });

  } catch (error) {
    console.error("Error fetching listings:", error);
    listingsSelector.innerHTML = `
      <div class="text-center py-8">
        <p class="text-red-500">Error loading listings. Please try again.</p>
      </div>
    `;
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
  const avatarImageHome = document.querySelector("#avatar-image-home");
  if (avatarImageHome) {
    avatarImageHome.src = savedAvatarUrl;
  }
}

const listingToken = localStorage.getItem("token");
if (listingToken) {
  const placeBidButtons = document.querySelectorAll(".place-bid-button");
  placeBidButtons.forEach((button) => {
    button.classList.remove("hidden");
  });
}
