"use strict";
import {
  setStorage as setZaloStore,
  getStorage as getZaloStore,
  getSetting as getZaloSetting,
  clearStorage as clearZaloStorage,
  getPhoneNumber as getPhoneZaloNumber,
  getAccessToken as getZaloAccessToken,
} from "zmp-sdk/apis";
import { getPhoneRequest } from "./getPhone.service";
import { GetPhoneNumberReturns } from "zmp-sdk";
import { IUserApp } from "pages/index/common/interFace";

class ApiService {
  //  set data to storage of client
  async setDataToStorage(data: any, forInfo: string) {
    try {
      switch (forInfo) {
        case "userInfo": {
          const { errorKeys } = await setZaloStore({
            data: {
              idUser: data?.id,
              name: data?.name,
              phone: data?.phone,
              position: data?.position,
              major: data?.major,
              address: data?.address,
              address_2: data?.address_2,
              avatar: data?.avatar,
            },
          });
          if (errorKeys) {
            console.log("Error keys:", errorKeys);
          }

          return true;
        }
        case "accessToken": {
          const { errorKeys } = await setZaloStore({
            data: {
              accessToken: data?.accessToken,
              refreshToken: data?.refreshToken,
            },
          });
          if (errorKeys) {
            console.log("Error keys:", errorKeys);
          }
          // break;
          return true;
        }
        case "phoneNumber": {
          const { errorKeys } = await setZaloStore({
            data: {
              phoneNumber: data,
            },
          });
          if (errorKeys) {
            console.log("Error keys:", errorKeys);
          }
          // break;
          return true;
        }
        default:
          console.log(`No action defined for ${forInfo}`);
          return true;
      }
    } catch (error) {
      // console.log(error);
      return false;
    }
  }
  //  get data save in cache from client
  async getDataFromStore(forInfo: string) {
    try {
      const {
        idUser,
        name,
        phone,
        position,
        major,
        address,
        address_2,
        avatar,
      } = await getZaloStore({
        keys: [
          "idUser",
          "name",
          "phone",
          "position",
          "major",
          "address",
          "address_2",
          "avatar",
        ],
      });
      const data = {
        idUser,
        name,
        phone,
        position,
        major,
        address,
        address_2,
        avatar,
      };
      if (data) {
        return data;
      } else {
        console.log(`No data found for ${forInfo}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching data from storage:", error);
      return [];
    }
  }

  //  get data save in cache from client
  async getDataAuthStore() {
    try {
      const { accessToken, refreshToken } = await getZaloStore({
        keys: ["accessToken", "refreshToken"],
      });
      const data = { accessToken, refreshToken };
      if (data) {
        return data;
      } else {
        console.log(`No data found for auth: accessToken, refreshToken`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching data from storage:", error);
      return [];
    }
  }

  //  get data save in cache from client
  async getPhoneStore() {
    try {
      const { phoneNumber } = await getZaloStore({
        keys: ["phoneNumber"],
      });
      const data = { phoneNumber };
      if (data) {
        return data;
      } else {
        console.log(`No data found for auth: phoneNumber`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching data from storage:", error);
      return [];
    }
  }

  async getAccessTokenFromStore() {
    try {
      const { accessToken } = await getZaloStore({
        keys: ["accessToken"],
      });
      const data = { accessToken };
      if (data) {
        return data;
      } else {
        console.log(`No data found for Accesstoken`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching data from storage:", error);
      return [];
    }
  }
  // get setting of zalo about permision
  async getSettingApi() {
    try {
      const data = await getZaloSetting({});
      return data;
    } catch (error) {
      // xử lý khi gọi api thất bại
      return [];
    }
  }

  //

  async getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      getPhoneZaloNumber({
        success: (data: GetPhoneNumberReturns) => {
          let { token } = data;
          if (token) {
            resolve(token); // Resolve the promise with the token
          } else {
            resolve("no token");
          }
        },
        fail: (error: any) => {
          resolve("no token"); // Resolve with a fallback value
        },
      });
    });
  }

  // getphone
  async getPhoneNumber() {
    try {
      const tokenUser = await this.getToken();
      if (tokenUser) {
        const mobile = await getPhoneRequest(tokenUser);
        return mobile;
      } else {
        return "cant get mobile phone";
      }
    } catch (error) {
      // Handle error during the process
      // console.error("Failed to get phone number:", error);
      return "cant get mobile phone";
    }
  }

  // get access token

  async getAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      getZaloAccessToken({
        success: (accessToken: string) => {
          // Successfully retrieved the access token
          resolve(accessToken); // Resolve the promise with the access token
        },
        fail: (error: any) => {
          // Failed to retrieve the access token
          resolve("no-access token"); // Resolve with a fallback value
        },
      });
    });
  }

  // Clear data saved from client
  async clearData() {
    try {
      await clearZaloStorage({});
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  }
}

export default new ApiService();
