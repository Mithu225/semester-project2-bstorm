export const API_LOGIN = "https://v2.api.noroff.dev/auth/login";

export async function login({ email, password }) {
  const result = await axios.post(API_LOGIN, {
    email: email,
    password: password,
  });
 
  return result.data;
}
