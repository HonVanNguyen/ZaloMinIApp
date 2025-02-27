import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Page } from "zmp-ui";

import { HeaderPage } from "../component/header";
const PolicyPage: React.FunctionComponent = () => {
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
        <HeaderPage title="Chính sách" />
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
              <Box
              sx={{
                width:'100%',
                height:'100%'
              }}>

                <Typography
                  sx={{
                    color: "#000", // Màu tiêu đề
                    marginBottom: 2,
                    fontSize: "12px",
                    fontStyle: "italic",
                    fontFamily: "Averta_Regular",
                  }}
                >
                  Chính sách này mô tả cách DOCQUITY HOLDINGS PTE. LTD. (UEN:
                  201703503D), một công ty được thành lập tại Singapore có văn phòng
                  đăng ký tại 150 Beach Road, #35-28, The Gateway West, Singapore
                  189720, các công ty con, chi nhánh và các công ty liên quan
                  ("Docquity", "chúng tôi" hoặc "của chúng tôi") thu thập, sử dụng,
                  chia sẻ và xử lý thông tin cá nhân về các cá nhân ("bạn" và/hoặc
                  "của bạn") những người truy cập và sử dụng trang web của chúng tôi
                  tại www.docquity.com, tất cả các trang web liên kết (bao gồm cả Ứng
                  dụng di động Docquity), API và bất kỳ ứng dụng nào khác do chúng tôi
                  hoặc các chi nhánh của chúng tôi ("Trang web") xuất bản để truy cập
                  hoặc sử dụng Trang web do chúng tôi sở hữu và điều hành, những người
                  tiền nhiệm hoặc người kế nhiệm của chúng tôi hoặc các chi nhánh của
                  chúng tôi và bất kỳ sản phẩm, tính năng liên quan nào, và Dịch vụ.
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#ff6366", // Màu tiêu đề
                    marginBottom: 2,
                    fontFamily: "Averta_Semi",
                    textTransform: "uppercase",
                    fontSize: "16px",

                  }}
                >
                  Phạm vi
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#000", // Màu văn bản
                    marginBottom: 2,
                    fontFamily: "Averta_Regular",
                    fontSize: "14px",

                  }}
                >
                  Chính sách này áp dụng cho việc thu thập, lưu trữ, xử lý, chuyển
                  giao và sử dụng Dữ liệu Cá nhân liên quan đến khách hàng của mình,
                  bao gồm thuê ngoài và các dịch vụ khác, khách hàng, đối tác kinh
                  doanh, nhân viên, nhân viên cũ và người nộp đơn xin việc, ("cá nhân
                  được bảo hiểm") trừ trường hợp bất kỳ hợp đồng nào với một cá nhân
                  được bảo hiểm xác định các yêu cầu khác nhau.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#000", // Màu văn bản
                    marginBottom: 2,
                    fontFamily: "Averta_Regular",
                    fontSize: "14px",

                  }}
                >
                  Dữ liệu Cá nhân có thể được thu thập từ các cá nhân/người dùng được
                  bảo hiểm thông qua nhiều phương tiện khác nhau, bao gồm, ví dụ,
                  thông qua các trang web, Ứng dụng di động, các kênh đặt hàng khác và
                  quy trình dịch vụ hoặc tuyển dụng.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#000", // Màu văn bản
                    marginBottom: 2,
                    fontFamily: "Averta_Regular",
                    fontSize: "14px",

                  }}
                >
                  Chính sách này nhằm tạo điều kiện thuận lợi cho các nguyên tắc
                  "Quyền riêng tư theo thiết kế" trong việc thiết kế và triển khai các
                  hệ thống và quy trình của Docquity. Do đó, trong số những thứ khác,
                  nó nhằm điều chỉnh các chính sách bảo vệ dữ liệu của khách hàng và
                  nhân viên, đồng thời ảnh hưởng đến các tiêu chuẩn triển khai hệ
                  thống; sách quy tắc; quy trình kinh doanh; Ứng dụng; phát triển web,
                  sản phẩm và dịch vụ; và lộ trình công nghệ.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#000", // Màu văn bản
                    marginBottom: 2,
                    fontFamily: "Averta_Regular",
                    fontSize: "14px",

                  }}
                >
                  Nó mô tả chính sách của chúng tôi về việc thu thập, sử dụng, tiết
                  lộ, lưu giữ và bảo vệ thông tin cá nhân của bạn khỏi gian lận, lạm
                  dụng. Nó áp dụng cho các Trang web và ứng dụng của chúng tôi mà
                  Chính sách này được tham chiếu, bất kể bạn truy cập hoặc sử dụng
                  chúng như thế nào.
                </Typography>

                <Box sx={{ fontFamily: "Averta_Regular", color: "#000", fontSize: "14px",}}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#ff6366", // Màu tiêu đề
                      marginBottom: 2,
                      fontFamily: "Averta_Semi",
                      fontSize: "14px",
                    }}
                  >
                    Trong Chính sách này, trừ khi ngữ cảnh yêu cầu khác, các thuật ngữ
                    sau đây sẽ có ý nghĩa tương ứng tương ứng với chúng:
                  </Typography>

                  <Box sx={{ marginBottom: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#ff6366", fontFamily: "Averta_Semi", fontSize: "16px", }}
                    >
                      Tài liệu:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#000", fontFamily: "Averta_Regular", fontSize: "14px", }}
                    >
                      Hình ảnh và nội dung, bao gồm nhưng không giới hạn ở văn bản,
                      trang, phần mềm, đồ họa, dữ liệu, tin nhắn, Dịch vụ, bất kỳ
                      thông tin nào khác và bất kỳ nội dung Trang web nào khác do
                      Docquity sở hữu, điều hành, cấp phép hoặc kiểm soát.
                    </Typography>
                  </Box>

                  <Box sx={{ marginBottom: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#ff6366", fontFamily: "Averta_Semi", fontSize: "16px", }}
                    >
                      Dữ liệu cá nhân:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#000", fontFamily: "Averta_Regular", fontSize: "14px", }}
                    >
                      Bất kỳ thông tin nào liên quan đến một thể nhân, trực tiếp hoặc
                      gián tiếp, kết hợp với thông tin khác có sẵn hoặc có khả năng có
                      sẵn với một tổ chức, có thể xác định (các) người đó.
                    </Typography>
                  </Box>

                  <Box sx={{ marginBottom: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#ff6366", fontFamily: "Averta_Semi", fontSize: "16px", }}
                    >
                      Mục đích:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#000", fontFamily: "Averta_Regular", fontSize: "14px", }}
                    >
                      Mục đích của Trang web và Tài liệu của chúng tôi, nhằm cung cấp
                      cho Người dùng của chúng tôi một nền tảng để giáo dục y tế và
                      chia sẻ kiến thức.
                    </Typography>
                  </Box>

                  <Box sx={{ marginBottom: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#ff6366", fontFamily: "Averta_Semi", fontSize: "16px", }}
                    >
                      Dịch vụ:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#000", fontFamily: "Averta_Regular", fontSize: "14px", }}
                    >
                      Tất cả các dịch vụ và ứng dụng nền tảng (bao gồm nhưng không
                      giới hạn ở:
                      <ul>
                        <li>
                          (i) "DocTalks", một thư viện các bài giảng video ngắn từ các
                          chuyên gia y tế;
                        </li>
                        <li>
                          (ii) Hội thảo trên web trực tiếp và tương tác bởi các nhà
                          lãnh đạo quan điểm chính thảo luận về các chủ đề y tế chuyên
                          ngành;
                        </li>
                        <li>(iii) Tiếp cận các tạp chí y khoa quốc tế;</li>
                        <li>(iv) Lịch sự kiện y tế;</li>
                        <li>(v) Truy cập vào nền tảng trò chuyện tuân thủ HIPPA;</li>
                        <li>(vi) Các bài báo y tế tóm tắt;</li>
                        <li>
                          (vii) Điều khoản để đạt được các tín chỉ "SKP" / Phát triển
                          chuyên môn liên tục ("CPD") / Giáo dục Y tế Tiếp tục ("CME")
                          được công nhận từ các hiệp hội và tổ chức y tế hàng đầu;
                        </li>
                        <li>
                          (viii) Cung cấp chứng nhận lưu trữ trên ví ảo trên Trang
                          web;
                        </li>
                        <li>
                          (ix) Quy định tiếp nhận mẫu thuốc từ các công ty dược phẩm
                          hàng đầu để thử nghiệm;
                        </li>
                        <li>(x) Tạp chí và hướng dẫn;</li>
                        <li>
                          (xi) Tiếp cận các cuộc thảo luận về trường hợp lâm sàng,
                          thông tin chi tiết về y tế và các cuộc thăm dò ý kiến;
                        </li>
                        <li>(xii) Các kênh chuyên biệt.</li>
                      </ul>
                    </Typography>
                  </Box>

                  <Box sx={{ marginBottom: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#ff6366", fontFamily: "Averta_Semi", fontSize: "16px", }}
                    >
                      Người dùng:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#000", fontFamily: "Averta_Regular",fontSize: "14px", }}
                    >
                      Bất kỳ cá nhân nào đã đăng ký với Trang web / ứng dụng (và đồng
                      ý với các điều khoản của Chính sách này) để sử dụng Trang web và
                      truy cập Tài liệu cho Mục đích.
                    </Typography>
                  </Box>

                  <Box sx={{ marginBottom: 2, fontFamily: "Averta_Regular" }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#ff6366", fontFamily: "Averta_Semi", fontSize: "16px", }}
                    >
                      Khách truy cập:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#000", fontFamily: "Averta_Regular", fontSize: "14px", }}
                    >
                      Khách truy cập vào Trang web / ứng dụng truy cập các phần có sẵn
                      công khai của Trang web, những người không phải là Người dùng đã
                      đăng ký.
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#000", // Màu văn bản
                    marginBottom: 2,
                    fontFamily: "Averta_Regular",
                    fontSize: "14px",
                  }}
                >
                  Bằng cách sử dụng Dịch vụ, cho dù là Người dùng hay Khách truy cập,
                  bạn xác nhận rằng bạn đã đọc Chính sách này và đồng ý với việc xử lý
                  thông tin cá nhân của bạn như được mô tả trong chính sách này, chúng
                  tôi có thể cập nhật theo thời gian như được mô tả trong phần "Thay
                  đổi đối với Chính sách Bảo mật này", bên dưới.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#000", // Màu văn bản
                    marginBottom: 2,
                    fontFamily: "Averta_Regular",
                    fontSize: "14px",
                  }}
                >
                  Bằng cách sử dụng Dịch vụ, bạn đồng ý cho thông tin cá nhân của mình
                  được lưu trữ và xử lý theo cách khác như được mô tả trong Chính sách
                  này.
                </Typography>
              </Box>
            )}
        </Box>
      </Box>
    </Page>
  );
};

export default PolicyPage;
