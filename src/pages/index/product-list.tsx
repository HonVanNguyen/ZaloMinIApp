import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue, useSetRecoilState } from "recoil";
// import { forTitle, productsState } from "state";
import { ProductItemSkeleton, ProductItemSkeletonHorizontal } from "components/skeletons";


import { Box } from "@mui/material";
import { ItemSwiperHorizontal } from "./component/item_swiper_horizontal";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from "swiper";
import { ItemSubject } from "./common/interFace";
import { productsState } from "state";
import { ProductItem } from "pages/listProducts/component/item_product_vertical";
// import required modules

export const ProductListContent: FC = () => {
  const products = useRecoilValue(productsState);

  return (
    <Section title="THẺ CÀO ĐIỆN THOẠI">
      <Box className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} keyTitle="productItem" product={product} />
        ))}
      </Box>
    </Section>
  );
};
interface ProductListHorizonContentProps {
  title: string;
  url?: string;
  listContent?: ItemSubject[],
  subjectId?:string,
}

export const ProductListHorizonContent: FC<ProductListHorizonContentProps> = ({title, url="", listContent, subjectId}) => {
  return (
    <Section title={title} url={url} select={subjectId}>
      {/* <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {listContent &&
          listContent.map((item, index) => (
            <SwiperSlide key={index}>
              <ItemSwiperHorizontal key={item.id} product={item} title={title} />
            </SwiperSlide>
          ))}
      </Swiper> */}
      <Box className="horizontal-scroll-container">
        {listContent &&
          listContent.map((item) => (
            <ItemSwiperHorizontal key={item.id} product={item} title={title} />
          ))}
      </Box>
    </Section>
  );
};
export const ProductListFallbackHorizontal: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title={'title'}>
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {products.slice(0, 8).map((product) => (
          <SwiperSlide >
            <ProductItemSkeletonHorizontal key={product.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
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
  url?:string, 
  listItem?: ItemSubject[],
  subjectId?:string
}

export const ProductList: FC<customForProduct> = ({ horizontal, title, url="", listItem, subjectId }) => {
  return (
    <Suspense fallback={horizontal ? <ProductItemSkeletonHorizontal /> : <ProductListFallback />}>
      {horizontal?(
        <ProductListHorizonContent listContent={listItem} title={title} url={url} subjectId={subjectId}/>
      ):(
        <ProductListContent />
      )}
    </Suspense>
  );
};
