"use strict";
import axios from "axios";
import ApiService from "./common.api";

const endpoint = "https://graph.zalo.me/v2.0/me/info";
const secretKey = import.meta.env.VITE_SECRET_KEY;
console.log(secretKey);


export const getPhoneRequest = async (token: string | undefined) => {
  try {
    const accessToken = await ApiService.getAccessToken();

    const response = await axios.get(endpoint, {
      headers: {
        access_token: accessToken,
        code: token,
        secret_key: secretKey,
      },
    });
    // console.log('dada', response.data.data.number)
    return response.data?.data?.number;
  } catch (error) {
    console.log('e', error)
    return "";
  }
};
