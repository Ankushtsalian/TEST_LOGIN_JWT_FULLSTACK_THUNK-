export const addTokenToLocalStorage = (Token) => {
  localStorage.setItem("Token", Token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage?.removeItem("Token");
  localStorage?.removeItem("profile");
};
// export const removeProfileFromLocalStorage = () => {

export const getTokenFromLocalStorage = () => {
  const Token = localStorage?.getItem("Token") || "";
  //   const user = result ? JSON.parse(result) : null;
  return Token;
};
