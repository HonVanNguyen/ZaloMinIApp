
import { Box } from "@mui/material";
import { IC_DASHED_LINE } from "assets/icon";
import React, { FC } from "react";
interface DashedLineProps {
    width?: string | number;
  }
export const DashedLine: FC<DashedLineProps> = ({ width = "100%" }) => {
  return (
    <Box
    sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width: {width},
    }}>
       <img width={'100%'} height={'auto'} src={IC_DASHED_LINE}/>
    </Box>
  );
};
