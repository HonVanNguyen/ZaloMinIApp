import { API_GET_BLOGS } from "common/api/path.api";
import axiosInstance from "common/axios";
import { I_SubjectsData } from "pages/index/common/interFace";

export const getBlogsBySubject = async (id: string): Promise<I_SubjectsData> => {
    return await axiosInstance.get(API_GET_BLOGS, {
      params: { subjectIds: id },
    });
  };