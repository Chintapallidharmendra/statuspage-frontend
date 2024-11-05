let _SERVER_BACKEND_URL = "http://127.0.0.1:8000/api/";

if (process.env.NODE_ENV === "production") {
  // TODO: Update the production URL
  _SERVER_BACKEND_URL = "http://3.110.27.238:8000/api/";
}

export const SERVER_BACKEND_URL = _SERVER_BACKEND_URL;
