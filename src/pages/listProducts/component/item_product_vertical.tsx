import { Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IC_SHOPPING_BAG } from "assets/icon";
import { ItemSubject } from "pages/index/common/interFace";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { itemBlogs } from "state";
import { Button, Text } from "zmp-ui";

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
    // <Card
    //   onClick={()=>updateBlog()}
    //   sx={{
    //     maxWidth: 170,
    //     display: "grid"
    //   }}
    // >
    //   <Box className="  ">
    //     <img
    //       loading="lazy"
    //       src={product?.thumbnail?.url}
    //       style={{ borderRadius: "20px", width: "100%", height: "10vh", objectFit:'cover' }}
    //       alt={product?.title}
    //     />
    //   </Box>
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       gap: "10px",
    //       maxHeight: "11vh",
    //       overflow: "hidden",
    //     }}
    //   >
    //     <Text
    //       style={{
    //         fontFamily: "Averta_Bold",
    //         fontSize: "16px",
    //         color: "#F45F59",
    //       }}
    //     >
    //       {product?.title}
    //     </Text>
    //     <Text size="xxSmall" className="pb-2"
    //     style={{
    //       whiteSpace: "nowrap", 
    //       overflow: "hidden",  
    //       textOverflow: "ellipsis",
    //       display: "block", 
    //     }}>
    //       {product?.newsDetails[0]?.description}
    //     </Text>
    //   </Box>
    // </Card>
    <Card sx={{ maxWidth: 180 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product?.thumbnail?.url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Thẻ cào điện thoại
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Giá trị: 500,000đ
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography style={{ marginLeft: "10px" }} gutterBottom variant="h6" component="div">
          500 xu
        </Typography>
        <img style={{ width: "40px" }} src={IC_SHOPPING_BAG} />
      </CardActions>
    </Card>
  );
};
