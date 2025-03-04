import { API_LOGIN, API_REGISTER_DATE } from "common/api/path.api";
import axiosInstance from "../../axios";
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
interface ICustomerRegisterReq {
  phoneNumber: string;
  name: string;
  email: string | null;
  avatarUrl: string;
  dynamicData: Record<string, any>;
}
const authApi = {
  login: async (phoneNumber: string): Promise<AuthResponse> => {
    return axiosInstance.post(`${API_LOGIN}`, { phoneNumber });
  },
  register: async (data: ICustomerRegisterReq): Promise<AuthResponse> => {
    return axiosInstance.post(`${API_REGISTER_DATE}`, data);
  },
};
export default authApi;
