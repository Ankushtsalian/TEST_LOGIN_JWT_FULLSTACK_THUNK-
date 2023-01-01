import { useSelector } from "react-redux";

import UnAuthorize from "./UnAuthorize";

const Protected = ({ children }) => {
  const { errorStatusCode: userError } = useSelector((state) => state.user);
  const { errorStatusCode: profileError } = useSelector(
    (state) => state.profile
  );
  const { errorStatusCode: productError } = useSelector(
    (state) => state.product
  );

  if (userError === 401 || profileError === 401 || productError === 401)
    return <UnAuthorize />;

  return <div className="container">{children}</div>;
};

export default Protected;
