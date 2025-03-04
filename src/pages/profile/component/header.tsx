import { Avatar, Box, Typography } from "@mui/material";
import { LOGO_SOKI_WHITE } from "assets/icon";
import React, { FC, useEffect, useState } from "react";
import { Header } from "zmp-ui";

import { getUserInfo, getStorage as getZaloStore } from "zmp-sdk/apis";
export const HeaderComponent: FC = () => {
  // const userDataLogin = useRecoilValue(useInfoApp);
  const [userInf, setUserInf] = useState<any>();
  const [userDataLogin, setUserDataLogin] = useState<any>(null);
  const getUser = async () => {
    try {
      const { userInfo } = await getUserInfo({});
      // console.log("User Information: ", userInfo);
      return userInfo;
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user: any = await getUser(); // Chờ kết quả từ getUser()
      if (user) {
        setUserInf(user); // Cập nhật state sau khi nhận dữ liệu
      }
      const { userDataLogin } = await getZaloStore({
        keys: ["userDataLogin"],
      });
      setUserDataLogin(userDataLogin);
    };

    fetchData(); // Gọi hàm fetchData mà không cần kiểm tra if(fetchData)
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Header
        className="app-header no-border pl-4 flex-none pb-[6px] custom-home-profile"
        showBackIcon={false}
        title={
          (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
              className="header mb-20"
            >
              <img className="h-14 rounded-lg " src={LOGO_SOKI_WHITE} />
            </Box>
          ) as unknown as string
        }
      />
      <Box
        className="canter-box-header"
        sx={{
          position: "absolute",
          width: "80vw",
          height: "20vh",
          bottom: "-50%",
          background: "#fff",
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "30px",
          zIndex: 999,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Avatar
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%) translateY(-50%)",
              width: "80px",
              height: "80px",
            }}
            src={
              userInf && userInf?.avatar
                ? userInf?.avatar
                : "https://st2.depositphotos.com/17253970/43212/v/450/depositphotos_432126936-stock-illustration-business-glyph-background-vector-icon.jpg"
            }
          />
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              paddingTop: "10px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontFamily: "Averta_Regular",
              }}
            >
              {userDataLogin?.customer?.name || userInf?.name || "Quý khách"}
            </Typography>
            <Typography
              sx={{
                fontWeight: "300",
                fontFamily: "Averta_Regular",
              }}
            >
              {userDataLogin?.customer?.dynamicData["phone"] || ""}
            </Typography>
            <Typography
              sx={{
                fontWeight: "300",
                fontFamily: "Averta_Regular",
              }}
            >
              {userDataLogin?.customer?.dynamicData["major"] || ""}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
