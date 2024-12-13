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
    
    const sortedBids = listing.bids?.sort((a, b) => new Date(b.created) - new Date(a.created)) || [];
    
    
    
    const detailListingContent = ` 
      <div class="flex flex-col w-full p-6 gap-8">
        <div class="flex w-full">
          <div class="w-2/5">
            <div class="aspect-[16/9] w-full pt-6">
              <img
                src="${listing.media[0]?.url || "/assets/no-image.png"}"
                alt="${listing.media[0]?.alt || "Auction Image"}"
                class="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
          <div class="flex w-3/5 flex-col p-6">
            <h1 class="mb-2 text-3xl font-bold text-gray-900">${listing.title}</h1>
            <p class="mb-4 text-lg text-gray-600">Description: ${listing.description}</p>
            <p class="mb-4 text-lg text-gray-800">
              Time left:
              <span class="font-bold text-red-700">${new Date(listing.endsAt).toLocaleString()}</span>
            </p>
            <p class="mb-4 text-lg text-gray-800">
              Current Top Bid: <span class="font-semibold">${sortedBids[0]?.amount || "No bids yet"}</span>
            </p>
            ${!token || !user.name ? `
              <p class="mb-4 text-sm text-gray-500">
                <a id="login-link" class="cursor-pointer text-blue-600 underline">Login</a> to place your bid
              </p>
            ` : `
              <form id="bid-form" class="flex flex-col gap-2 w-full">
                <div class="flex flex-col md:flex-row items-center gap-2">
                  <label for="bid-amount" class="hidden text-sm font-medium text-gray-700">Bid Amount (NOK)</label>
                  <input
                    id="bid-amount"
                    type="number"
                    placeholder="Enter bid (NOK)"
                    class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 text-lg"
                    required
                    min="1"
                    max="999999999999"
                  />
                  <button
                    type="submit"
                    class="w-full md:w-auto rounded-lg bg-icon px-6 py-2 font-bold text-gray-900 transition duration-200 hover:bg-yellow-200"
                  >
                    Bid
                  </button>
                </div>
                <div id="bid-message" class="mt-2 hidden"></div>
              </form>
            `}
          </div>
        </div>

        <!-- Bid History Table in a new row -->
        <div class="w-full bg-white rounded-lg shadow">
          <h2 class="text-xl font-bold p-4 border-b">Bid History</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid at (NOK)</th>
                  <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${sortedBids.map((bid, index) => `
                  <tr class="${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 transition-colors duration-150">
                    <td class="py-3 px-4 whitespace-nowrap">${index + 1}</td>
                    <td class="py-3 px-4 whitespace-nowrap">${bid.bidder?.name || 'Anonymous'}</td>
                    <td class="py-3 px-4 whitespace-nowrap font-medium">${bid.amount}</td>
                    <td class="py-3 px-4 whitespace-nowrap">${new Date(bid.created).toLocaleString()}</td>
                  </tr>
                `).join('')}
                ${sortedBids.length === 0 ? `
                  <tr>
                    <td colspan="4" class="py-8 text-center text-gray-500">No bids yet</td>
                  </tr>
                ` : ''}
              </tbody>
            </table>
          </div>
        </div>
      </div>`;

    getDetailListing.innerHTML = detailListingContent;
    const loginLink = document.querySelector("#login-link");
    const loginFormElm = document.querySelector("#login-form");
    loginLink?.addEventListener("click", () => {
      loginFormElm.classList.toggle("hidden");
    }); 


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

         
          const userData = JSON.parse(localStorage.getItem("user"));
          const userCredits = userData?.credits || 1000;
          
          if (bidAmount > userCredits) {
            showMessage(`Insufficient credits. You have ${userCredits} NOK available.`, "error");
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
             
              userData.credits -= bidAmount;
              localStorage.setItem("user", JSON.stringify(userData));
              
              
              localStorage.setItem(`userCredits_${userData.email}`, JSON.stringify({ 
                credits: userData.credits 
              }));

             
              const creditDisplay = document.getElementById("credit-profile");
              if (creditDisplay) {
                creditDisplay.textContent = `Credits: ${userData.credits} NOK`;
              }

              
              if (window.updateCreditDisplay) {
                window.updateCreditDisplay();
              }

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
