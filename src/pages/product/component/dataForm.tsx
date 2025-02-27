import React, { FC, useState } from "react";
// import { getConfig } from "./config";
import { Box, Button, Snackbar, SnackbarOrigin, TextField, Typography } from "@mui/material";
import { getConfig } from "utils/config";
interface DataForm {
  status: boolean;
  state?: boolean;
  onEditClick: (data: {
    name: string;
    phone: string;
    email: string;
    position: string;
    major: string;
    addressW: string;
    address: string;
  }) => void;
  onStateChange: (newState: boolean) => void; 
}


export const DataForm: FC<DataForm> = ({ status, state, onEditClick, onStateChange  }) => {
  const [name, setName] = useState<string>("Bùi Thu Trang");
  const [phone, setPhone] = useState<string>("0987654321");
  const [email, setEmail] = useState<string>("BD123@gmail.com");
  const [position, setPosition] = useState<string>("Bác sĩ");
  const [major, setMajor] = useState<string>("Tim mạch");
  const [addressW, setAddressW] = useState<string>("792 Sư Vạn Hạnh, Quận 10");
  const [address, setAddress] = useState<string>("792 Sư Vạn Hạnh, Quận 10");


  // error
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    position?: string;
    major?: string;
    addressW?: string;
    address?: string;
  }>({});

  // validate
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Họ và tên không được để trống.";
    // if (!/^\d{10}$/.test(phone)) newErrors.phone = "Số điện thoại phải là 10 chữ số.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Email không hợp lệ.";
    if (!position.trim()) newErrors.position = "Chức danh không được để trống.";
    if (!major.trim()) newErrors.major = "Chuyên khoa không được để trống.";
    if (!addressW.trim()) newErrors.addressW = "Địa chỉ làm việc không được để trống.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const confirmEdit = () =>{
    if (validate()) {
      const formData = {
        name,
        phone,
        email,
        position,
        major,
        addressW,
        address,
      };

      onStateChange(true);
      console.log("Form Data:", formData);
      onEditClick(formData);

    } else {
   
      onStateChange(false);

      console.log("Validation failed.");
    }
  }

  return (
    <Box
      component="form"
      noValidate
      sx={{
        top: "-10vh",
        fontFamily: "Averta_Regular",
        borderRadius: "30px",
        width: "90vw",
        padding: "30px 10px 20px 10px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "40px",
      }}
      className="input-data"
    >
      <TextField
        required
        sx={{
          width: "90%",
          fontFamily: "Averta_Regular",
        }}
        id="fullName"
        label="Họ và tên"
        defaultValue={name}
        slotProps={{
          input: {
            readOnly: !status,
          },
        }}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        required
        sx={{
          width: "90%",
          fontFamily: "Averta_Regular",
        }}
        id="phoneNumber"
        label="Số điện thoại"
        defaultValue={phone}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        sx={{
          width: "90%",
          fontFamily: "Averta_Regular",
        }}
        id="email"
        label="Email"
        slotProps={{
          input: {
            readOnly: !status,
          },
        }}
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        required
        sx={{
          width: "90%",
          fontFamily: "Averta_Regular",
        }}
        id="position"
        label="Chức danh"
        slotProps={{
          input: {
            readOnly: !status,
          },
        }}
        defaultValue={position}
        onChange={(e) => setPosition(e.target.value)}
        error={!!errors.position}
        helperText={errors.position}
      />
      <TextField
        required
        sx={{
          width: "90%",
          fontFamily: "Averta_Regular",
        }}
        id="major"
        label="Chuyên khoa"
        slotProps={{
          input: {
            readOnly: !status,
          },
        }}
        defaultValue={major}
        onChange={(e) => setMajor(e.target.value)}
        error={!!errors.major}
        helperText={errors.major}
      />
      <TextField
        required
        sx={{
          width: "90%",
          fontFamily: "Averta_Regular",
        }}
        id="address-work"
        label="Địa chỉ làm việc"
        slotProps={{
          input: {
            readOnly: !status,
          },
        }}
        defaultValue={addressW}
        onChange={(e) => setAddressW(e.target.value)}
        error={!!errors.addressW}
        helperText={errors.addressW}
      />
      <TextField
        sx={{
          width: "90%",
          fontFamily: "Averta_Regular",
        }}
        id="address"
        label="Địa chỉ văn phòng"
        slotProps={{
          input: {
            readOnly: !status,
          },
        }}
        defaultValue={address}
        onChange={(e) => setAddress(e.target.value)}
        error={!!errors.address}
        helperText={errors.address}
      />
      {status ? (
        <Button
          onClick={()=>confirmEdit()}
          sx={{
            width: "80vw",
            padding: "10px",
            background: getConfig((config) => config.template.mainColor4),
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Averta_Regular",
              color: "white",
              // fontWeight: "500",
              fontSize: "16px",
              textTransform: "none",
            }}
          >
            Lưu thay đổi
          </Typography>
        </Button>
      ) : null}
    </Box>
  );
};
