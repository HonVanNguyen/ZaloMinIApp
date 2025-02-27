import { useMutation } from 'react-query';
import { updateFormDynamic } from '../services'; // Hàm gọi API PUT
import { QUERY_KEYS } from 'common/constants/queryKeys.constant';

export const useUpdateFormDynamic = () => {
  return useMutation<any, Error, { 
    name: string; 
    email?: string; 
    avatarId?: number; 
    dynamicData: Record<string, any>; 
  }>(
    updateFormDynamic, // Hàm gọi API PUT
    {
      mutationKey: QUERY_KEYS.DATA_DYNAMIC_FORM, // Cache key
      retry: 1, // Optional: số lần retry khi lỗi
      onSuccess: (data) => {
        // Xử lý logic khi API thành công
        console.log('Cập nhật thành công:', data);
      },
      onError: (error: Error) => {
        // Xử lý logic khi API lỗi
        console.error('Cập nhật thất bại:', error.message);
      },
    }
  );
};
