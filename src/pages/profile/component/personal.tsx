import React, { FC } from "react";
// import { getConfig } from "./config";
import { Box } from "@mui/material";
import { IC_POLICY, IC_PROVISION, IC_SUPPORT } from "assets/profile";
import { ListRenderer } from "components/list-renderer";
import { useNavigate } from "react-router-dom";
import { Text } from "zmp-ui";
import { openChat } from "zmp-sdk/apis";
export const Personal: FC = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/policy");
  };
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
  return (
    <Box className="m-4">
      <ListRenderer
        title="Thông tin"
        items={[
          {
            left: <img loading="lazy" src={IC_POLICY} alt="policy"/>,
            right: (
              <Box
              sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                height:'100%'
              }} onClick={onClick}>
                <Text.Header className="flex-1 items-center font-normal">
                  Chính sách
                </Text.Header>
              </Box>
            ),
          },
          {
            left: <img loading="lazy" src={IC_SUPPORT} alt="support"/>,
            right: (
              <Box
              sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                height:'100%'
              }} 
              onClick={() => openChatScreen()}
              >
                <Text.Header className="flex-1 items-center font-normal">
                  Trợ giúp
                </Text.Header>
              </Box>
            ),
          },
          {
            left: <img loading="lazy" src={IC_PROVISION} alt="provision"/>,
            right: (
              <Box
              sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                height:'100%'
              }} 
                onClick={() => {
                  navigate("/legacy");
                }}
              >
                <Text.Header className="flex-1 items-center font-normal">
                  Điều khoản
                </Text.Header>
              </Box>
            ),
          },
        ]}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
    </Box>
  );
};