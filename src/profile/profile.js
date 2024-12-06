// Check if user is logged in and get user data
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token) {
  alert("Please log in to view your profile listings.");
  window.location.href = "/";
}

import { getApiHeaders } from "@app/utils/getApiHeaders";
import "@app/utils/header";
import axios from "axios";

const API_PROFILE =
  "https://v2.api.noroff.dev/auction/profiles";
const userListingSelector = document.querySelector("#profile-listings");

const updateAvatarBtn = document.querySelector("#update-avatar-button");
const avatarUpdateForm = document.querySelector("#update-avatar-form");

const closeUpdateBtn = document.querySelector("#close-update-button");

updateAvatarBtn.addEventListener("click", () => {
  avatarUpdateForm.classList.toggle("hidden");
});

closeUpdateBtn.addEventListener("click", () => {
  avatarUpdateForm.classList.add("hidden");
});

const avatarUrlInput = document.querySelector("#avatar-url-input");
const updateAvatarSubmitBtn = document.querySelector(
  "#update-avatar-submit-button",
);
const avatarImage = document.querySelector("#avatar-image");
updateAvatarSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const newAvatarUrl = avatarUrlInput.value.trim();
  if (newAvatarUrl) {
    avatarImage.src = newAvatarUrl;
    localStorage.setItem("avatarUrl", newAvatarUrl);
    alert("Avatar updated successfully!");
  } else {
    alert("Please enter a valid image URL.");
  }
});

const savedAvatarUrl = localStorage.getItem("avatarUrl");

if (savedAvatarUrl) {
  avatarImage.src = savedAvatarUrl;
}

const getUserFromLocalStorage = () => {
  const userFromLocal = localStorage.getItem("user");
  return userFromLocal ? JSON.parse(userFromLocal) : null;
};

const getUserListings = async () => {
  const user = getUserFromLocalStorage();
  const username = user?.name;
  const token = localStorage.getItem("token");

  if (!username || !token) {
    userListingSelector.innerHTML = `<p class="text-gray-500">Please log in to view your listings.</p>`;
    return;
  }

  try {
    const response = await axios.get(`${API_PROFILE}/${username}/listings?_active=true`, {
      headers: getApiHeaders()
    });
    const listings = response.data.data;
    
    if (!listings || listings.length === 0) {
      userListingSelector.innerHTML = `<p class="text-gray-500 text-center">You haven't created any listings yet.</p>`;
      return;
    }
    
    displayUserListings(listings);
  } catch (error) {
    console.error("Error fetching user listings:", error);
    userListingSelector.innerHTML = `<p class="text-red-500">Error loading listings. Please try again later.</p>`;
  }
};

const displayUserListings = (listings) => {
  if (listings.length === 0) {
    userListingSelector.innerHTML = `<p class="text-gray-500">No active listings found.</p>`;
    return;
  }
  const getUserPosts = listings.map(
    (item) => `
          <div class="listing-card w-full md:w-[calc(33.33%-1rem)] flex flex-col overflow-hidden rounded-lg border bg-white p-8 shadow-md transition duration-300 hover:bg-gray-100 hover:border-gray-400 cursor-pointer" data-id="${item.id}">
            <img
              src="${item.media[0]?.url || "/asset/no-image.png"}"
              alt="${item.media[0]?.alt || "Auction Image"}"
              class="rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <h2 class="mt-4 pb-2 text-lg font-semibold break-words">${item.title}</h2>
            <p class="text-common pb-2">Description: ${item.description}</p>
            <div class="flex gap-1">
              <p class="text-common">Ends at:</p>
              <p class="text-red-700">${new Date(item.endsAt).toLocaleString()}</p>
            </div>
          </div>`,
  );

  userListingSelector.innerHTML = `<div class="container mx-auto px-4">
    <div class="flex flex-wrap pb-6 gap-4">${getUserPosts.join("")}</div>
    </div>`;


  const listingCards = document.querySelectorAll('.listing-card');
  listingCards.forEach(card => {
    card.addEventListener('click', () => {
      const listingId = card.getAttribute('data-id');
      localStorage.setItem('selected-listing', listingId);
      window.location.href = '/single-listing/';
    });
  });
};

// Update username and credits in profile page
const usernameElement = document.getElementById("username-profile");
const creditElement = document.getElementById("credit-profile");

if (usernameElement && user) {
  usernameElement.textContent = user.name;
}

if (creditElement && user) {
  creditElement.textContent = `Credits: ${user.credits || 1000} NOK`;
}

// Function to update credits display
function updateCredits() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const creditDisplay = document.getElementById("credit-profile");
  if (creditDisplay && currentUser?.credits !== undefined) {
    creditDisplay.textContent = `Credits: ${currentUser.credits} NOK`;
  }
}

// Initial credit update
updateCredits();

// Update credits every time profile page is focused
window.addEventListener('focus', updateCredits);

// Add create button functionality
const createButton = document.getElementById("create-button");
if (createButton) {
  createButton.addEventListener("click", () => {
    window.location.href = "/create/";
  });
}

getUserListings();
