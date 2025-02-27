import { Skeleton } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { bannerHome } from "state";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "zmp-ui";
import { SectionDataHome } from "./common/interFace";
export const Banner: FC = () => {
  const banner = useRecoilValue(bannerHome);
  const [allBanner, setAllBanner] = useState<SectionDataHome>();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (banner) {
          setAllBanner(banner);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [banner]);
  return (
    <Box className="main-template" pb={2} p={2}>
      {allBanner?.data && allBanner?.data.length > 0 ? (
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          autoplay
          loop
          cssMode
        >
          {allBanner.data.map((banner, i) => (
            <SwiperSlide key={i}>
              <Box
                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                style={{
                  backgroundImage: `url(${banner.image})`,
                  borderRadius: "30px",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          autoplay
          loop
          cssMode
        >
          {/* Render Skeletons */}
          {Array.from({ length: 3 }).map((_, i) => (
            <SwiperSlide key={i}>
              <Skeleton
                variant="rectangular"
                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                animation="wave"
                style={{ borderRadius: "30px", height: "200px" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};
