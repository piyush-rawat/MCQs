import React, { lazy } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = lazy(() => import("../pages/Login"));

const PrivateComponent = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Login />
      }
    />
  );
};

export default PrivateComponent;
