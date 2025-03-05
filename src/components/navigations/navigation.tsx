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
import { getUserPhoneNumber, getUserWithNameAndAvatar } from "common/api/app.api";
import { useVirtualKeyboardVisible } from "hooks";
import { setAccessTokenApp } from "pages/index/common/home.slice";
import { registerByAccessPhoneNumber } from "pages/index/common/services";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { dispatch, RootState, useSelector } from "redux/store";
import { MenuItem } from "types/menu";
import { authorize, nativeStorage, openChat } from "zmp-sdk/apis";
export const TABS_NAVIGATION: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: IC_HOME,
    activeIcon: IC_HOME_AC,
  },
  "/gift": {
    label: "Đổi quà",
    icon: IC_GIFT,
    activeIcon: IC_GIFT_AC,
  },
  "/notification": {
    label: "Thông báo",
    icon: IC_NOTI,
    activeIcon: IC_NOTI,
  },
  "/profile": {
    label: "Cá nhân",
    icon: IC_PROFILE,
    activeIcon: IC_PROFILE_AC,
  },
};

export type TabKeys = keyof typeof TABS_NAVIGATION;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];

export const Navigation: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKeys>("/");
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();
  

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

  const userPermissionPhoneNumber = useSelector(
    (state: RootState) => state.homeSlice.accessToken
  );
  
  const userRegisterByAccessPhoneNumber = async () => {
    try {
      const permissionInfo = await authorize({
        scopes: ["scope.userLocation","scope.userPhonenumber"],
      });
      if(!permissionInfo["scope.userPhonenumber"]) {
        console.log("Permission denied");
        return null;
      }
      const userPhoneNumber = await getUserPhoneNumber();
      const userInfo = await getUserWithNameAndAvatar();
      const data = {
        name: userInfo?.name ?? "",
        email: null,
        avatarUrl: userInfo?.avatar ?? "",
        phoneNumber: String(userPhoneNumber)
      }
      const response: any = await registerByAccessPhoneNumber(data);
      nativeStorage.setItem("accessToken", response.accessToken)
      dispatch(setAccessTokenApp(response.accessToken));
      nativeStorage.setItem("refreshToken", response.refreshToken)     
    } catch (error) {
      console.error("Register Failed", error);
      return null;
    }
  }  

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
                    (activeTab === path ? TABS_NAVIGATION[path].activeIcon : TABS_NAVIGATION[path].icon)
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
                    (activeTab === path ? TABS_NAVIGATION[path].activeIcon : TABS_NAVIGATION[path].icon)
                  }
                  alt="icon"
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                  }}
                  onClick={() => {
                    // authorizeUser();
                    if(userPermissionPhoneNumber == "") {
                      userRegisterByAccessPhoneNumber()
                    }
                    
                  }}
                />
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
