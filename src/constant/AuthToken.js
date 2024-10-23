export const authToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))?.accessToken
  : null;
