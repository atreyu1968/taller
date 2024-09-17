// frontend/src/services/authService.js
const API_URL = "http://localhost:8000/auth/login";

const login = async (username, password) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: username,
      password: password,
    }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return await response.json();
};

const authService = {
  login,
};

export default authService;

