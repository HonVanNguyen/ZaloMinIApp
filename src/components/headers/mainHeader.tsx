
import { Typography } from "@mui/material";
import { IC_CART, IC_LEFT_ICON } from "assets/listProduct";
import { CartMini } from "components/common/cartMini";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Header } from "zmp-ui";
interface customForProduct {
  title?: string;
}
export const MainHeader: FC<customForProduct> = ({ title })=> {
    const navigate = useNavigate();
  return (
    <Header
      className="header app-header no-border pl-4 flex-none custom-header-app "
      style={{
        height: "10vh",
        borderRadius: "0",
        position: "relative",
      }}
      showBackIcon={false}
      title={
        (
          <Box
            flex
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            className="space-x-2 header relative"
          >
            <img width={'24px'} height={'24px'} alt="icon" src={IC_LEFT_ICON} onClick={() => navigate(-1)} />
            <Typography
              sx={{
                fontFamily: "Averta_Semi",
                fontSize: "24px",
                color: "white",
              }}
            >
              {title}
            </Typography>
            <CartMini/>
          </Box>
        ) as unknown as string
      }
    />
  );
};
