import React, { FC, useEffect, useState } from "react";
import { Avatar, Box, Header, Icon, Page, Text, useNavigate } from "zmp-ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserData } from "redux/types";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { userZaloAtom, userZaloState } from "state.app";
import ApiService from "../../services/common.api";
import store from "redux";
import { closeApp } from "zmp-sdk/apis";
import { HeaderComponent } from "./component/header";

import { getStorage as getZaloStore, } from "zmp-sdk/apis";
const DetailInforPage: FC = () => {
  const navigate = useNavigate(); 
  const [userDataLogin, setUserDataLogin] = useState<any>(null);
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
  console.log('data response',userDataLogin);
  return (
    <Page id="info-page">
      <HeaderComponent/>
      <Box id="account" className="container">
        <Box className="top">
          <Avatar size={100} src={userDataLogin?.avatar} />
          <Text.Title>{userDataLogin?.customer?.name}</Text.Title>
          <Text>{userDataLogin?.customer?.phoneNumber}</Text>
        </Box>
      </Box>
    </Page>
  );
};

export default DetailInforPage;
