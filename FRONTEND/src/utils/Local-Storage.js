export const addTokenToLocalStorage = (Token) => {
  localStorage.setItem("Token", Token);
};
export const addProfileToLocalStorage = (src) => {
  localStorage.setItem("profile", src);
};

export const removeTokenFromLocalStorage = () => {
  localStorage?.removeItem("Token");
  localStorage?.removeItem("profile");
};
export const removeProfileFromLocalStorage = () => {
  localStorage?.removeItem("profile");
};
export const getProfileFromLocalStorage = () => {
  const Token = localStorage?.getItem("profile") || "";
  return Token;
};

export const getTokenFromLocalStorage = () => {
  const Token = localStorage?.getItem("Token") || "";
  return Token;
};
