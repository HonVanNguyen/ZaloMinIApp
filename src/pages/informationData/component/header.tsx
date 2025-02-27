import React, { FC } from "react";
import { Header, Icon } from "zmp-ui";

import { userZaloState } from "state.app";
import { useRecoilValue } from "recoil";
import { Avatar, Box, Typography } from "@mui/material";
import { IC_EDIT } from "assets/profile";
import { useNavigate } from "react-router-dom";
interface HeaderComponentProps {
  status: boolean;
  onEditClick: () => void;
}
export const HeaderComponent: FC<HeaderComponentProps> = ({
  status,
  onEditClick,
}) => {
  const userZalo = useRecoilValue(userZaloState);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100vw",
      }}
      className="app-header no-border pl-4 flex-none pb-[6px] custom-home-info-data"
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "4vw",
          paddingTop: "10vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            color: "white",
          }}
        >
          <Box
            onClick={() => {
              navigate(-1);
            }}
          >
            <Icon icon="zi-arrow-left" />
          </Box>
          <Typography
            sx={{
              fontFamily: "Averta_Bold",
              color: "white",
              fontSize: "24px",
            }}
          >
            Thông tin cá nhân
          </Typography>
        </Box>
        {!status ? (
          <Box
            sx={{
              width: "24px",
              height: "24px",
            }}
            onClick={onEditClick}
          >
            <img
              width={"100%"}
              height={"100%"}
              loading="lazy"
              src={IC_EDIT}
              alt="edit icon"
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
