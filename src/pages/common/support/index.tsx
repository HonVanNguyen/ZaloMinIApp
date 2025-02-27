import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { itemBlogs } from "state";
import { Page } from "zmp-ui";

import { getStorage as getZaloStore } from "zmp-sdk/apis";
import { HeaderPage } from "../component/header";
const SupportPage: React.FunctionComponent = () => {
  const products = useRecoilValue(itemBlogs);
  const [userDataLogin, setUserDataLogin] = useState(null);
  const handleSwitchChange = (value: boolean) => {
    console.log("Trạng thái Switch:", value); // Lấy trạng thái từ Recommend
  };
  useEffect(() => {
    const fetchData = async () => {
      const { userDataLogin } = await getZaloStore({
        keys: ["userDataLogin"],
      });
      setUserDataLogin(userDataLogin);
    };
    fetchData();
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
        <HeaderPage title="Trợ giúp" />
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
          <Typography variant="h4" sx={{ color: "#2c3e50" }}>
            Trợ Giúp
          </Typography>

          <Typography sx={{ lineHeight: 1.6 }}>
            Chào mừng bạn đến với phần trợ giúp của chúng tôi. Dưới đây là các
            câu hỏi thường gặp (FAQ) và hướng dẫn giúp bạn giải quyết các vấn đề
            thường gặp khi sử dụng nền tảng của chúng tôi.
          </Typography>

          <Typography variant="h6" sx={{ color: "#2c3e50" }}>
            1. Làm thế nào để tạo tài khoản?
          </Typography>
          <Typography sx={{ lineHeight: 1.6 }}>
            Để tạo tài khoản, bạn chỉ cần nhấn vào nút "Đăng ký" ở góc phải trên
            cùng của trang. Sau đó, điền thông tin cá nhân và làm theo các bước
            hướng dẫn.
          </Typography>

          <Typography variant="h6" sx={{ color: "#2c3e50" }}>
            2. Làm thế nào để thay đổi mật khẩu?
          </Typography>
          <Typography sx={{ lineHeight: 1.6 }}>
            Để thay đổi mật khẩu, hãy truy cập vào phần "Cài đặt tài khoản",
            chọn "Đổi mật khẩu" và làm theo hướng dẫn. Đảm bảo rằng bạn sử dụng
            mật khẩu mạnh để bảo vệ tài khoản của mình.
          </Typography>

          <Typography variant="h6" sx={{ color: "#2c3e50" }}>
            3. Tôi có thể phục hồi tài khoản của mình không?
          </Typography>
          <Typography sx={{ lineHeight: 1.6 }}>
            Nếu bạn quên mật khẩu, bạn có thể sử dụng chức năng "Quên mật khẩu"
            trên màn hình đăng nhập. Một email sẽ được gửi đến bạn để hướng dẫn
            cách khôi phục mật khẩu.
          </Typography>

          <Typography variant="h6" sx={{ color: "#2c3e50" }}>
            4. Làm thế nào để liên hệ với bộ phận hỗ trợ khách hàng?
          </Typography>
          <Typography sx={{ lineHeight: 1.6 }}>
            Bạn có thể liên hệ với bộ phận hỗ trợ khách hàng thông qua phần
            "Liên hệ" trên trang web. Điền thông tin yêu cầu và đội ngũ của
            chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.
          </Typography>

          <Typography variant="h6" sx={{ color: "#2c3e50" }}>
            5. Tôi có thể báo cáo lỗi như thế nào?
          </Typography>
          <Typography sx={{ lineHeight: 1.6 }}>
            Nếu bạn gặp phải lỗi hoặc sự cố trong quá trình sử dụng nền tảng,
            hãy sử dụng công cụ "Báo cáo lỗi" trong phần cài đặt. Đảm bảo mô tả
            chi tiết vấn đề để chúng tôi có thể hỗ trợ bạn nhanh chóng.
          </Typography>
        </Box>
      </Box>
    </Page>
  );
};

export default SupportPage;
