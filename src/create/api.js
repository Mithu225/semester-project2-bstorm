export const API_CREATE = "https://v2.api.noroff.dev/auction/listings";



export const API_KEY = "fd96e9be-2185-40c6-86ee-c4f4908c2b7b";
export function getHeaders() {
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
