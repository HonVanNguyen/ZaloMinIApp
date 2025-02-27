import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Page } from "zmp-ui";

import { HeaderPage } from "../component/header";
const LegacyPage: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập tải dữ liệu trong 3 giây
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
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
        <HeaderPage title="Điều khoản sử dụng" />
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
          <Box sx={{ padding: 2 }}>
            {loading ? (
              <>
                <Skeleton
                  variant="text"
                  width="80%"
                  height={40}
                  sx={{ marginBottom: 2 }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={30}
                  sx={{ marginBottom: 2 }}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={30}
                  sx={{ marginBottom: 2 }}
                />
                <Skeleton
                  variant="text"
                  width="95%"
                  height={30}
                  sx={{ marginBottom: 2 }}
                />
              </>
            ) : (
              <>
                <Typography
                  variant="h6" // Sử dụng h6 để đồng bộ kích thước 16px
                  sx={{
                    fontFamily: "Averta_Semi",
                    fontSize: 16,
                    color: "#ff6366", // Màu tiêu đề
                    marginBottom: 2,
                  }}
                >
                  Chào mừng bạn đến với Docquity, một mạng xã hội và tài nguyên
                  chuyên nghiệp dành cho các bác sĩ, bác sĩ và chuyên gia chăm
                  sóc sức khỏe đã đăng ký trên khắp Châu Á.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Averta_Regular",
                    fontSize: 14,
                    color: "#000", // Màu văn bản
                    marginBottom: 2,
                  }}
                  paragraph
                >
                  Bằng cách đăng ký làm Người dùng Docquity (được định nghĩa bên
                  dưới) hoặc truy cập hoặc sử dụng trang web của chúng tôi
                  www.docquity.com, tất cả các trang web liên kết, API và bất kỳ
                  ứng dụng nào khác, bao gồm Ứng dụng di động Docquity ("Ứng
                  dụng") do chúng tôi hoặc các chi nhánh của chúng tôi ("Trang
                  web") xuất bản bao gồm bất kỳ dịch vụ liên quan nào, bạn đang
                  ký kết hợp đồng ràng buộc về mặt pháp lý với Docquity Holdings
                  Pte. Ltd.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Averta_Regular",
                    fontSize: 14,
                    color: "#000", // Màu văn bản
                    marginBottom: 2,
                  }}
                  paragraph
                >
                  Chúng tôi cung cấp Dịch vụ của mình thông qua nền tảng kỹ
                  thuật số ngang hàng an toàn hoạt động như một mạng xã hội để
                  kết nối các bác sĩ, bác sĩ và chuyên gia chăm sóc sức khỏe đã
                  đăng ký trên toàn khu vực và cho phép tư vấn, cộng tác, cũng
                  như chia sẻ thông tin và kiến thức.
                </Typography>

                <Box sx={{ fontFamily: "Averta_Regular", color: "#000" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Averta_Semi",
                      fontSize: 16,
                      color: "#ff6366",
                      marginBottom: 2,
                    }}
                  >
                    Đối với các mục đích của các Điều khoản này, "Dịch vụ" có
                    nghĩa là tất cả các dịch vụ và ứng dụng nền tảng, bao gồm
                    nhưng không giới hạn ở:
                  </Typography>

                  {[
                    {
                      title: "DocTalks",
                      content:
                        "Một thư viện các bài giảng video ngắn từ các chuyên gia y tế.",
                    },
                    {
                      title: "Hội thảo trên web",
                      content:
                        "Các hội thảo trực tiếp và tương tác của các nhà lãnh đạo ý kiến chính thảo luận về các chủ đề y tế chuyên ngành.",
                    },
                    {
                      title: "Tạp chí y khoa quốc tế",
                      content: "Tiếp cận các tạp chí y khoa quốc tế.",
                    },
                    {
                      title: "Lịch sự kiện y tế",
                      content: "Cung cấp thông tin về lịch sự kiện y tế.",
                    },
                  ].map((item, index) => (
                    <Box sx={{ marginBottom: 2 }} key={index}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "Averta_Semi",
                          fontSize: 16,
                          color: "#ff6366",
                        }}
                      >
                        {index + 1}. {item.title}:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "Averta_Regular",
                          fontSize: 14,
                          color: "#000",
                        }}
                      >
                        {item.content}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Averta_Regular",
                    fontSize: 14,
                    color: "#000", // Màu văn bản
                    marginBottom: 2,
                  }}
                  paragraph
                >
                  Việc bạn truy cập và sử dụng Dịch vụ được điều chỉnh bởi các
                  điều khoản và điều kiện này ("Điều khoản"). Vui lòng đọc kỹ
                  các Điều khoản và Chính sách bảo mật hiện tại như đã đề cập
                  trên Trang web. Bằng cách truy cập Dịch vụ thông qua bất kỳ
                  (các) Trang web hoặc Ứng dụng nào, bạn xác nhận rằng bạn đã
                  đọc các Điều khoản này và bạn đồng ý bị ràng buộc bởi nó.
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#ff6366", // Màu tiêu đề
                    fontSize: 16,
                    fontFamily: "Averta_Semi",
                    marginBottom: 2,
                  }}
                >
                  2. Điều khoản và điều kiện chung
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#000", // Màu văn bản
                    fontSize: 14,
                    fontFamily: "Averta_Regular",
                    marginBottom: 2,
                  }}
                  paragraph
                >
                  2.1 Bằng cách truy cập Dịch vụ thông qua Trang web của chúng
                  tôi, bạn đồng ý bị ràng buộc bởi các Điều khoản này và Chính
                  sách bảo mật có sẵn tại
                  {/* <a
                    href="https://docquity.com/privacypolicy/"
                    style={{ color: "#ff6366" }}
                  >
                    {" "}
                    https://docquity.com/privacypolicy/
                  </a> */}
                  . Bạn cũng đồng ý bị ràng buộc bởi bất kỳ điều khoản và điều
                  kiện bổ sung nào được tham chiếu ở đây hoặc có thể áp dụng cho
                  việc sử dụng Dịch vụ.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#000", // Màu văn bản
                    fontSize: 14,
                    fontFamily: "Averta_Regular",
                    marginBottom: 2,
                  }}
                  paragraph
                >
                  2.2 Web là một phương tiện phát triển. Chúng tôi có quyền thay
                  đổi hoặc sửa đổi các Điều khoản này. Trong trường hợp chúng
                  tôi thay đổi hoặc sửa đổi các Điều khoản này, chúng tôi sẽ
                  công bố các Điều khoản sửa đổi trên (các) Trang web của chúng
                  tôi với ngày sửa đổi cuối cùng được ghi lại hợp lệ. Bạn đồng ý
                  xem lại phiên bản mới nhất của Điều khoản mỗi khi bạn sử dụng
                  Dịch vụ để bạn biết về bất kỳ thay đổi hoặc sửa đổi nào. Bằng
                  cách tiếp tục sử dụng Dịch vụ sau ngày sửa đổi mới nhất, bạn
                  đồng ý bị ràng buộc bởi các Điều khoản sửa đổi.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#000", // Màu văn bản
                    fontSize: 14,
                    fontFamily: "Averta_Regular",
                    marginBottom: 2,
                  }}
                >
                  Chi tiết Điều khoản này và Chính sách bảo mật có sẵn tại
                  {/* <a
                    href="https://docquity.com/privacypolicy/"
                    style={{ color: "#ff6366" }}
                  >
                    {" "}
                    https://docquity.com/privacypolicy/
                  </a> */}
                  .
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default LegacyPage;
