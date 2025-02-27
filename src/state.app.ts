// 'use strict'
import { selector, atom } from "recoil";
import ApiService from "./services/common.api";
import { UserData } from "redux/types";
const dataMock: UserData = (() => {
  const storedData = localStorage.getItem("userLogin");
  
  if (storedData) {
    const parsedData: UserData = JSON.parse(storedData);
    return {
      idZalo: parsedData?.idZalo || "0000000000",
      avatar: parsedData?.avatar || "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: parsedData?.name || "Người dùng mới",
      role: parsedData?.role || "user",
      phone: parsedData?.phone || "000000",
    };
  } else {
    return {
      idZalo: "0000000000",
      avatar: "https://www.svgrepo.com/show/452030/avatar-default.svg",
      name: "Đăng nhập",
      role: "user",
      phone: "000000",
    };
  }
})();
// atom user
export const userZaloAtom = atom<UserData | null>({
  key: "userZaloAtom",
  default: dataMock
});
// Define a Recoil selector outside the class
export const userZaloState = selector({
  key: "userZaloState",
  get: ({ get }) => {
    const user = get(userZaloAtom);
    return user;
  },
});
