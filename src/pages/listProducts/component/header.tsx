import { Typography } from "@mui/material";
import { IC_LEFT_ICON } from "assets/listProduct";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Header, } from "zmp-ui";
interface customForProduct {
  title?: string,
}
export const HeaderPage: FC<customForProduct> = ({title}) => {
 const navigate = useNavigate();
  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px] custom-home-main"
      style={{
        height:'14vh',
        position:'relative'
      }}
      showBackIcon={false}
      title={
        (
          <Box flex flexDirection="row" justifyContent="flex-start" alignItems="center" className="space-x-2 header">
            <img alt="icon" src={IC_LEFT_ICON} onClick={()=>navigate(-1)}/>
            <Typography 
            sx={{
              fontFamily:'Averta_Bold',
              fontSize:'20px',
              color:'white'
            }}>
              {title}
            </Typography>
          </Box>
        ) as unknown as string
      }
    />
  );
};
