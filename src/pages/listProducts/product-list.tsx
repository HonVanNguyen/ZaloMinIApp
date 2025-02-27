import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { ProductItemSkeleton } from "components/skeletons";

import { Box } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from "swiper";
import { ItemSwiperHorizontal } from "pages/index/component/item_swiper_horizontal";
import { ProductItem } from "./component/item_product_vertical";
import { selectSubject } from "state";
import { useGetListBlogsBySub } from "./common/hook/useGetBlogsByIdSub";
// import required modules

interface ProductListContentProps {
  title: string;
}

export const ProductListContent: FC< ProductListContentProps > = ({title}) => {
  const products = useRecoilValue(selectSubject);
  const listContent = useGetListBlogsBySub(products);

  return (
    <Box sx={{
      width:'100vw',
      padding:'10px 20px'
    }}>
      <Box  className="grid grid-cols-1 gap-4">

      {listContent &&
          listContent.data?.items.map((item, index) => (
            <ProductItem
              key={item.id} product={item} keyTitle={title}/>
          ))}
        {/* {products.map((product) => (
          <ProductItem
           key={product.id} product={product} keyTitle={title}/>
        ))} */}
      </Box>
    </Box>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-1 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

interface customForProduct {
  horizontal?: boolean,
  title: string,
  url?:string
}

export const ProductList: FC<customForProduct> = ({ horizontal, title, url="" }) => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      {horizontal?(
        <></>
      ):(
        <ProductListContent title={title} />
      )}
    </Suspense>
  );
};
