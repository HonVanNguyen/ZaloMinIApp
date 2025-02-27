import React, { Suspense, useEffect, useState } from "react";
import { Page, Text } from "zmp-ui";
import { Box, Typography } from "@mui/material";
import { HeaderPage } from "./component/header";
import { useRecoilValue } from "recoil";
import { itemBlogs, useInfoApp } from "state";
import { IC_CALENDER } from "assets/icon";
// import { Recommend } from "pages/index/recommend";
import { ModalInput } from "pages/index/component/popup/modal_input";

import { setStorage as setZaloStore, getStorage as getZaloStore, } from "zmp-sdk/apis";
const ProductDetailPage: React.FunctionComponent = () => {
  const products = useRecoilValue(itemBlogs);
  const [userDataLogin, setUserDataLogin] = useState(null);
  const handleSwitchChange = (value: boolean) => {
    console.log("Trạng thái Switch:", value); // Lấy trạng thái từ Recommend
  };
  useEffect(()=>{
    const fetchData = async () =>{
      const {userDataLogin} = await getZaloStore({
        keys: ["userDataLogin"],
      });
      console.log("dataStore",userDataLogin)
      setUserDataLogin(userDataLogin)
    }
    fetchData();
  },[])
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100vw",
          overflowX: "hidden",
          background: "#fff",
          paddingBottom: "5vh",
        }}
      >
        <HeaderPage title={products.for} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            background: "#fff",
            height: "fit-content",
            padding: " 0px 10px 10vh 10px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Averta_Semi",
                fontSize: "26px",
                color: "#E82629",
                textAlign: "justify",
              }}
            >
              {products.title}
            </Typography>
          </Box>
          <Box className={"flex flex-row "}>
            <img
              loading="lazy"
              src={IC_CALENDER}
              width={24}
              height={24}
              alt="calender"
            />
            <Box
              className="flex gap-2 align-middle"
              sx={{
                alignItems: "center",
               
                color: "#98A1B3",
              }}
            >
              <Typography sx={{
                fontSize:'14px',
                fontFamily: "Averta_Regular",
              }}>
                {new Date(products.dateCreate).toDateString()}
              </Typography>
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  background: "#D9D9D9",
                  borderRadius: "100%",
                }}
              ></Box>
              <Typography sx={{
                fontFamily: "Averta_Regular",
              }}>{products.for}</Typography>
            </Box>
          </Box>
          <Box>
            <img
              loading="lazy"
              src={products.image}
              width={"100%"}
              height={"auto"}
              alt="img review"
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "Averta_Semi",
                fontSize: "16px",
                color: "#666e80",
                textAlign: "justify",
              }}
            >
              {products.subTitle}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Averta_Regular",
                fontSize: "14px",
                color: "#666e80",
                textAlign: "justify",
              }}
            >
              {/* {products.content} */}
              <span dangerouslySetInnerHTML={{ __html: products.content }} />
            </Typography>
          </Box>
          <Box
            sx={{
              width: "96vw",
              paddingLeft: "2vw",
            }}
          >
            {/* <Recommend onSwitchChange={handleSwitchChange} /> */}
          </Box>
          {userDataLogin ? null : (
            <Box className="box-input">
              <ModalInput />
            </Box>
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default ProductDetailPage;
