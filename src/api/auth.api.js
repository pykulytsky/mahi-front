import http from "./axios";

const signIn = (formData) =>
  http.post("/access-token", formData, {
    "Content-Type": "application/x-www-form-urlencoded",
  });

export {
    signIn
}
