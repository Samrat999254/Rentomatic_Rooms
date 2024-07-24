/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNotifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

import { resetpassword } from "../helper/ApiHelper";
import "./resetpassword.css";
import { persistSession } from "../helper/session";

function ResetPassword() {
  const [hidepassword, setHidepassword] = React.useState({
    password: "",
    showPassword: false,
  });
  let navigate = useNavigate();
  let params = useParams();

  const notifications = useNotifications();

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    err: "",
    didRedirect: false,
    loading: false,
  });
  const { showPassword } = hidepassword;

  const { confirmPassword, password, err, didRedirect, loading } = values;
  // const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, err: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, err: false, loading: true });
    resetpassword({ password, confirmPassword }, params.token)
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, err: data.err, loading: false });
          notifications.showNotification({
            color: "red",
            title: "Error",
            message: data.message,
          });
        } else {
          setValues({ ...values, loading: false });

          notifications.showNotification({
            color: "green",
            title: "Success",
            message: "Successfully reset password",
          });
        }
      })
      .catch((e) => {
        console.log("Signin request failed!");
        notifications.showNotification({
          color: "red",
          title: "Error",
          message: "failed to register",
        });
      });
  };

  return (
    <>
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="login-container">
          <div id="form">
            <div className="form-title">
              {" "}
              <h2>Change Password</h2>
              <i className="x fa-solid fa-x"></i>
            </div>
            <label for="password">Password</label>
            <br />
            <input
              type="password"
              className="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange("password")}
            />
            <br />
            <br />
            <label for="confirmPassword">Confirm Password</label>
            <br />
            <div className="password-div">
              <input
                type={hidepassword.showPassword ? "text" : "password"}
                className="password"
                id="password"
                value={confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
            </div>

            <button class="loginbtn" onClick={onSubmit}>
              {loading ? <Loader /> : "Reset Password"}
            </button>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
