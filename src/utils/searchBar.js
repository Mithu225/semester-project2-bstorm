export function initSearch() {
    const searchButton = document.querySelector("#search-button");
    const searchInput = document.querySelector("#search-input");
  
    if (!searchButton || !searchInput) {
      console.error("Search elements not found");
      return;
    }
  
    
    searchButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        localStorage.setItem("searchTerm", searchTerm);
        window.location.href = "/search/";
      }
    });
  
    
    searchInput.addEventListener("keypress", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
           localStorage.setItem("searchTerm", searchTerm);
           window.location.href = "/search/";
        }
      }
    });
  }
  

  