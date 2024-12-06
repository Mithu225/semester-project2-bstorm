import axios from "axios";

export function initSearch() {
  const searchResults = document.querySelector("#listing");
  const searchElm = document.querySelector("#search-button");
  searchElm.addEventListener("click", () => {
    const query = document.querySelector("#search-input").value.trim();
    if (query) {
      axios
        .get(`https://v2.api.noroff.dev/auction/listings/search?q=${query}`)
        .then((response) => {
          const results = response.data.data;

          searchResults.innerHTML = "";

          if (results.length > 0) {
            const resultsList = document.createElement("div");
            resultsList.classList.add("container", "mx-auto", "px-4");
            resultsList.innerHTML = `<div class="flex flex-wrap pb-6 gap-4">
              ${results.map((result) => `
                <div class=" card w-full md:w-[calc(33.33%-1rem)] flex flex-col overflow-hidden rounded-lg border bg-white p-8 shadow-md transition duration-300 hover:bg-gray-100 hover:border-gray-400 cursor-pointer" data-id="${result.id}">
                  <img
                    src="${result.media[0]?.url}"
                    alt="${result.media[0]?.alt}"
                    class="rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <h2 class="mt-4 pb-2 text-lg font-semibold break-words">${result.title}</h2>
                  <p class="text-common pb-2">
                    Current bid: <span class="font-bold text-gray-700">7,068.0$</span>
                  </p>
                  <div class="flex text-center gap-1">
                    <p class="text-common">Updated:</p>
                    <p class="text-red-700">${new Date(result.updated).toLocaleString()}</p>
                  </div>
                  <div class="mt-auto">
                    <button class="place-bid-button mt-2 rounded bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-700">Place A Bid</button>
                  </div>
                </div>
              `).join("")}
            </div>`;

            searchResults.appendChild(resultsList);

            const cards = document.querySelectorAll(".card");
            cards.forEach((card) => {
              card.addEventListener("click", () => {
                const itemId = card.getAttribute("data-id");
                localStorage.setItem("selected-listing", itemId);
                window.location.href = "/single-listing/";
              });
            });




          } else {
            searchResults.innerHTML = `<p>No results were found. "${query}".</p>`;
          }
        })
        .catch((error) => {
          searchResults.innerHTML =
            "<p>An error occurred while searching. Please try again.</p>";
        });
    } else {
      searchResults.innerHTML = `<p>Please enter a search keyword.</p>`;
    }
  });
}
