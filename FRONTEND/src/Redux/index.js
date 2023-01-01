import {
  handleFormInput,
  clearUserFormInput,
  clearToken,
  registerUser,
  loginUser,
} from "./User-store/User-Slice";
import {
  ClearAllState,
  handleProfileInputState,
  profileImage,
  profileName,
} from "./Profile-Store/Profile-Slice";
import {
  ClearAllProductState,
  ClearAllProfileInputState,
  getAllProducts,
  handleFormInputProduct,
  productFile,
  productFormData,
  handleSidebarMenu,
} from "./Product-store/Product-Slice";

export {
  handleFormInput,
  clearUserFormInput,
  clearToken,
  registerUser,
  ClearAllState,
  ClearAllProductState,
  loginUser,
  ClearAllProfileInputState,
  getAllProducts,
  handleFormInputProduct,
  productFile,
  productFormData,
  handleProfileInputState,
  profileImage,
  profileName,
  handleSidebarMenu,
};
