import {
  handleFormInput,
  clearUserFormInput,
  clearUserToken,
  registerUser,
  loginUser,
} from "./User-store/User-Slice";
import {
  ClearAllProfileState,
  handleProfileInputState,
  profileImage,
  profileName,
} from "./Profile-Store/Profile-Slice";
import {
  ClearAllProductState,
  ClearAllProductInputState,
  getAllProducts,
  handleFormInputProduct,
  productFile,
  productFormData,
  handleSidebarMenu,
} from "./Product-store/Product-Slice";

export {
  handleFormInput,
  clearUserFormInput,
  clearUserToken,
  registerUser,
  ClearAllProfileState,
  ClearAllProductState,
  loginUser,
  ClearAllProductInputState,
  getAllProducts,
  handleFormInputProduct,
  productFile,
  productFormData,
  handleProfileInputState,
  profileImage,
  profileName,
  handleSidebarMenu,
};
