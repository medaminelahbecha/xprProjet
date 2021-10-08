import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils";

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(isLogin())
    return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page

    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect exact to="/login" />
      }
    />
  );
};
export default PrivateRoute;
                {/* <Dropzone
                  import Dropzone from 'react-dropzone'
        onDrop={changeHandler}
        accept="image/*"
        minSize={1024}
        maxSize={3072000}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Glisser-déposer des factures ici </p>
          </div>
        )}
      </Dropzone> */}
      