import "@app/utils/header";
import axios from "axios";

const API_PROFILE_LISTING =
  "https://v2.api.noroff.dev/auction/listings?_tag=my_tag&_active=true";
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

document.getElementById("create-button").addEventListener("click", () => {
  window.location.href = "/create/index";
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
  const userID = user?.id;
  console.log(user);

  try {
    const response = await axios.get(API_PROFILE_LISTING);
    console.log(response.data);
    const allListings = response.data.data;
    console.log(allListings);

    const userListings = allListings.filter((item) => item.data.id === userID);
    console.log("Bài đăng của người dùng:", userListings);

    displayUserListings(userListings);
  } catch (error) {
    console.error("Error fetching user listings:", error);
  }
};

const displayUserListings = (listings) => {
  if (listings.length === 0) {
    userListingSelector.innerHTML = `<p class="text-gray-500">No active listings found for the selected tag.</p>`;
    return;
  }
  const getUserPosts = listings.map(
    (item) => `
        <div
          class="card h-auto flex flex-col basis-full md:basis-1/3 xl:basis-1/4 overflow-hidden rounded-lg border bg-white p-4 shadow-md transition duration-300 hover:bg-gray-100 hover:border-gray-400 cursor-pointer"
          data-id="${item.id}" 
        >
          <img
            src="${item.media[0]?.url}"
            alt="${item.media[0]?.alt}"
            class="rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <h2 class="mt-4 pb-2 text-lg font-semibold break-words">${item.title}</h2>
          <p class="text-common pb-2">
            Current bid: <span class="font-bold text-gray-700">${item._count?.bids || 0} bids</span>
          </p>
          <div class="flex text-center gap-1">
            <p class=" text-common">Updated:</p>
            <p class=" text-red-700">${new Date(item.updated).toLocaleString()}</p>
          </div>
        </div>`,
  );

  userListingSelector.innerHTML = getUserPosts.join("");
};

getUserListings();
