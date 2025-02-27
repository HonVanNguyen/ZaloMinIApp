// import database from "database/init.firebase";
import { API_GET_SUBJECT } from "common/api/path.api";
import axiosInstance from "common/axios";
import { subjectTitle } from "types/product";
export const getSubjectHome = async (): Promise<subjectTitle[] | null> =>{
  try{
    const response:any = await axiosInstance.get(API_GET_SUBJECT);
    const dataSubject = response;
    const formattedSubjects = dataSubject.items.map((item: any) => ({
      id: item.id,
      name: item.subjectDetails.find((detail: any) => detail.lang === "VN")?.name || "Không có tên",
    }));
    return formattedSubjects;
  }catch(error){
    console.log(error)
    return null;
  }
}