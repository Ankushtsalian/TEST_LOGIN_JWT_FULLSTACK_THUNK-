const authHeader = (token) => {
  return {
    headers: {
      authorization: `Bearer ${token ? token : "abcdefgh"}`,
    },
  };
};

export default authHeader;
