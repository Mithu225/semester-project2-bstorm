export const API_KEY = "679572bd-4f7e-4819-8562-67054faf8ad4";

export function getApiHeaders() {
    const headers = {};
    const token = localStorage.getItem("token");
  
    if (API_KEY) {
      headers["X-Noroff-API-Key"] = API_KEY;
    }
  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  
    return headers;
  }