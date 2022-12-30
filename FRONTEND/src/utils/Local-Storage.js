export const addTokenToLocalStorage = (Token) => {
  localStorage.setItem("Token", Token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("Token");
};
export const removeProfileFromLocalStorage = () => {
  localStorage.removeItem("profile");
};

export const getTokenFromLocalStorage = () => {
  const Token = localStorage.getItem("user");
  //   const user = result ? JSON.parse(result) : null;
  return Token;
};
