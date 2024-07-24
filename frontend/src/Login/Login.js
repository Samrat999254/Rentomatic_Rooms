/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import { useNotifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { signin } from "../helper/ApiHelper";
import "./login.css";
import { persistSession, getSession } from "../helper/session";

function Login() {
  const [hidepassword, setHidepassword] = React.useState({
    password: "",
    showPassword: false,
  });
  let navigate = useNavigate();
  const notifications = useNotifications();
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  function onChange(value) {
    console.log("Captcha value:", value);
    setRecaptchaValue(value)

  }

  const [values, setValues] = useState({
    email: "",
    password: "",
    err: "",
    didRedirect: false,
    loading: false,
  });
  const { showPassword } = hidepassword;

  const { email, password, err, didRedirect, loading } = values;
  // const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, err: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!recaptchaValue) {
      notifications.showNotification({
        color: "red",
        title: "Error",
        message: "Please complete the reCAPTCHA verification.",
      });
      return;
    }    
    setValues({ ...values, err: false, loading: true });
    signin({ email, password })
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setValues({ ...values, err: data.err, loading: false });
          notifications.showNotification({
            color: "red",
            title: "Error",
            message: "Failed to login",
          });
        } else {
          persistSession(data.data);
          notifications.showNotification({
            color: "green",
            title: "Success",
            message: "Successfully login",
          });
          // window.location.reload();

          if (JSON.parse(getSession()).role === "admin") {
            setTimeout(() => {
              navigate("/admin/rooms");
              window.location.reload();
            }, 1000);
          } else {
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 1000);
          }


        }
      })
      .catch((e) => {
        console.log("Signin request failed!");
        notifications.showNotification({
          color: "red",
          title: "Error",
          message: "Failed to Login",
        });
      });
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="login-container">
          <div id="form">
            <img src="logo99.png" alt="logo" className="logocss1" />
            <div className="form-title1">

              {" "}
              <h1
                style={{
                  fontSize: "1.5rem",
                  marginLeft: "7rem",
                  marginTop: "3.5rem",
                  marginBottom: "2rem",
                }}
              >
                Log In
              </h1>
              {/* <i className="x fa-solid fa-x"></i> */}
            </div>

            <label for="email">Email</label>
            <br />
            <input
              type="email"
              className="email"
              // placeholder="Samrat@gamil.com"
              name="email"
              id="email"
              value={email}
              onChange={handleChange("email")}
            />
            <br className="br" />

            <div className="hlo">
              <label for="password" >Password</label>
            </div>

            <div className="password-div">

              <input
                type={hidepassword.showPassword ? "text" : "password"}
                className="password"
                // placeholder="********"
                id="password"
                value={password}
                onChange={handleChange("password")}
              />
              <i
                onClick={() =>
                  setHidepassword({
                    ...hidepassword,
                    showPassword: !showPassword,
                  })
                }
                class="eye fa-solid fa-eye-slash"
              ></i>

            </div>
            <div className="linkk">
              <a href="/forget">Reset Password?</a>
            </div>
            <br />

            <ReCAPTCHA
              sitekey="6LeLC34fAAAAALwYaqseHZhN9VyclngMgBXDy0F_"
              onChange={onChange}
            />

            <button className="loginbtn" onClick={onSubmit}>
              {loading ? <Loader /> : "Log In"}
            </button>
            <br />

            <div className="registerNow">
              Don't have an account?<Link to={`/register`}>Register Now</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
