"use strict";

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
