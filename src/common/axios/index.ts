
// export default axiosInstance;
import axios from 'axios';
import { API_REFRESH_TOKEN } from 'common/api/path.api';
import { setAccessTokenApp } from 'pages/index/common/home.slice';
import { store } from 'redux/store';
import {
  getStorage as getZaloStore,
  nativeStorage,
  setStorage as setZaloStore,
} from "zmp-sdk/apis";
// Tạo một instance Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor trước khi gửi request
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    const currentState = store?.getState();
    // const accessToken = currentState?.accoun?.accessToken;
    const accessToken = "";
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else{
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
    const isAccessTokenExpired = response?.data?.subCode === accessTokenExpiredStatusCode;
    const is401 = response?.status === unAuthorizedStatusCode;

    // const { refreshToken, accessToken } = await getZaloStore({
      //   keys: ["accessToken", "refreshToken" ],
      // });
      
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
            axiosInstance.defaults.headers.common.Authorization = newAccessToken;
            originalRequest.headers.Authorization = newAccessToken;

            // Cập nhật token mới vào Redux hoặc storage
            store?.dispatch(setAccessTokenApp(newAccessToken));
            const tokenMissing = !accessToken || !refreshToken;
            switch (tokenMissing) {
              case true:
                console.log("Token is missing");                
                break;
              case false:
                console.log("Token is available");
                break;
              default:
                break;
            }

            // const { errorKeys } = await setZaloStore({
            //   data: {
            //     accessToken: data?.accessToken,
            //     refreshToken: data?.refreshToken
            //   },
            // });
            // if (errorKeys) {
            //   console.log("Error keys:", errorKeys);
            // }
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
