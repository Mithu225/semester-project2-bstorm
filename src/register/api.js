export const API_REGISTER = "https://v2.api.noroff.dev/auth/register";

export async function register({ name, email, password }) {
  const result = await axios.post(API_REGISTER, {
    name: name,
    email: email,
    password: password,
  });

  return result.data;
}
