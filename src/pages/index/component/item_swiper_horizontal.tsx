import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { itemProduct } from "state";
import { ItemSubject } from "../common/interFace";
import { IC_SHOPPING_BAG } from "assets/icon";

export const ItemSwiperHorizontal: FC<{
  product: ItemSubject;
  title: string;
}> = ({ product, title }) => {
  const setItemBlogs = useSetRecoilState(itemProduct);
  const item = {
    id: product.id,
    value: "500000",
    price: "500",
    title: product?.title,
    image:
      product.thumbnail.url ||
      "https://theindependentinvestor.ph/wp-content/uploads/2022/09/Docquity.png",
  };
  const navigate = useNavigate();
  const updateBlog = async () => {
    await setItemBlogs({
      id: product.id,
      value: "500000",
      price: "500",
      title: product?.title,
      image:
        product.thumbnail.url ||
        "https://theindependentinvestor.ph/wp-content/uploads/2022/09/Docquity.png",
    });
    navigate("/product-detail");
  };

  return (
    <Box
      onClick={() => updateBlog()}
      sx={{
        width: "45vw",
        minWidth: "45vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: '#fff',
        borderRadius:'30px',
        paddingBottom:'15px',
        position:'relative',
      }}
      className="space-y-2 root-style"
    >
      <Box className="w-full">
        <img
          loading="lazy"
          src={product?.thumbnail?.url}
          style={{ borderRadius: "10px", width: "166px", height: "166px" }}
          alt={product.title}
        />
      </Box>
      <Box
        sx={{
          width: "138px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Averta_Regular",
            fontSize: "16px",
            color: "var(--text-color-black)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "138px",
            width: "138px",
          }}
        >
          {product.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Averta_Regular",
            fontSize: "14px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
          className="main-font-family-regular sub-text"
        >
          Giá trị:{" "}
          {Number.isFinite(Number(item.value))
            ? new Intl.NumberFormat("vi-VN").format(Number(item.value)) + "đ"
            : "N/A"}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Averta_Semi",
            fontSize: "16px",
            color: "var(--text-color-header)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "138px",
            width: "138px",
            paddingTop:'15px'
          }}
        >
          {item.price} Xu
        </Typography>
      </Box>
      <Box
      sx={{
        position:'absolute',
        bottom:'10px',
        right:'10px'
      }}>
        <img loading="lazy" src={IC_SHOPPING_BAG} width={'36px'} height={'36px'}/>
      </Box>
    </Box>
  );
};
