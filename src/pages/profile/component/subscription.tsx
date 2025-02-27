import React, { FC, useEffect, useState } from "react";
// import { getConfig } from "./config";
import { Box, Typography } from "@mui/material";
import { getConfig } from "utils/config";
import { useNavigate } from "react-router-dom";

import { getStorage as getZaloStore } from "zmp-sdk/apis";
import { ModalInput } from "pages/index/component/popup/modal_input";
interface SubscriptionProps {
  onReload: () => void; // Callback từ component cha
}
export const Subscription: FC<SubscriptionProps> = ({ onReload }) => {
  const [userDataLogin, setUserDataLogin] = useState(null);

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const [shouldReload, setShouldReload] = useState(false);

  const fOpenModal = async () => {
    const { userDataLogin } = await getZaloStore({
      keys: ["userDataLogin"],
    });
    if (userDataLogin) {
      setOpenModal(false);
      navigate("/update-profile");
    } else {
      setOpenModal(true);
    }
  };

  const handleModalSubmit = () => {
    console.log("Reloading component...");
    setShouldReload(true); // Đánh dấu cần reload
    onReload();
  };

  useEffect(() => {
    if (shouldReload) {
      // Reload logic, ví dụ fetch lại dữ liệu
      console.log("Component reloaded after modal submit");
      setShouldReload(false); // Reset lại sau khi xử lý
    }
  }, [shouldReload]);

  return (
    <Box
      sx={{
        marginTop: "16vh",
        background: getConfig((config) => config.template.mainColor4),
        padding: "10px 0px",
        borderRadius: "10px",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'20px',
        marginRight:'20px'
      }}
      id="profile_container"
    >
      <Box
        sx={{
          background: {},
          width:'95vw'
        }}
        onClick={() => fOpenModal()}
      >
        <Typography
          sx={{
            fontFamily: "Averta_Semi",
           
            fontSize: "16px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          Cập nhập thông tin
        </Typography>
      </Box>
      {openModal ? (
        <Box className="box-input">
          <ModalInput onSubmit={handleModalSubmit} isVisible={openModal} setIsVisible={setOpenModal} />
        </Box>
      ) : null}
    </Box>
  );
};
