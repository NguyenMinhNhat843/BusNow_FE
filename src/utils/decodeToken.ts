const isExpiredToken = (token: string): boolean => {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodePayload = JSON.parse(atob(payloadBase64));

    const currentTime = Math.floor(Date.now() / 1000);
    return decodePayload.exp <= currentTime;
  } catch (error) {
    return true;
  }
};

export default isExpiredToken;
