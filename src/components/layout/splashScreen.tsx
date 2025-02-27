
import { Box } from "@mui/material";
import { LOGO_SPLASH } from "assets/icon";
import React, { FC } from "react";
export const SplashScreen: FC = () => {
  return (
    <Box
    sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width: '100vw',
        height:'100vh'
    }}>
       <img width={'100%'} height={'auto'} src={LOGO_SPLASH}/>
    </Box>
  );
};
