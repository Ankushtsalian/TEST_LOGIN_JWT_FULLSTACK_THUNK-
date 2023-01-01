export const addTokenToLocalStorage = (Token) => {
  localStorage.setItem("Token", JSON.stringify(Token));
};
export const addProfileToLocalStorage = (src) => {
  localStorage.setItem("profile", JSON.stringify(src));
};

export const removeTokenFromLocalStorage = () => {
  localStorage?.removeItem("Token");
  localStorage?.removeItem("profile");
};
export const removeProfileFromLocalStorage = () => {
  localStorage?.removeItem("profile");
};
export const getProfileFromLocalStorage = () => {
  const Token = JSON.parse(localStorage?.getItem("profile")) || "";
  return Token;
};

export const getTokenFromLocalStorage = () => {
  const Token = JSON.parse(localStorage?.getItem("Token")) || "";
  return Token;
};
