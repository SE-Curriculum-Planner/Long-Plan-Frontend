import React, { useContext } from "react";

import { AuthKey } from "common/constants/keys";
import { StoreContext } from "common/contexts/StoreContext";
import Unauth from "common/components/middleware/Unauth";
import { useLoadingContext } from "react-router-loading";

function withAuth(authType: AuthKey) {
  return <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return function WithAuthComponent(props: P) {
      const loadingContext = useLoadingContext();
      const [{ userData }] = useContext(StoreContext);

      if (authType === AuthKey.UserAuth && userData) {
        return <WrappedComponent {...props} />;
      }
      loadingContext.done();
      return <Unauth />;
    };
  };
}

export default withAuth;
