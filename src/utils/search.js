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
            resultsList.classList.add(
              "flex",
              "flex-wrap",
              "gap-4",
              "items-stretch",
            );
            results.forEach((result) => {
              const listItem = document.createElement("div");
              listItem.classList.add("flex", "flex-1", "items-stretch");
              listItem.style.flexBasis = "calc(33.333% - 16px)";
              (listItem.innerHTML = `
              <div
            class="flex flex-col h-auto flex-1 basis-full md:basis-1/4 xl:basis-1/4 overflow-hidden rounded-lg border bg-white p-8 shadow-md transition duration-300 hover:bg-gray-100 hover:border-gray-400"
          >
            <img
              src="${result.media[0]?.url}"
              alt="${result.media[0]?.alt}"
              class="rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
           
            <h2 class="mt-4 pb-2 text-lg font-semibold w-64 break-words">${result.title}</h2>
            <p class="text-common pb-2">
              Current bid: <span class="font-bold text-gray-700">7,068.0$</span>
            </p>
           
          
              <div class="flex text-center gap-1">
                <p class="text-common">Updated:</p>
                <p class="text-red-700">${result.updated}</p>
              </div>
              <div class="mt-auto">
          <button
              class="mt-2 rounded bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
            >
              Place A Bid
            </button>
            </div>
          </div>`),
                resultsList.appendChild(listItem);
            });

            searchResults.appendChild(resultsList);
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
