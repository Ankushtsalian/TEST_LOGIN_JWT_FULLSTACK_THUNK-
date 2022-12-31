const authHeader = (token, contentType) => {
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
