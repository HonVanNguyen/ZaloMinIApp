import React, { useEffect } from "react";
import { FC } from "react";
import { Page, Text } from "zmp-ui";
import { openChat } from "zmp-sdk/apis";

const openChatScreen = async () => {
  try {
    await openChat({
      type: "oa",
      id: import.meta.env.VITE_IP_OA,
      message: "Xin Chào",
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
  }
};
const MessagePage: FC = () => {
  useEffect(() => {
    openChatScreen();
  }, []);
  return (
    <Page
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <img src="https://static.kinhtedothi.vn/w960/images/upload/2023/08/18/z1-4x.png"></img>
      <button
        style={{
          width: "250px",
          height: "80px",
          border: "1px solid #000",
          borderRadius: "20px",
          color: "#fff",
          background: "rgb(1 104 255)",
          fontSize: "2em",
          margin: "20px",
        }}
        onClick={() => openChatScreen()}
      >
        Mở chat
      </button>
    </Page>
  );
};

export default MessagePage;
