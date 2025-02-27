import {
  Box,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { IC_DONE, IC_NOTICE } from "assets/common";
import { API_LOGIN } from "common/api/path.api";
import axiosInstance from "common/axios";
import { useGetListFormData } from "pages/index/common/hook/useGetDataForm";
import { useUpdateFormDynamic } from "pages/index/common/hook/useUpdateDataForm";
import React, { FC, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { store } from "redux/store";
import { storePhoneNumber } from "state";
import { getConfig } from "utils/config";
import {
  getStorage as getZaloStore,
  setStorage as setZaloStore,
} from "zmp-sdk/apis";
import { Page } from "zmp-ui";
import MiniZaloService from "../../common/api/zaloMini.api";
import ApiService from "../../services/common.api";
import { HeaderComponent } from "./component/header";
import { prepareDynamicData } from "pages/index/common/utils/prepaire";
import { setAccessTokenApp } from "pages/index/common/home.slice";
const ProfilePage: FC = () => {
  //
  const listFData = useGetListFormData();

  const phoneNumber = useRecoilValue(storePhoneNumber);
  const [loading, setLoading] = useState(false);
  // const userDataLogin = useRecoilValue(useInfoApp);
  const [userDataLogin, setUserDataLogin] = useState(null);
  //
  const [state, setState] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>(
    "Lưu thông tin thất bại"
  );
  const [messTitle, setMesTitle] = React.useState<string>("Lưu ý");
  const [success, setSuccess] = React.useState<string>("#1DA891");
  const [iconStatus, setIconStatus] = React.useState(IC_NOTICE);

  const handleClose = () => {
    setState(false);
  };

  const [editStatus, setEditStatus] = useState<boolean>(false);

  const handleEditClick = () => {
    setEditStatus(true);
  };

  // code

  const { mutate, isLoading, isSuccess, isError, error } =
    useUpdateFormDynamic();
  const [formData, setFormData] = useState(
    () =>
      listFData?.data?.items.reduce((acc, item) => {
        acc[item.key] = ""; // Gán giá trị mặc định là chuỗi rỗng cho tất cả các key
        return acc;
      }, {}) || {} // Đảm bảo `formData` không bị undefined nếu `listFData` không tồn tại
  );
  // error
  const [errorR, setErrorData] = useState(
    () =>
      listFData?.data?.items.reduce((acc, item) => {
        if (userDataLogin) {
          acc[item.key] = ""; // Gán giá trị mặc định là chuỗi rỗng
        } else {
          acc[item.key] = ""; // Gán giá trị mặc định là chuỗi rỗng
        }
        return acc;
      }, {}) || {} // Đảm bảo `errorR` không bị undefined nếu `listFData` không tồn tại
  );

  // Hàm validate
  const validate = (dataCheck: any) => {
    const newErrors: Record<string, string> = {}; // Khởi tạo object để lưu lỗi

    if (dataCheck?.data?.items?.length > 0) {
      dataCheck.data.items.forEach((item: any) => {
        const value = formData[item.key]; // Lấy giá trị từ `formData` dựa trên `key`
        if (item.required && (!value || value.trim() === "")) {
          // Kiểm tra nếu `required` và giá trị bị thiếu
          newErrors[item.key] = `${item.name} không được để trống.`; // Thêm thông báo lỗi
        }
        try{
          // Kiểm tra regex nếu có
          if (item.regex) {
            const regex =
              item.regex instanceof RegExp ? item.regex : new RegExp(item.regex);
  
            if (value && !regex.test(value)) {
              newErrors[item.key] = `${item.name} không đúng định dạng.`;
            }
          }
        } catch(error)
        {
          console.log('Lỗi regex')
        }
      });
    }

    setErrorData(newErrors); // Cập nhật state lỗi
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  // Hàm xử lý khi thay đổi dữ liệu
  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value, // Cập nhật giá trị của trường dựa trên key
    }));
    setErrorData((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async () => {
    try{
      if (validate(listFData)) {
        const dataUpdate = {
          name: formData["name"] || "",
          dynamicData: prepareDynamicData(formData),
        };
  
        mutate(dataUpdate, {
          onSuccess: async (response) => {
            setMessage("Đã lưu thông tin cá nhân thành công");
            setMesTitle("Thông báo");
            setSuccess("#1DA891");
            setIconStatus(IC_DONE);
            setState(true);
            setEditStatus(false);
            const dataRes = response;
            if (userDataLogin) {
              const dataToSave = userDataLogin as Record<string, any>;
              dataToSave.customer = dataRes;
              await setZaloStore({
                data: {
                  userDataLogin: dataToSave,
                },
              });
            }
            return;
          },
          onError: (err) => {
            setMessage(`Lưu thông tin thất bại: ${err?.message}`);
            setMesTitle("Lưu ý");
            setSuccess("#E82629");
            setIconStatus(IC_NOTICE);
            setState(true);
            // const errMessage = err?.message || "";
            // update
            // console.error("Lỗi khi cập nhật:", errMessage);
            // const newErrors = { ...errorR };
            // Object.keys(formData).forEach((key) => {
            //   const testRegex = new RegExp(`\\b${key}\\b`, "i");
            //   if (testRegex.test(errMessage)) {
            //     newErrors[key] = `${formData[key]} không phải ${key}`; // Hoặc thông báo tùy ý
            //   }
            // });
            // setErrorData(newErrors);
            return;
          },
        });
  
       
      }
    } catch (error)
    {
      console.log(error);
      setMessage(`Lưu thông tin thất bại `);
      setMesTitle("Lưu ý");
      setSuccess("#E82629");
      setIconStatus(IC_NOTICE);
      setState(true);
    }
   
  };

  const getPhone = async () => {
    const phoneZaloRes = await MiniZaloService.getPhoneNumber();
    const convertPhoneNumber = (phone: string): string => {
      if (phone.startsWith("84")) {
        return "0" + phone.slice(2);
      }
      return phone; // Trả về chuỗi không đổi nếu không bắt đầu bằng "84"
    };

    if (phoneZaloRes) {
      const phoneZalo = convertPhoneNumber(phoneZaloRes);
      await ApiService.setDataToStorage(phoneZalo, "phoneNumber");

      handleInputChange("phone", phoneZalo);
      // get access token
      const response: any = await axiosInstance.post(API_LOGIN, {
        phoneNumber: phoneNumber,
      });
      const { accessToken, refreshToken } = response;

      store?.dispatch(setAccessTokenApp(accessToken));

      const { errorKeys } = await setZaloStore({
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
      if (errorKeys) {
        console.log("Error keys:", errorKeys);
      }
    }
  };

  // const handleSwitchChange = (value: boolean) => {
  //   console.log("Trạng thái Switch:", value); // Lấy trạng thái từ Recommend
  // };

  const renderCount = useRef(0);
  // let dataInit ;
  useEffect(() => {
    const getUser = async () => {
      const { userDataLogin } = await getZaloStore({
        keys: ["userDataLogin"],
      });
      setUserDataLogin(userDataLogin);
    };
    if (renderCount.current < 30) {
      getUser();
      renderCount.current += 1;
    } else {
      console.log("end");
    }
  }, [userDataLogin]);

  useEffect(() => {
    if (userDataLogin) {
      fetchData(userDataLogin);
    }
  }, [userDataLogin]);

  const fetchData = async (userDataLogin: any) => {
    if (userDataLogin) {
      const updatedFormData = {};
      listFData?.data?.items.forEach((item) => {
        updatedFormData[item.key] =
          userDataLogin?.customer?.dynamicData[item.key] || "";
      });
      if (updatedFormData) {
        setFormData((prevData) => ({
          ...prevData,
          ...updatedFormData,
        }));
      }
    }
  };

  const handleCustomChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <Page className="h-screen">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          position: "relative",
          height: "100%",
        }}
      >
        <HeaderComponent status={editStatus} onEditClick={handleEditClick} />
        <Box
          component="form"
          sx={{
            position: "absolute",
            top: "16vh",
            paddingBottom: "120px !important",
            zIndex: 10,
            fontFamily: "Averta_Regular",
            borderRadius: "30px",
            width: "90%",
            padding: "0px 20px",
            paddingTop: "20px",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "30px",
          }}
          noValidate
          className="input-data"
        >
          {listFData &&
            listFData?.data?.items.length > 0 &&
            listFData.data.items.map((item) => {
              if (item.type === "SELECT") {
                return (
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    <TextField
                      variant="standard"
                      key={item.key}
                      required={item?.required}
                      sx={{
                        width: "100%",
                        fontFamily: "Averta_Regular",
                      }}
                      id={item?.key}
                      label={item?.name}
                      slotProps={{
                        input: {
                          readOnly: item?.key === "phone" || !editStatus,
                        },
                      }}
                      select
                      value={formData[item.key] || ""}
                      onChange={(e) =>
                        handleInputChange(item.key, e.target.value)
                      }
                      error={!!errorR[item.key]}
                      helperText={errorR[item.key]}
                    >
                      {item.options &&
                        item.options.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      {!item.options.includes(formData[item.key]) &&
                        formData[item.key] !== "another" && (
                          <MenuItem value={formData[item.key]}>
                            {formData[item.key]}
                          </MenuItem>
                        )}
                      <MenuItem value="another">
                        {formData[item.key] === "another" &&
                        formData[`${item.key}_custom`]
                          ? formData[`${item.key}_custom`]
                          : "Khác"}
                      </MenuItem>
                    </TextField>
                    {formData[item.key] === "another" && (
                      <TextField
                        label="Nhập vào giá trị"
                        variant="standard"
                        value={formData[`${item.key}_custom`] || ""}
                        onChange={(e) =>
                          handleCustomChange(
                            `${item.key}_custom`,
                            e.target.value
                          )
                        }
                        sx={{
                          width: "100%",
                          fontFamily: "Averta_Regular",
                          marginTop: "16px",
                        }}
                      />
                    )}
                  </Box>
                );
              } else {
                return (
                  <TextField
                    variant="standard"
                    required={item?.required}
                    sx={{
                      width: "100%",
                      fontFamily: "Averta_Regular",
                    }}
                    id={item?.key}
                    label={item?.name}
                    slotProps={{
                      input: {
                        readOnly: item?.key === "phone" || !editStatus,
                      },
                    }}
                    value={formData[item.key] || ""}
                    onChange={(e) =>
                      handleInputChange(item.key, e.target.value)
                    }
                    onClick={() => {
                      if (editStatus) {
                        if (item.key === "phone") {
                          getPhone();
                        }
                      }
                    }}
                    error={!!errorR[item.key]}
                    helperText={errorR[item.key]}
                  />
                );
              }
            })}

          {editStatus ? (
            <Button
              onClick={() => {
                handleSubmit();
              }}
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
                {loading ? `Đang lưu` : `Lưu thay đổi`}
              </Typography>
            </Button>
          ) : null}
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={state}
        onClose={handleClose}
        message={message}
        autoHideDuration={3000}
        sx={{
          top: "0",
          padding: "0",
          margin: "0",
          left: "0",
          right: "0",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          background: success,
        }}
      >
        <Box
          sx={{
            width: "parent",
            display: "contents",
            padding: "0 40px",
          }}
        >
          <Box
            sx={{
              marginLeft: "15px",
              width: "40px",
              height: "40px",
            }}
          >
            <img
              loading="lazy"
              src={iconStatus}
              alt="icon-status"
              width={"24px"}
              height={"24px"}
            />
          </Box>
          <Box
            sx={{
              width: "100vw",
              left: "0",
              right: "0",
              padding: "0",
              margin: "0",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Averta_Semi",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              {messTitle}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Averta_Regular",
                fontSize: "14px",
                color: "#fff",
              }}
            >
              {message}
            </Typography>
          </Box>
        </Box>
      </Snackbar>
    </Page>
  );
};

export default ProfilePage;
