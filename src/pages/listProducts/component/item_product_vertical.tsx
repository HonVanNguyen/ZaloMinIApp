import { Box } from "@mui/material";
import { ItemSubject } from "pages/index/common/interFace";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { itemBlogs } from "state";
import { Text } from "zmp-ui";

export const ProductItem: FC<{ product: ItemSubject, keyTitle: string }> = ({ product, keyTitle }) => {
  const setItemBlogs = useSetRecoilState(itemBlogs);
  const navigate = useNavigate();
  const updateBlog = async () => {
    await setItemBlogs({
      id: product.id,
      for: keyTitle,
      title: product?.title,
      subTitle: product?.newsDetails[0]?.description,
      image:
        product?.thumbnail?.url ||
        "https://theindependentinvestor.ph/wp-content/uploads/2022/09/Docquity.png",
      dateCreate: new Date(),
      content: product?.newsDetails[0]?.content,
    });
    navigate('/product-detail');
  };
  return (
    <Box
      onClick={()=>updateBlog()}
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 3fr",
        gap: "20px",
      }}
    >
      <Box className="w-full">
        <img
          loading="lazy"
          src={product?.thumbnail?.url}
          style={{ borderRadius: "20px", width: "100%", height: "10vh", objectFit:'cover' }}
          alt={product?.title}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "11vh",
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            fontFamily: "Averta_Bold",
            fontSize: "16px",
            color: "#F45F59",
          }}
        >
          {product?.title}
        </Text>
        <Text size="xxSmall" className="pb-2"
        style={{
          whiteSpace: "nowrap", 
          overflow: "hidden",  
          textOverflow: "ellipsis",
          display: "block", 
        }}>
          {product?.newsDetails[0]?.description}
        </Text>
      </Box>
    </Box>
  );
};
