import { getTokenFromLocalStorage } from "./Local-Storage";

const authHeader = (token1, contentType) => {
  const token = getTokenFromLocalStorage();

  return !contentType
    ? {
        headers: {
          authorization: `Bearer ${token ? token : ""}`,
        },
      }
    : {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token ? token : ""}`,
        },
      };
};

export default authHeader;
