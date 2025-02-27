import axiosInstance from "common/axios";
import { I_SubjectsData, IHomeConfig, IRouteConfig } from "./interFace";
import { API_CONFIG_HOME, API_GET_BLOGS, API_GET_DATA_FORM, API_MOBILE_ROUTE, API_REGISTER_DATE, API_UPDATE_DATE } from "common/api/path.api";

export const getBanner = (): Promise<IHomeConfig> => {
    return axiosInstance.get(API_CONFIG_HOME);
  };

export const getAppRoute = (): Promise<IRouteConfig> => {
    return axiosInstance.get(API_MOBILE_ROUTE);
  };

export const getBlogsBySubject = async (id: string): Promise<I_SubjectsData> => {
  return await axiosInstance.get(API_GET_BLOGS, {
    params: { subjectIds: id },
  });
};

export const getFormDynamic = (): Promise<IHomeConfig> => {
  return axiosInstance.get(API_GET_DATA_FORM);
};

export const updateFormDynamic = (data: {
  name: string;
  email?: string;
  avatarId: number;
  dynamicData: Record<string, any>; 
}): Promise<IHomeConfig> => {
  return axiosInstance.put(API_UPDATE_DATE, data); // 
};

export const registerFormDynamic = (data: {
  name: string;
  email?: string;
  avatarId: number;
  dynamicData: Record<string, any>; 
}): Promise<IHomeConfig> => {
  return axiosInstance.post(API_REGISTER_DATE, data); 
};