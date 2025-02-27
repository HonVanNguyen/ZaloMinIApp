"use strict";
import {
  authorize as fetchAppAuthen,
  getUserInfo as fetchAppUserInfor,
  followOA as fetchAppUserFollowOA,
} from "zmp-sdk/apis";
import ApiService from "../../services/common.api";
import { GetSettingReturn } from "zmp-sdk";

class MiniZaloService {
  async getConfig() {
    try {
      // await ApiService.clearData();
      // const follow = async () => {
      //   try {
      //     await fetchAppUserFollowOA({
      //       id: import.meta.env.VITE_IP_OA,
      //     });
      //   } catch (error) {
      //     // xử lý khi gọi api thất bại
      //     console.log(error);
      //   }
      // };
      // follow();
      const settingApi = (await ApiService.getSettingApi()) as
        | GetSettingReturn
        | undefined;
      if (settingApi) {
        if(settingApi?.authSetting["scope.userInfo"] || settingApi?.authSetting["scope.userPhonenumber"]){
          return;
        }
        await fetchAppAuthen({
          scopes: ["scope.userInfo", "scope.userPhonenumber"],
        });
      }
    } catch (error) {
      console.error("Error during authorization:", error);
    }
  }


  //   get information user
  async getPhoneNumber() {
    try {

      // const settingApi = (await ApiService.getSettingApi()) as
      //   | GetSettingReturn
      //   | undefined;
      // if (settingApi) {
      //   if(settingApi?.authSetting["scope.userPhonenumber"]){
      //     console.log('da cap quyen')
      //     return;
      //   }
      // }
      try{

        // const settingApi = (await ApiService.getSettingApi()) as
        //   | GetSettingReturn
        //   | undefined;
        // if (settingApi) {
        //   if(settingApi?.authSetting["scope.userInfo"] || settingApi?.authSetting["scope.userPhonenumber"]){
        //     return;
        //   }
          
        // }
        await fetchAppAuthen({
          scopes: ["scope.userInfo", "scope.userPhonenumber"],
        });
        const mobileNumber = await ApiService.getPhoneNumber();
  
        console.log("Lấy số điện thoại thành công.", mobileNumber);
  
        return mobileNumber;
      }catch(error){
        console.log('error', error)
        return;
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  }
}

export default new MiniZaloService();
