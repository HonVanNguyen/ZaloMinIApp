import React, { Suspense, useState } from "react";
import { Page, Text } from "zmp-ui";
import { Box }from "@mui/material"
import { HeaderPage } from "./component/header";
import { ProductList } from "./product-list";
import { useRecoilValue } from "recoil";
import { forTitle } from "state";
import { useGetListBlogsBySub } from "./common/hook/useGetBlogsByIdSub";

const ListProductPage: React.FunctionComponent = () => {
  const keyTitle = useRecoilValue(forTitle);

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box sx={{
        display: 'flex',
        flexDirection:'column',
        gap: '6px',
        width: '100vw',
        overflowX: 'hidden',
        background:'#fff',
        
        paddingBottom:'12vh'
      }}>
        <HeaderPage title={keyTitle} />
        <Box sx={{
          display: 'flex',
          flexDirection:'column',
          gap:'10px',
          background:'#fff'
        }}>
          <ProductList title={keyTitle} horizontal={true} url="/home" /> 
        </Box>
      </Box>
    </Page>
  );
};

export default ListProductPage;
