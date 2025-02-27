import { Box } from "@mui/material";
import { Divider } from "components/divider";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  bannerHome,
  getSubject,
  serviceHome
} from "state";
import { Page } from "zmp-ui";
import { Banner } from "./banner";
import { useGetListHomeConfig } from "./common/hook/useGetBanner";
import {
  I_SubjectsData,
  IHomeConfig,
  SectionDataHome,
} from "./common/interFace";
import { getBlogsBySubject } from "./common/services";
import { ProductList, ProductListContent, ProductListFallbackHorizontal, ProductListHorizonContent } from "./product-list";
import { DashedLine } from "components/common/line";
import { CardProfile } from "components/common/cardProfile";
const HomePage: React.FunctionComponent = () => {
  const setBannerHome = useSetRecoilState(bannerHome);
  const setServiceHome = useSetRecoilState(serviceHome);
  const subjects = useRecoilValue(getSubject);
  const {
    data: dataHomeConfig,
    error,
    isLoading,
    isError,
  } = useGetListHomeConfig();
  const [dataBlogs, setDataBlogs] = useState<any>();
  // Define the queries for fetching blogs based on subjects
 
  const getFormattedBlogs = async (subjects: any[]) => {
    try {
      // Sử dụng Promise.all để đợi tất cả các lời gọi API hoàn tất
      const formattedBlogs = await Promise.all(
        subjects.map(async (item) => {
          // Lấy dữ liệu blog theo từng subject
          const blogs = await getBlogsBySubject(item.id);
          // Xử lý dữ liệu blog
          const BlogsList = blogs as I_SubjectsData;
          const firstItem = BlogsList?.items[0];
          // Kiểm tra dữ liệu và trả về cấu trúc cần thiết
          if (firstItem) {
            return {
              title: firstItem.subject[0].subjectDetails[0].name,
              items: BlogsList?.items,
              id: item.id,
            };
          }
          return null; // Trả về null nếu không có dữ liệu hợp lệ
        })
      );

      // Lọc bỏ các giá trị null
      return formattedBlogs.filter((blog) => blog !== null);
    } catch (error) {
      console.error("Error fetching formatted blogs:", error);
      return [];
    }
  };

  useEffect(() => {
    // Đảm bảo gọi hàm bất đồng bộ trong một hàm async bên trong useEffect
    const fetchBlogs = async () => {
      if (subjects) {
        const data = await getFormattedBlogs(subjects); // Đợi dữ liệu từ getFormattedBlogs
        // Sau khi có dữ liệu, bạn có thể lưu vào state nếu cần
        setDataBlogs(data);
      }
    };

    fetchBlogs(); // Gọi hàm fetchBlogs khi useEffect chạy
  }, [subjects]);



  useEffect(() => {
    const setHomeConfig = async (data: IHomeConfig) => {
      try {
        if (data?.sections) {
          data.sections.forEach((section: SectionDataHome) => {
            if (section.type === "BANNER") {
              setBannerHome(section);
            } else if (section.type === "NORMAL_SERVICE") {
              setServiceHome(section);
            }
          });
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    if (dataHomeConfig) {
      setHomeConfig(dataHomeConfig);
    }
  }, [dataHomeConfig]);

  return (
    <Page className="flex-1 flex flex-col main-template">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100vw",
          overflowX: "hidden",
          paddingBottom: "12vh",
        }}
        >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          <CardProfile/>
          <Banner />
          {/* <DashedLine width={'70%'}/> */}
          <ProductListContent/>
          {/* <ProductListHorizonContent/> */}
          {/* <ProductListFallbackHorizontal/> */}
          {dataBlogs ? (
            <>
              {dataBlogs.map((blogs, index) => {
                return (
                  <ProductList
                    key={index} 
                    title={blogs?.title}
                    horizontal={true}
                    url="/list-product"
                    listItem={blogs?.items}
                    subjectId={blogs?.id}
                  />
                );
              })}
            </>
          ) : null}
          <Divider />          
        </Box>
      </Box>
    </Page>
  );
};

export default HomePage;
