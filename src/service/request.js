import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["Authorization"] = getToken();
    }
    return config;
  },
  (error) => {
    console.log(error); 
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const status = response.status
    if(status < 200 || status>=300 && status !=401 && status!=500){
      msg = showStatus(status)
      if (typeof response.data === 'string') {
        response.data = { msg }
      } else {
        response.data.msg = msg
      }
    }
    const res = response.data;
    if (res.code !== "00000") {
      return Promise.reject(new Error(res.message || "Error"));
    }
    return res;
  },
  (error) => {
    console.log("err" + error);
    return Promise.reject(error);
  }
);

export default service;
