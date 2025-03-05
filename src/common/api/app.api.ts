"use strict";

import { getPhoneRequest } from "services/getPhone.service";
import { getPhoneNumber, getUserInfo } from "zmp-sdk";
import { getAppInfo as fetchAppInfo } from "zmp-sdk/apis";
import {
  getSetting as fetchAppSetting,
  authorize as fetchAppAuthen,
  getUserID as fetchAppUserId,
  getUserInfo as fetchAppUserInfor,
  openProfile as fetchAppOpenProfile,
} from "zmp-sdk/apis";
export const getInfo = async () => {
  try {
    const { name, version } = await fetchAppInfo({});
  } catch (error) {
    // xử lý khi gọi api thất bại
    return error;
  }
};

export const getSetting = async () => {
  try {
    const data = await fetchAppSetting({});
    return data;
  } catch (error) {
    // xử lý khi gọi api thất bại
    return null;
  }
};
// authentication
export const authorize = async () => {
  try {
    const data = await fetchAppAuthen({
      scopes: ["scope.userPhonenumber"],
    });
    const usid = await getUserID();
    const usif = await getUser();

    if (usif) {
      const data = {
        idZalo: usif.id,
        name: usif.name,
        avatar: usif.avatar,
      };
      // await addNewUser(data);
    }

    await handleOpenProfile();
  } catch (error) {
    // xử lý khi gọi api thất bại
    return null;
  }
};

// getUserID

const getUserID = async () => {
  try {
    const userID = await fetchAppUserId();
  } catch (error) {
    // xử lý khi gọi api thất bại
    return null;
  }
};

// user infor
const getUser = async () => {
  try {
    const { userInfo } = await fetchAppUserInfor({});
    return userInfo;
  } catch (error) {
    // xử lý khi gọi api thất bại
    return null;
  }
};

const handleOpenProfile = async () => {
  try {
    await fetchAppOpenProfile({
      type: "oa",
      id: "oa-id",
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    return null;
  }
};

export const getUserPhoneNumber = async () => {
  try {
    const token = await new Promise<string | undefined>((resolve, reject) => {
      getPhoneNumber({
        success: (data) => {
          resolve(data.token);
        },
        fail: (error) => {
          reject(error);
        },
      });
    });
    const getPhoneWithToken = await getPhoneRequest(token);
    console.log("SĐT: ", getPhoneWithToken);
    return getPhoneWithToken;
  } catch (error) {
    console.error("error:", error);
  }
};

export const getUserWithNameAndAvatar = async () => {
  try {
    const { userInfo } = await getUserInfo({});
    const data = {
      name: userInfo.name,
      avatar: userInfo.avatar
    }
    console.log(data);
    return data;

  } catch (error) {
    console.log(error);
  }
};

