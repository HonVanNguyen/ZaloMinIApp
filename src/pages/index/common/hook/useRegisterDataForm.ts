import { useMutation } from 'react-query';
import { registerFormDynamic, updateFormDynamic } from '../services'; // Hàm gọi API PUT
import { QUERY_KEYS } from 'common/constants/queryKeys.constant';
import { store } from 'redux/store';
import {
	setStorage as setZaloStore,
  } from "zmp-sdk/apis";
import { setAccessTokenApp } from '../home.slice';
export const useRegisterFormDynamic = () => {
  return useMutation<any, Error, { 
    name: string; 
    email?: string; 
    avatarId?: number; 
    dynamicData: Record<string, any>; 
  }>(
    registerFormDynamic, // Hàm gọi API PUT
    {
      mutationKey: QUERY_KEYS.DATA_DYNAMIC_FORM, // Cache key
      retry: 1, // Optional: số lần retry khi lỗi
      onSuccess: async (data) => {
        // Xử lý logic khi API thành công
        console.log('Đăng ký thành thành công:');
        const { accessToken, refreshToken} = data;

        store?.dispatch(setAccessTokenApp(accessToken));

        const { errorKeys } = await setZaloStore({
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken
          },
        });
        if (errorKeys) {
          console.log("Error keys:", errorKeys);
        }
      },
      onError: (error: Error) => {
        // Xử lý logic khi API lỗi
        console.error('Đăng ký thất bại:', error.message);
      },
    }
  );
};
