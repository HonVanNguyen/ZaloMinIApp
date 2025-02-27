import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userZaloState } from "state.app";
import { Header } from "zmp-ui";

import { LOGO_MAIN } from "assets/icon";
import { getUserInfo } from "zmp-sdk";
import { getStorage as getZaloStore } from "zmp-sdk/apis";
export const Welcome: FC = () => {
  const dataUser = useRecoilValue(userZaloState);
  const [userInf, setUserInf] = useState<any>();
  const [openModal, setOpenModal] = useState(false);

  const [userDataLogin, setUserDataLogin] = useState<any>(null);
  const getUser = async () => {
    try {
      const { userInfo } = await getUserInfo({});
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
    fetchData();
  }, []);

  const clickBtn = () => {
    if (!userDataLogin?.customer?.name) {
      console.log("check");
      setOpenModal(true);
    }
  };

  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px] custom-home-main "
      style={{
        position: "relative",
      }}
      showBackIcon={false}
      title={
        (
          <Box
          sx={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            alignItems:'flex-start',
            position:'relative'
          }}
            className="space-x-2 header"
          >
            <Box
            sx={{
              position:'absolute',
              top:'-20px'
            }}>
              <img className="h-14 rounded-lg " src={LOGO_MAIN} />
            </Box>
            {/* <Typography className="text-av" onClick={() => clickBtn()}>
              Xin chào,{" "}
              {userDataLogin?.customer?.name || userInf?.name || "Quý khách"}
            </Typography> */}
            {/* {openModal ?  (
              <Box className="box-input">
                <ModalInput isVisible={openModal} setIsVisible={setOpenModal} />
              </Box>
            ): null } */}
          </Box>
        ) as unknown as string
      }
    />
  );
};
