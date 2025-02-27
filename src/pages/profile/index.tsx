import React, { FC, useEffect, useState } from "react";
import {
  Page
} from "zmp-ui";
import { HeaderComponent } from "./component/header";
import { Personal } from "./component/personal";
import { Subscription } from "./component/subscription";

import { getUserInfo, getStorage as getZaloStore, } from "zmp-sdk/apis";
const ProfilePage: FC = () => {
  const [pageKey, setPageKey] = useState(false);
  const [userInf, setUserInf] = useState<any>();
  const [userDataLogin, setUserDataLogin] = useState<any>(null);
  const handleReloadPage = () => {
    setPageKey(true);
  };
  useEffect(() => {
    if(pageKey){
      console.log("Component reloaded after modal submit index");
      setPageKey(false);
    }
  }, [pageKey]);
  const getUser = async () => {
    try {
      const { userInfo } = await getUserInfo({});
      return userInfo;
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const user:any = await getUser(); // Chờ kết quả từ getUser()
      if(user)
      {
        setUserInf(user); // Cập nhật state sau khi nhận dữ liệu
      }
      const {userDataLogin} = await getZaloStore({
        keys: ["userDataLogin"],
      });
      setUserDataLogin(userDataLogin)
    };
  
    fetchData(); // Gọi hàm fetchData mà không cần kiểm tra if(fetchData)
  }, []);

  return (
    <Page>
      <HeaderComponent/>
      <Subscription onReload={handleReloadPage} />
      <Personal />
    </Page>
  );
};

export default ProfilePage;
