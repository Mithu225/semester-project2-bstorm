import "@app/utils/header";
import axios from "axios";

const getDetailListing = document.querySelector("#detail-listing");
const API_SINGLE_LISTING = "https://v2.api.noroff.dev/auction/listings";

const getSingleListing = async () => {
  const listingId = localStorage.getItem("selected-listing");

  try {
    const response = await axios.get(
      `${API_SINGLE_LISTING}/${listingId}?_seller=true&_bids=true`,
    );

    const listing = response.data.data;
    

    const detailListingContent = ` 
      <div class="flex w-full p-6">
        <img
          src="${listing.media[0]?.url}"
          alt="${listing.media[0]?.alt || "Auction Image"}"
          class="w-1/3 h-auto rounded-md"
        />
        <div class="flex w-full flex-col p-6 lg:w-2/3">
          <h1 class="mb-2 text-3xl font-bold text-gray-900">${listing.title}</h1>
          <p class="mb-4 text-gray-600">${listing.description}</p>
          <p class="mb-4 text-lg text-gray-800">
            Time left:
            <span class="font-bold text-red-500">${new Date(listing.endsAt).toLocaleString()}</span>
          </p>
          <p class="mb-4 text-lg text-gray-800">
            Top bid: <span class="font-semibold">${listing._count}</span>
          </p>
          <p id="login-to-bid" class="mb-4 text-sm text-gray-500">
            Login to place your bid
          </p>
          <form class="flex items-center gap-2 w-1/2">
            <input
              type="text"
              placeholder="Offered price...."
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <button
              type="submit"
              class="rounded-lg bg-icon px-6 py-2 font-bold text-gray-900 transition duration-200 hover:bg-yellow-200"
            >
              Bid
            </button>
          </form>
        </div>
      </div>`;

   
    getDetailListing.innerHTML = detailListingContent;

    
    const BidLoginToken = localStorage.getItem("token");
    if (BidLoginToken) {
      const bidLoginMessage = document.querySelector("#login-to-bid");
      if (bidLoginMessage) {
        bidLoginMessage.classList.add("hidden");
      }
    }
  } catch (error) {
    console.error("Error fetching listing:", error);
  }
};

getSingleListing();
