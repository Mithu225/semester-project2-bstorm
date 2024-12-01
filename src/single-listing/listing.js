import "@app/utils/header";

import axios from "axios";

const getDetailListing = document.querySelector("#detail-listing");
const API_SINGLE_LISTING = "https://v2.api.noroff.dev/auction/listings";

const getSingleListing = async () => {
  const listingId = localStorage.getItem("selected-listing");

  const response = await axios.get(
    `${API_SINGLE_LISTING}/${listingId}?_seller=true&_bids=true`,
  );

  const listing = response.data.data;
  console.log(listing);
  const detailListingContent = ` 
    <div class="flex max-w-4xl flex-col overflow-hidden rounded-lg lg:flex-row">
      <div class="image-container"></div>
      <img
        src="${listing.media[0]?.url}"
        alt="${listing.media[0]?.alt}"
        class="h-auto max-w-full p-6"
      />

      <div class="flex w-full flex-col justify-between p-6 lg:w-1/2">
        <h1 class="mb-2 text-3xl font-bold text-gray-900">${listing.title}</h1>

        <p class="mb-6 text-gray-600">
          ${listing.description}
        </p>

        <p class="mb-4 text-lg text-gray-800">
          Time left:
          <span class="font-bold text-red-500">
            ${listing.endsAt}
          </span>
        </p>

        <p class="mb-6 text-lg text-gray-800">
          Top bid: <span class="font-semibold">${listing._count}</span>
        </p>

        <form class="flex items-center gap-2">
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

        <p class="mt-4 text-center text-sm text-gray-500">
          <a href="#" class="text-blue-600 underline">
            Login
          </a>{" "}
          to place your bid
        </p>
      </div>
    
  </div>;`;

  getDetailListing.innerHTML = detailListingContent;
};
getSingleListing();
