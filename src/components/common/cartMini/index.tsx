import { Box, Typography } from "@mui/material";
import { IC_CART } from "assets/listProduct";
import React, { FC } from "react";
import { useDispatch, useSelector } from "redux/store";

export const CartMini: FC = () => {
  const dispatch = useDispatch();
  const cartMiniData = useSelector((state) => state.cartMini.cartMiniData);
  return (
    <Box className="absolute right-[calc(30%)] background-h-main p-[5px] rounded-2xl w-[56px] flex justify-around">
      <img src={IC_CART} width={"24px"} height={"24px"} />
      <Typography className="font-averta-semibold text-white">{cartMiniData?.quantity}</Typography>
    </Box>
  );
};
