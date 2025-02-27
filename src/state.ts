import { atom, selector } from "recoil";
import { getSubjectHome } from "services/product.service";
import logo from "static/logo.png";
import { Notification } from "types/notification";
import { Product, subjectTitle } from "types/product";
import { getPhoneNumber } from "zmp-sdk";

import { API_CURRENT_USER, API_LOGIN } from "common/api/path.api";
import axiosInstance from "common/axios";
import { IUserInfoZalo, SectionDataHome } from "pages/index/common/interFace";
import { store } from "redux/store";
import { I_Blogs } from "types/blog";
// service
//
import {
  getStorage as getZaloStore,
  removeStorage,
  setStorage as setZaloStore,
} from "zmp-sdk/apis";
import { setAccessTokenApp } from "pages/index/common/home.slice";
//

export const userState = selector({
  key: "user",

  get: async () => {
    try {
      // const { userInfo } = await getUserInfo({ autoRequestPermission: true });
      const userInfo = await localStorage.getItem("userLogin");
      return userInfo;
    } catch (error) {
      return {
        id: "",
        avatar: "",
        name: "Người dùng Zalo",
      };
    }
  },
});

// phoneNumber
export const storePhoneNumber = selector<string | null>({
  key: "storePhoneNumber",
  get: async () => {
    try {
      const { phoneNumber } = await getZaloStore({
        keys: ["phoneNumber"],
      });
      if (!phoneNumber) {
        return null;
      }
      return phoneNumber;
    } catch (error) {
      console.error("Error reading from localStorage or parsing data:", error);
      return null;
    }
  },
});
// IUserApp
export const useInfoApp = selector<any | null>({
  key: "useInfoApp",
  get: async () => {
    try {
      // const phoneNumber  = "0987654321";
      // const phoneNumber = await MiniZaloService.getPhoneNumber();
      const { phoneNumber } = await getZaloStore({
        keys: ["phoneNumber"],
      });
      if (!phoneNumber) {
        await removeStorage({
          keys: ["userDataLogin"],
        });
        return null;
      }
      const response: any = await axiosInstance.post(API_LOGIN, {
        phoneNumber: phoneNumber,
      });
      const { accessToken, refreshToken } = response;

      store?.dispatch(setAccessTokenApp(accessToken));

      const { errorKeys } = await setZaloStore({
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
      if (errorKeys) {
        console.log("Error keys:", errorKeys);
      }

      const currentUser = await axiosInstance.get(API_CURRENT_USER);
      await setZaloStore({
        data: {
          userDataLogin: currentUser,
        },
      });
      return currentUser;
    } catch (error) {
      console.error("Error reading from localStorage or parsing data:", error);
      await removeStorage({
        keys: ["userDataLogin"],
      });
      return null;
    }
  },
});

// get subject
export const getSubject = selector<subjectTitle[]>({
  key: "getSubjectTitle",
  get: async () => {
    const subjects = await getSubjectHome();
    return subjects || [];
  },
});

// state blogs

export const notificationsState = atom<Notification[]>({
  key: "notifications",
  default: [
    {
      id: 1,
      image: logo,
      title: "Chào bạn mới",
      content:
        "Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng",
    },
    {
      id: 2,
      image: logo,
      title: "Xin chào",
      content: "Nhập WELCOME để được giảm 90% giá trị đơn hàng đầu tiên order",
    },
  ],
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const selectedStoreIndexState = atom({
  key: "selectedStoreIndex",
  default: 0,
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      const { number, token } = await getPhoneNumber({ fail: console.warn });
      if (number) {
        return number;
      }
      console.warn(
        "Sử dụng token này để truy xuất số điện thoại của người dùng",
        token
      );
      console.warn(
        "Chi tiết tham khảo: ",
        "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
      );
      console.warn("Giả lập số điện thoại mặc định: 0337076898");
      return "0337076898";
    }
    return false;
  },
});

export const blogs = atom<I_Blogs[]>({
  key: "blogsList",
  default: [
    {
      id: "1",
      for: "Dành cho bác sĩ",
      title: "Blogs for customer",
      subTitle: "Chào bạn mới",
      image: logo,
      dateCreate: new Date(),
      content:
        "Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng",
    },
    {
      id: "1",
      for: "Dành cho bác sĩ",
      title: "Blogs for customer",
      subTitle: "Chào bạn mới",
      image: logo,
      dateCreate: new Date(),
      content:
        "Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng",
    },
  ],
});

export const itemBlogs = atom<I_Blogs>({
  key: "blogItem",
  default: {
    id: "1",
    for: "Dành cho bác sĩ",
    title: "Blogs for customer",
    subTitle: "Chào bạn mới",
    image: logo,
    dateCreate: new Date(),
    content:
      "Cảm ơn đã sử dụng ZaUI Coffee, bạn có thể dùng ứng dụng này để tiết kiệm thời gian xây dựng",
  },
});

export const forTitle = atom<string>({
  key: "keyTitle",
  default: "Dành cho bác sĩ",
});

export const selectSubject = atom<string>({
  key: "selectSubject",
  default: "1",
});

export const bannerHome = atom<SectionDataHome>({
  key: "bannerHome",
  default: {
    id: "1",
    data: [],
    type: "BANNER",
    title: "",
  },
});
export const serviceHome = atom<SectionDataHome>({
  key: "serviceHome",
  default: {
    id: "1",
    data: [],
    type: "BANNER",
    title: "",
  },
});

export const useInfoZalo = atom<IUserInfoZalo>({
  key: "useInfoZalo",
  default: {},
});

// Bistech state
export const itemProduct = atom<Product>({
  key: "blogItem",
  default: {
    id: "1",
    title: "string",
    image: "img",
    value: "500000",
    price: "500",
  },
});