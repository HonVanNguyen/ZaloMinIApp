// export default axiosInstance;
import axios from "axios";
import { setAccessTokenApp } from "pages/index/common/home.slice";
import { store } from "redux/store";
import { nativeStorage } from "zmp-sdk/apis";
import { API_REFRESH_TOKEN } from "common/api/path.api";
// Tạo một instance Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor trước khi gửi request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = nativeStorage.getItem("accessToken");
    // console.log("Check Access Token: ", accessToken);
    const currentState = store?.getState();
    // const accessToken = currentState?.accoun?.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      // const phoneZalo = await MiniZaloService.getPhoneNumber();
      // if(phoneZalo){
      // const accessToken2 =
      // }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
const accessTokenExpiredStatusCode = 1003; // Mã lỗi phụ khi token hết hạn
const unAuthorizedStatusCode = 401; // HTTP 401
// Interceptor sau khi nhận response
axiosInstance.interceptors.response.use(
  (response) => response.data, // Trả về data từ response
  async (error) => {
    const { response, config: originalRequest } = error;
    const isAccessTokenExpired =
      response?.data?.subCode === accessTokenExpiredStatusCode;
    const is401 = response?.status === unAuthorizedStatusCode;

    // Lấy accessToken và refreshToken từ storage
    const accessToken = nativeStorage.getItem("accessToken");
    const refreshToken = nativeStorage.getItem("refreshToken");

    if (is401 && isAccessTokenExpired) {
      return new Promise((resolve, reject) => {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        axiosInstance
          .post(API_REFRESH_TOKEN, { refreshToken }) // API_REFRESH_TOKEN
          .then(async ({ data }) => {
            const newAccessToken = `Bearer ${data?.accessToken}`;
            axiosInstance.defaults.headers.common.Authorization =
              newAccessToken;
            originalRequest.headers.Authorization = newAccessToken;

            // Cập nhật token mới vào Redux hoặc storage
            store?.dispatch(setAccessTokenApp(newAccessToken));
            if (!accessToken || !refreshToken) {
              console.log("Access token or refresh token is not found!");
            }
          })
          .catch(async (error) => {
            reject(error?.response?.data);
          });
      });
    }

    return Promise.reject(error?.response?.data);
  }
);

export default axiosInstance;
