import {
  Box,
  Button,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { IC_DONE, IC_NOTICE } from "assets/common";
import { IC_BACK } from "assets/icon";
import { API_CURRENT_USER, API_LOGIN } from "common/api/path.api";
import axiosInstance from "common/axios";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { store } from "redux/store";
import { storePhoneNumber } from "state";
import {
  getStorage as getZaloStore,
  setStorage as setZaloStore,
} from "zmp-sdk/apis";
import { Modal } from "zmp-ui";
import MiniZaloService from "../../../../common/api/zaloMini.api";
import ApiService from "../../../../services/common.api";
import { useGetListFormData } from "../../common/hook/useGetDataForm";
import { useRegisterFormDynamic } from "../../common/hook/useRegisterDataForm";
import { prepareDynamicData } from "../../common/utils/prepaire";
import { setAccessTokenApp } from "pages/index/common/home.slice";

interface ModalInputProps {
  isVisible?: boolean;
  setIsVisible?: (visible: boolean) => void;
  onSubmit?: () => void;
}
export const ModalInput: FC<ModalInputProps> = ({
  isVisible = true,
  setIsVisible,
  onSubmit,
}) => {
  const [vDialogVisible, setVDialogVisible] = useState(isVisible);
  const listFData = useGetListFormData();
  const navigate = useNavigate();
  const phoneNumber = useRecoilValue(storePhoneNumber);
  const [userDataLogin, setUserDataLogin] = useState(null);

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
  //

  const { mutate, isLoading, isSuccess, isError, error } =
    useRegisterFormDynamic();
  const [formData, setFormData] = useState(
    () =>
      listFData?.data?.items.reduce((acc, item) => {
        acc[item.key] = "";
        return acc;
      }, {}) || {} // Đảm bảo `formData` không bị undefined nếu `listFData` không tồn tại
  );
  // error
  const [errorR, setErrorData] = useState(
    () =>
      listFData?.data?.items.reduce((acc, item) => {
        if (userDataLogin) {
          acc[item.key] = "";
        } else {
          acc[item.key] = "";
        }
        return acc;
      }, {}) || {}
  );

  // Hàm validate
  const validate = (dataCheck: any) => {
    const newErrors: Record<string, string> = {};

    if (dataCheck?.data?.items?.length > 0) {
      dataCheck.data.items.forEach((item: any) => {
        const value = formData[item.key];
        if (item.required && (!value || value.trim() === "")) {
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

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    setErrorData((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async () => {
    try{
      if (validate(listFData)) {
        const dataUpdate = {
          name: formData["name"] || "",
          // email: formData["email"] || "",
          phoneNumber: formData["phone"] || "",
          status: "ACTIVE",
          dynamicData: prepareDynamicData(formData),
        };
        // mutate(dataUpdate);
        mutate(dataUpdate, {
          onSuccess: async (response) => {
            setMessage("Đã lưu thông tin cá nhân thành công");
            setMesTitle("Thông báo");
            setSuccess("#1DA891");
            setIconStatus(IC_DONE);
            setState(true);
            console.log("Cập nhật thành công:");
            setVDialogVisible(false);
            if (setIsVisible) {
              setIsVisible(false);
              if (onSubmit) onSubmit();
            }
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
            const currentUser = await axiosInstance.get(API_CURRENT_USER);
            await setZaloStore({
              data: {
                userDataLogin: currentUser,
              },
            });
            navigate("/");
          },
          onError: (err) => {
            // Xử lý thêm nếu cần
            const errMessage = err?.message || "";
            setMessage(`Lưu thông tin thất bại: ${errMessage}`);
            setMesTitle("Lưu ý");
            setSuccess("#E82629");
            setIconStatus(IC_NOTICE);
            setState(true);
            console.error("Lỗi khi cập nhật:", errMessage);
          },
        });
      }
    } catch(error)
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
      return phone;
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

  const handleCustomChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <Modal
      visible={vDialogVisible}
      //   title="Tham gia cộng đồng y khoa Docquity"
      onClose={() => {
        setVDialogVisible(false);
        if (setIsVisible) {
          setIsVisible(false);
          if (onSubmit) onSubmit();
        }
      }}
      verticalActions
      children={
        <Box>
          <Box
            onClick={() => {
              setVDialogVisible(false);
              if (setIsVisible) {
                setIsVisible(false);
                if (onSubmit) onSubmit();
              }
            }}
            zIndex={12}
          >
            <img
              loading="lazy"
              alt="out-icon"
              src={IC_BACK}
              width={30}
              height={30}
            />
            <Typography
              sx={{
                fontFamily: "Averta_Semi",
                fontSize: "18px",
                color: "#E82629",
                textAlign: "center",
              }}
            >
              Tham gia cộng đồng y khoa cùng Docquity
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            sx={{
              top: "-10vh",
              fontFamily: "Averta_Regular",
              borderRadius: "30px",
              width: "100%",
              padding: "0px",
              paddingTop: "20px",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "40px",
            }}
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
                        key={item.key}
                        required={item?.required}
                        sx={{
                          width: "100%",
                          fontFamily: "Averta_Regular",
                        }}
                        id={item?.key}
                        label={item?.name}
                        select // Đổi thành Select
                        value={formData[item.key] || ""} // Gán giá trị từ state
                        onChange={(e) =>
                          handleInputChange(item.key, e.target.value)
                        } // Xử lý thay đổi giá trị
                        error={!!errorR[item.key]} // Nếu có lỗi, hiển thị lỗi
                        helperText={errorR[item.key]} // Hiển thị thông báo lỗi
                      >
                        {item.options &&
                          item.options.map((option, index) => (
                            <MenuItem key={index} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        <MenuItem value="another">Khác </MenuItem>
                      </TextField>
                      {formData[item.key] === "another" && (
                        <TextField
                          label="Nhập vào giá trị"
                          // variant="standard"
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
                            marginTop: "40px",
                          }}
                        />
                      )}
                    </Box>
                  );
                } else {
                  return (
                    <TextField
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
                          readOnly: item.key === "phone",
                        },
                      }}
                      value={formData[item.key] || ""} // Gán giá trị từ state
                      onChange={(e) =>
                        handleInputChange(item.key, e.target.value)
                      }
                      onClick={() => {
                        if (item.key === "phone") {
                          getPhone();
                        }
                      }}
                      error={!!errorR[item.key]} // Nếu tồn tại lỗi cho key
                      helperText={errorR[item.key]} // Hiển thị thông báo lỗi
                    />
                  );
                }
              })}
            <Box
              sx={{
                width: "96vw",
                paddingLeft: "2vw",
              }}
            >
              {/* <Recommend onSwitchChange={handleSwitchChange} /> */}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                background: "#E82629",
                width: "95vw",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <Button
                sx={{
                  fontFamily: "Averta_Semi",
                  fontSize: "16px",
                  color: "#ffff",
                }}
                onClick={() => handleSubmit()}
              >
                Tham gia
              </Button>
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
          </Box>
        </Box>
      }
      //   description="This is a very long message that can be displayed in 3 lines"
    />
  );
};
