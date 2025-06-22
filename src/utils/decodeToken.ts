import { current } from "@reduxjs/toolkit";
import { decode } from "punycode";

const isExpiredToken = (token: string): boolean => {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodePayload = JSON.parse(atob(payloadBase64));

    const currentTime = Math.floor(Date.now() / 1000);
    console.log("decodePayload", decodePayload);
    console.log("curentTime", currentTime);
    console.log(decodePayload.exp <= currentTime);
    return decodePayload.exp <= currentTime;
  } catch (error) {
    return true;
  }
};

export default isExpiredToken;
