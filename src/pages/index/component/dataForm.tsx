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
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [addressW, setAddressW] = useState<string>("");
  const [address, setAddress] = useState<string>("");


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
        width: "100%",
        padding: '0px',
        paddingTop:'20px',
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
          width: "100%",
          fontFamily: "Averta_Regular",
        }}
        id="fullName"
        label="Họ và tên"
        defaultValue={name}
        
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        required
        sx={{
          width: "100%",
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
          width: "100%",
          fontFamily: "Averta_Regular",
        }}
        id="email"
        label="Email"
        
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        required
        sx={{
          width: "100%",
          fontFamily: "Averta_Regular",
        }}
        id="position"
        label="Chức danh"
        
        defaultValue={position}
        onChange={(e) => setPosition(e.target.value)}
        error={!!errors.position}
        helperText={errors.position}
      />
      <TextField
        required
        sx={{
          width: "100%",
          fontFamily: "Averta_Regular",
        }}
        id="major"
        label="Chuyên khoa"
        
        defaultValue={major}
        onChange={(e) => setMajor(e.target.value)}
        error={!!errors.major}
        helperText={errors.major}
      />
      <TextField
        required
        sx={{
          width: "100%",
          fontFamily: "Averta_Regular",
        }}
        id="address-work"
        label="Địa chỉ làm việc"
        
        defaultValue={addressW}
        onChange={(e) => setAddressW(e.target.value)}
        error={!!errors.addressW}
        helperText={errors.addressW}
      />
      <TextField
        sx={{
          width: "100%",
          fontFamily: "Averta_Regular",
        }}
        id="address"
        label="Địa chỉ văn phòng"
        
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
