import axios from "axios";
import "@app/utils/header";

const API_LISTING = "https://v2.api.noroff.dev/auction/listings";

async function searchListings(searchTerm) {
  try {
    const response = await axios.get(
      `${API_LISTING}?_seller=true&_active=true&_bids=true&sort=created&_tag=${searchTerm}`
    );

    const token = localStorage.getItem("token");

    const listings = response.data;

    if (!listings.data || listings.data.length === 0) {
      const searchResults = document.querySelector("#listing");
      searchResults.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-500">No listings found matching "${searchTerm}"</p>
        </div>
      `;
      return;
    }

    const searchResults = listings.data.map((item) => {
      const bids = item.bids || [];
      const highestBid = bids.length > 0 
        ? Math.max(...bids.map(bid => bid.amount))
        : 0;

      return `
        <div class="card w-full md:w-[calc(33.33%-1rem)] flex flex-col overflow-hidden rounded-lg border bg-white p-8 shadow-md transition duration-300 hover:bg-gray-100 hover:border-gray-400 cursor-pointer"
          data-id="${item.id}"
        >
          <img
            src="${item.media[0]?.url || "/asset/no-image.png"}"
            alt="${item.media[0]?.alt || "Auction Image"}"
            class="rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <h2 class="mt-4 pb-2 text-lg font-semibold break-words">${item.title}</h2>
          <p class="text-common pb-2">
            Current bid: <span class="font-bold text-gray-700">${highestBid > 0 ? `${highestBid} NOK` : 'No bids yet'}</span>
          </p>
          <p class="text-common pb-2">
            Total bids: <span class="font-bold text-gray-700">${bids.length}</span>
          </p>
          <div class="flex gap-1">
            <p class="text-common">Ends at:</p>
            <p class="text-red-700">${new Date(item.endsAt).toLocaleString()}</p>
          </div>
          <div class="mt-auto">
            <button 
              class="place-bid-button mt-2 rounded bg-green-700 px-4 py-2 font-semibold text-white transition hover:bg-green-500 ${!token ? 'hidden' : ''}"
            >
              Place A Bid
            </button>
          </div>
        </div>
      `;
    });

    const searchResultsContainer = document.querySelector("#listing");
    searchResultsContainer.innerHTML = `
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap pb-6 gap-4">
          ${searchResults.join("")}
        </div>
      </div>
    `;

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const itemId = card.getAttribute("data-id");
        localStorage.setItem("selected-listing", itemId);
        window.location.href = "/single-listing/";
      });
    });

  } catch (error) {
    console.error("Error searching listings:", error);
    const searchResults = document.querySelector("#listing");
    searchResults.innerHTML = `
      <div class="text-center py-8">
        <p class="text-red-500">Error searching listings. Please try again.</p>
      </div>
    `;
  }
}

const searchTerm = localStorage.getItem("searchTerm");
if (searchTerm) {
  searchListings(searchTerm);
}