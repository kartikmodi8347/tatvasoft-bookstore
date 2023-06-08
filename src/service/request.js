// This component exports an instance of Axios, a popular HTTP client library for JavaScript. 
// The `request` object is created with specific configurations such as a base URL, timeout, and response type. 
// It also includes request and response interceptors to handle requests and responses globally.
// The request interceptor adds headers and handles loader display based on the request. 
// The `showLoader()` and `hideLoader()` functions add and remove a CSS class to show and hide a loader element on the webpage.
// The `removeRequest()` function removes completed requests from the tracking list and updates the loader display accordingly. 
// It also handles any conflicting requests that need to be excluded from the tracking list. The module exports the `request` object for use in making API requests.

import axios from "axios";
import { toast } from "react-toastify";

const request = axios.create({
  //  baseURL: "https://web1.anasource.com/BookStore/api/BookStore/", // url = base url + request url
  //   baseURL: "http://localhost:5000/",
  baseURL: "https://book-e-sell-node-api.vercel.app/",
  // baseURL: "https://helperland1.azurewebsites.net/",
  // baseURL: "https://helperland1.azurewebsites.net/",
  //  baseURL: "http://192.168.1.20/",
  timeout: 12400000,
  responseType: "json",
});
// https://book-edsad-sell-node-api.vercel.app/api/user/roles
let requests = [];
let conflictRequest = "";

// Request interceptors Customize based on your need
request.interceptors.request.use(
  async (config) => {
    if (config.headers) {
      config.headers["Content-Type"] = "application/json";
      config.headers["lang"] = "en";
    }

    if (config.headers["isDisableLoader"] !== true) {
      requests.push(config.url);
      showLoader();
    }

    return config;
  },
  (error) => {
    alert(error);
    Promise.reject(error);
  }
);

// Response interceptors Customize based on your need
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    console.log("responseeee,", response);
    removeRequest(response.config.url);
    if (data?.code && data?.code !== 200) {
      toast.error(
        response.data.error ?? "Somthing went wrong. Please try again!"
      );
      return Promise.reject(new Error(data?.error || "Error"));
    } else {
      return Promise.resolve(response.data.result);
    }
  },
  (error) => {
    removeRequest(error.config.url);
    toast.error(error?.response?.data?.error ?? "Somthing went wrong");
    return Promise.reject(error);
  }
);

function showLoader() {
  document.body.classList.add("loader-open");
}

function hideLoader() {
  document.body.classList.remove("loader-open");
}

// remove completed request
function removeRequest(req) {
  const i = requests.indexOf(req);
  if (i >= 0) {
    requests.splice(i, 1);
  }
  if (requests.length > 0) {
    showLoader();
  } else {
    hideLoader();
  }
  if (req === conflictRequest) {
    conflictRequest = "";
    requests = requests.filter((request) => request !== req);
  }
}

export default request;
