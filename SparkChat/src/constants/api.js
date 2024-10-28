import axios from "axios";

const SERVER_URI = import.meta.env.VITE_BACKEND_URI;
// const SERVER_URL = process.env.BACKEND_URI
// console(process.env)

export const api = axios.create({
  baseURL: SERVER_URI,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response ? error.response.data : error.message
    );
    return Promise.reject(error);
  }
);

// Export endpoints

// AUTHS
export const LOGIN = `/api/auth/signin`;
export const SEND_OTP = `/api/auth/send-otp`;
export const VERIFY_OTP = `/api/auth/verify-otp`;
export const SIGNUP = `/api/auth/signup`;
export const LOGOUT_USER = `/api/auth/logout`;

// CONTACTS
export const SEARCH_USER = `/api/contact/search`;
export const GET_CONTACT_DM = `/api/contact/get-contact`;

// USERS
export const GET_USER = `/api/user/getuser`;
export const UPDATE_USER = `/api/user/update-profile`;
export const DELETE_USER = `/api/user/delete-profile`;

// MESSAGES
export const GET_MESSAGES = `/api/chat/get-messages`;
export const DELETE_MESSAGES = `/api/chat/delete-messages`;
export const UPLOAD_FILE = `/api/chat/upload-file`;

// red #ff4f5b  gray #375a64
