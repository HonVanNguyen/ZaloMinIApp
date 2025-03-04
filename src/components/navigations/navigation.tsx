import { Box } from "@mui/material";
import {
  CENTER_BOTTOM,
  IC_GIFT,
  IC_GIFT_AC,
  IC_HOME,
  IC_HOME_AC,
  IC_NOTI,
  IC_PROFILE,
  IC_PROFILE_AC,
  NAV_BOTTOM,
} from "assets/bottom";
import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { authorize, openChat, nativeStorage, getUserInfo } from "zmp-sdk/apis";
import ApiService from "../../services/common.api";
import authApi from "common/axios/auth";
import { dispatch, useSelector } from "redux/store";
import { setAccessTokenApp } from "pages/index/common/home.slice";
const HomePage = React.lazy(() => import("pages/index"));
const GiftRedemptionPage = React.lazy(() => import("pages/giftRedemptionPage"));
const ProfilePage = React.lazy(() => import("pages/profile"));

export const TABS_NAVIGATION: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: IC_HOME,
    activeIcon: IC_HOME_AC,
    component: HomePage,
  },
  "/gift": {
    label: "Đổi quà",
    icon: IC_GIFT,
    activeIcon: IC_GIFT_AC,
    component: GiftRedemptionPage,
  },
  "/notification": {
    label: "Thông báo",
    icon: IC_NOTI,
    activeIcon: IC_NOTI,
    component: HomePage,
  },
  "/profile": {
    label: "Cá nhân",
    icon: IC_PROFILE,
    activeIcon: IC_PROFILE_AC,
    component: ProfilePage,
  },
};

export type TabKeys = keyof typeof TABS_NAVIGATION;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];

export const Navigation: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKeys>("/");
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();
  const currentAccessToken = useSelector(
    (state) => state.homeSlice.accessToken
  );
  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  useEffect(() => {
    if (TABS_NAVIGATION[location.pathname]) {
      setActiveTab(location.pathname as TabKeys);
    }
  }, [location.pathname]);

  if (noBottomNav || keyboardVisible) {
    return <></>;
  }
  const openChatScreen = async () => {
    try {
      await openChat({
        type: "oa",
        id: import.meta.env.VITE_IP_OA,
        message: "Xin Chào",
      });
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  const authorizeUser = async () => {
    try {
      const data = await authorize({
        scopes: ["scope.userLocation", "scope.userPhonenumber"],
      });
      if (data?.["scope.userInfo"] && data?.["scope.userPhonenumber"]) {
        const phoneNumber = await ApiService.getPhoneNumber();
        const { userInfo } = await getUserInfo({});
        if (phoneNumber) {
          const res = await authApi.register({
            phoneNumber: phoneNumber,
            name: userInfo?.name,
            email: null,
            avatarUrl: userInfo?.avatar,
            dynamicData: {},
          });
          nativeStorage.setItem("accessToken", res.accessToken);
          dispatch(setAccessTokenApp(res.accessToken));
          nativeStorage.setItem("refreshToken", res.refreshToken);
          console.log("Lưu token thành công!");
        } else {
          console.log("Đăng nhập thất bại!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        height: "12vh",
        width: "100vw",
        background: "transparent",
        backgroundImage: `url(${NAV_BOTTOM})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        zIndex: 999,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100px",
          height: "100px",
        }}
        onClick={() => openChatScreen()}
      >
        <img src={CENTER_BOTTOM} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          padding: "0 8vw", // Đệm hai bên
        }}
      >
        {/* Nhóm bên trái */}
        <Box sx={{ display: "flex", gap: "25px" }}>
          {Object.keys(TABS_NAVIGATION)
            .slice(0, 2)
            .map((path: TabKeys) => (
              <Box
                key={path}
                onClick={() => {
                  if (!currentAccessToken) {
                    authorizeUser();
                  }
                  setActiveTab(path);
                  navigate(path);
                }}
                sx={{
                  flexDirection: "column",
                  cursor: "pointer",
                  background: activeTab === path ? "#fbd7e6" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  width: "40px",
                  height: "40px",
                  marginBottom: "5px",
                  borderRadius: "100%",
                }}
              >
                <img
                  loading="lazy"
                  src={
                    activeTab === path
                      ? TABS_NAVIGATION[path].activeIcon
                      : TABS_NAVIGATION[path].icon
                  }
                  alt="icon"
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
        </Box>

        <Box sx={{ flexGrow: 1 }}></Box>

        {/* Nhóm bên phải */}
        <Box sx={{ display: "flex", gap: "25px" }}>
          {Object.keys(TABS_NAVIGATION)
            .slice(2, 4)
            .map((path: TabKeys) => (
              <Box
                key={path}
                onClick={() => {
                  setActiveTab(path);
                  navigate(path);
                }}
                sx={{
                  flexDirection: "column",
                  cursor: "pointer",
                  background: activeTab === path ? "#fbd7e6" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  width: "40px",
                  height: "40px",
                  marginBottom: "5px",
                  borderRadius: "100%",
                }}
              >
                <img
                  loading="lazy"
                  src={
                    activeTab === path
                      ? TABS_NAVIGATION[path].activeIcon
                      : TABS_NAVIGATION[path].icon
                  }
                  alt="icon"
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
