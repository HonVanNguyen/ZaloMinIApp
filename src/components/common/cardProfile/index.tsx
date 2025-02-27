import { IC_MENU_1, IC_MENU_2, IC_MENU_3 } from "assets/icon";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";

interface CardProfileProps {
  visible?: boolean;
}

const MenuList = [
  { path: "/gift", label: "Đổi quà", icon: IC_MENU_1 },
  { path: "/qr-code", label: "Quét mã", icon: IC_MENU_2 },
  { path: "/my-gift", label: "Quà của tôi", icon: IC_MENU_3 },
];

export const CardProfile: FC<CardProfileProps> = ({ visible = true }) => {
  const navigate = useNavigate();
  return visible ? (
    <Box className="flex flex-col items-center justify-center w-screen">
      <Box className="w-11/12 h-40 bg-white rounded-2xl flex flex-col items-center justify-center shadow-md">
        {/* Thông tin người dùng */}
        <Box className="flex flex-row justify-around items-center w-full h-8">
          <Text className="text-gray-900 font-averta-semibold text-sm text-color-header">Xin chào, Dũng Trương</Text>
          <Box className="w-px h-5 bg-gray-300" />
          <Text className="text-gray-900 font-averta-semibold text-sm text-color-header">5000 Xu</Text>
        </Box>
        <Box className="w-72 h-px bg-gray-300 my-2" />
        {/* Danh sách Menu */}
        <Box className="w-full h-24 flex flex-row justify-around items-center gap-2">
          {MenuList.map(({ path, label, icon }) => (
            <Box key={path} className="flex flex-col items-center gap-2" onClick={()=>{
              navigate(path)
            }}>
              <img loading="lazy" src={icon} className="w-11 h-11" alt={label} />
              <Text className="text-gray-900 text-xs font-normal text-color-header">{label}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  ) : null;
};
