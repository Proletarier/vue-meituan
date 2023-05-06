import context from "@/main";
import axios from "axios";
import { getToken } from "@/common/cookies";
import { getStore } from "@/common/utils";
import { STATUS_CONFIG, API_CODES } from "./config";
import { processingUrl } from "./processing";

axios.defaults.withCredentials = true;

const request = async ({ url, method = "get" } = {}, params = {}) => {
  const location = getStore("location");
  const result = await axios({
    url: processingUrl(url, params),
    method,
    [method.toUpperCase() === "GET" ? "params" : "data"]: { ...params },
    headers: {
      Authorization: getToken(),
      ...(location ? { Location: location } : {}),
    },
    baseURL: process.env.VUE_APP_BASE_API,
  })
    .then((response) => {
      if (response.status == 200) {
        const { data, code, message } = response?.data;
        if (code === "Success") {
          return data || true;
        } else {
          context.$message.error(API_CODES[code] || message || "请求出错");
          return false;
        }
      } else if (response.status) {
        if (response.status == 401) {
          window.location.href = "/logout";
        } else {
          context.$message.error("当前会话过期");
          return false;
        }
      } else {
        window.location.href = "/logout";
      }
    })
    .catch((error) => {
      context.$message.error(error.message);
      return false;
    });
  return result;
};

export default request;
