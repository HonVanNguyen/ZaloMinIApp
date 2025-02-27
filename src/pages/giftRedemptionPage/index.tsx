import React, { FC, useEffect, useState } from "react";
import {
    Page
} from "zmp-ui";
import { GiftListData } from "./common/interface";
const GiftRedemptionPage: FC = () => {
  const [giftList, setGiftList] = useState<GiftListData | []>([]);

  const getGiftList = async () => {
    try {
    //   const { response } = await getListGiftData({});
    //   return response;
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const user:any = await getGiftList(); 
      if(user)
      {
        setGiftList(user); 
      }
    };
  
    fetchData(); 
  }, []);

  return (
    <Page className="">
    </Page>
  );
};

export default GiftRedemptionPage;
