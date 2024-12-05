import "@app/utils/header";
import axios from "axios";
import { getApiHeaders } from "@app/utils/getApiHeaders";

const getDetailListing = document.querySelector("#detail-listing");
const API_SINGLE_LISTING = "https://v2.api.noroff.dev/auction/listings";

const getSingleListing = async () => {
  const listingId = localStorage.getItem("selected-listing");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  try {
    const response = await axios.get(
      `${API_SINGLE_LISTING}/${listingId}?_seller=true&_bids=true`,
      {
        headers: getApiHeaders()
      }
    );

    const listing = response.data.data;
    
    // Sort bids by date in descending order
    const sortedBids = listing.bids?.sort((a, b) => new Date(b.created) - new Date(a.created)) || [];
    
    console.log('Bids data:', sortedBids); // Debug log to see bid data structure
    
    const detailListingContent = ` 
      <div class="flex w-full p-6">
        <img
          src="${listing.media[0]?.url}"
          alt="${listing.media[0]?.alt || "Auction Image"}"
          class="w-1/3 h-50 rounded-md"
        />
        <div class="flex w-full flex-col p-6 lg:w-2/3">
          <h1 class="mb-2 text-3xl font-bold text-gray-900">${listing.title}</h1>
          <p class="mb-4 text-lg text-gray-600">Description: ${listing.description}</p>
          <p class="mb-4 text-lg text-gray-800">
            Time left:
            <span class="font-bold text-red-500">${new Date(listing.endsAt).toLocaleString()}</span>
          </p>
          <p class="mb-4 text-lg text-gray-800">
            Current Top Bid: <span class="font-semibold">${sortedBids[0]?.amount || "No bids yet"}</span>
          </p>
          ${!token || !user.name ? `
            <p class="mb-4 text-sm text-gray-500">
              <a href="/login/" class="text-blue-600 underline">Login</a> to place your bid
            </p>
          ` : `
            <form id="bid-form" class="flex items-center gap-2 w-1/2">
              <input
                id="bid-amount"
                type="number"
                placeholder="Enter bid amount..."
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                required
                min="1"
              />
              <button
                type="submit"
                class="rounded-lg bg-icon px-6 py-2 font-bold text-gray-900 transition duration-200 hover:bg-yellow-200"
              >
                Bid
              </button>
            </form>
            <div id="bid-message" class="mt-2 hidden"></div>
          `}

          <!-- Bid History Table -->
          <div class="mt-8">
            <h2 class="text-xl font-bold mb-4">Bid History</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="py-2 px-4 text-left">#</th>
                    <th class="py-2 px-4 text-left">Username</th>
                    <th class="py-2 px-4 text-left">Bid at (NOK)</th>
                    <th class="py-2 px-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  ${sortedBids.map((bid, index) => `
                    <tr class="${index % 2 === 0 ? 'bg-gray-50' : ''}">
                      <td class="py-2 px-4">${index + 1}</td>
                      <td class="py-2 px-4">${bid.bidder?.name || 'Anonymous'}</td>
                      <td class="py-2 px-4">${bid.amount}</td>
                      <td class="py-2 px-4">${new Date(bid.created).toLocaleString()}</td>
                    </tr>
                  `).join('')}
                  ${sortedBids.length === 0 ? `
                    <tr>
                      <td colspan="4" class="py-4 text-center text-gray-500">No bids yet</td>
                    </tr>
                  ` : ''}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`;

    getDetailListing.innerHTML = detailListingContent;

    if (token && user.name) {
      const bidForm = document.querySelector("#bid-form");
      if (bidForm) {
        bidForm.addEventListener("submit", async (event) => {
          event.preventDefault();

          const bidAmount = Number(document.querySelector("#bid-amount").value);
          if (!bidAmount || bidAmount <= 0) {
            showMessage("Please enter a valid bid amount!", "error");
            return;
          }

          try {
            const response = await axios({
              method: 'post',
              url: `${API_SINGLE_LISTING}/${listingId}/bids`,
              headers: getApiHeaders(),
              data: {
                amount: bidAmount
              }
            });

            if (response.data.data) {
              showMessage("Bid placed successfully!", "success");
              setTimeout(() => {
                window.location.reload();
              }, 1500);
            }
          } catch (error) {
            console.error("Error placing bid:", error.response?.data);
            const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to place bid. Please try again.";
            showMessage(errorMessage, "error");
          }
        });
      }
    }

    function showMessage(message, type) {
      const bidMessage = document.querySelector("#bid-message");
      if (bidMessage) {
        bidMessage.textContent = message;
        bidMessage.className = `mt-2 p-2 rounded ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`;
        bidMessage.classList.remove("hidden");
      }
    }

  } catch (error) {
    console.error("Error fetching listing:", error);
    getDetailListing.innerHTML = `
      <div class="text-center py-8">
        <p class="text-red-500">Error loading listing. Please try again.</p>
        <a href="/" class="text-blue-500 hover:underline mt-4 inline-block">Return to listings</a>
      </div>`;
  }
};

getSingleListing();
