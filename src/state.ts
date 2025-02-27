import { atom, selector } from "recoil";
import { getSubjectHome } from "services/product.service";
import logo from "static/logo.png";
import { Notification } from "types/notification";
import { Product, subjectTitle } from "types/product";
import { getPhoneNumber } from "zmp-sdk";

import { API_CURRENT_USER, API_LOGIN } from "common/api/path.api";
import axiosInstance from "common/axios";
import {
  ItemSubject,
  IUserInfoZalo,
  SectionDataHome,
} from "pages/index/common/interFace";
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
    data: [
      {
        link: "EXCHANGE_GIFT",
        image:
          "https://d3ezucyls8c4up.cloudfront.net/images/2/78cc808f-aeee-45a3-80c7-31ae4ea1f205.jpg",
        imageId: 381,
        typeRoute: "ROUTER",
      },
      {
        link: "https://aiwado.com/kazu-gain-gold.html",
        image:
          "https://d3ezucyls8c4up.cloudfront.net/images/2/1f0c5f5a-6127-4f7e-b631-59a16e39b50f.jpg",
        imageId: 1072,
        typeRoute: "DEEP_LINK",
      },
      {
        link: "EXCHANGE_GIFT",
        image:
          "https://d3ezucyls8c4up.cloudfront.net/images/2/490805a7-7fce-4f42-86d7-7920d47c5197.jpg",
        imageId: 383,
        typeRoute: "ROUTER",
      },
      {
        link: "EXCHANGE_GIFT",
        image:
          "https://d3ezucyls8c4up.cloudfront.net/images/2/ab3a6a38-bc18-4ddf-927a-971775f34c6f.jpg",
        imageId: 384,
        typeRoute: "ROUTER",
      },
      {
        link: "https://aiwado.com/san-pham-cho-be",
        image:
          "https://d3ezucyls8c4up.cloudfront.net/images/2/00d6e56d-fb1a-4106-814b-a6920c55977b.jpg",
        imageId: 617,
        typeRoute: "DEEP_LINK",
      },
      {
        link: "https://aiwado.com/san-pham-cho-nguoi-lon-tuoi",
        image:
          "https://d3ezucyls8c4up.cloudfront.net/images/2/96d18d42-ce99-4559-9ffd-9f46992bdc34.jpg",
        imageId: 618,
        typeRoute: "DEEP_LINK",
      },
    ],
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
// Product state
export const productState = atom<ItemSubject[]>({
  key: "productItem",
  default: [
    {
      id: 1,
      title: "Sản phẩm A",
      status: "available",
      createdAt: "2024-02-01T10:00:00Z",
      updatedAt: "2024-02-10T12:30:00Z",
      thumbnail: {
        id: 101,
        key: "thumb_101",
        type: "image/png",
        url: "https://d3ezucyls8c4up.cloudfront.net/images/2/3248de3f-14c3-45ba-8b3f-f8f194b89907.png",
      },
      subject: [
        {
          id: 201,
          subjectDetails: [
            { id: 301, lang: "vi", name: "Chủ đề Tiếng Việt" },
            { id: 302, lang: "en", name: "English Topic" },
          ],
        },
      ],
      newsDetails: [
        {
          id: 401,
          lang: "vi",
          content: "Chi tiết tin tức về sản phẩm A",
          description: "Mô tả ngắn về sản phẩm A",
          author: "Nguyễn Văn A",
        },
      ],
    },
    {
      id: 2,
      title: "Sản phẩm B",
      status: "out_of_stock",
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-02-12T14:00:00Z",
      thumbnail: {
        id: 102,
        key: "thumb_102",
        type: "image/jpg",
        url: "https://d3ezucyls8c4up.cloudfront.net/images/2/21d89b53-1530-4573-8ee3-9c54e82a4010.png",
      },
      subject: [
        {
          id: 202,
          subjectDetails: [
            { id: 303, lang: "vi", name: "Chủ đề Khoa học" },
            { id: 304, lang: "en", name: "Science Topic" },
          ],
        },
      ],
      newsDetails: [
        {
          id: 402,
          lang: "en",
          content: "Latest updates on Product B",
          description: "Short description of Product B",
          author: "Trần Thị B",
        },
      ],
    },
    {
      id: 3,
      title: "Sản phẩm C",
      status: "available",
      createdAt: "2024-03-01T09:30:00Z",
      updatedAt: "2024-03-02T15:45:00Z",
      thumbnail: {
        id: 103,
        key: "thumb_103",
        type: "image/jpeg",
        url: "https://d3ezucyls8c4up.cloudfront.net/images/2/3b0f8eed-a5f9-4bb1-be41-56589b95b580.png",
      },
      subject: [
        {
          id: 203,
          subjectDetails: [
            { id: 305, lang: "vi", name: "Chủ đề Công nghệ" },
            { id: 306, lang: "en", name: "Technology Topic" },
          ],
        },
      ],
      newsDetails: [
        {
          id: 403,
          lang: "vi",
          content: "Thông tin mới nhất về sản phẩm C",
          description: "Mô tả ngắn về sản phẩm C",
          author: "Lê Văn C",
        },
      ],
    },
  ],
});
