
import { Box } from "@mui/material";
import { IC_DASHED_LINE_VERTICAL } from "assets/icon";
import React, { FC } from "react";
interface DashedLineProps {
    height?: string | number;
    width?: string | number;

  }
export const VertiCalLine: FC<DashedLineProps> = ({ height = "100%", width ="100%" }) => {
  return (
    <Box
    sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width : {width},
        height: {height}
    }}>
       <img height={'100%'} width={'100%'} src={IC_DASHED_LINE_VERTICAL}/>
    </Box>
  );
};
