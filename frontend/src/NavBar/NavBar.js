import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { deleteSession, hasToken, getSession } from "../helper/session";

console.log("...", hasToken());
function NavBar() {
  const [screenSize, setScreenSize] = useState("notMobile");

  function handleLogout() {
    deleteSession();
    window.location.href = "/";
  }
  const tenant = getSession();
  // console.log(hasToken());
  return (
    <>
      <nav >

        <Link to={`/`}>
          <img
            src={Logo}
            alt="navbar"
            style={{ height: "70px", width: "180px", marginLeft: "3rem" }}
          />
        </Link>

        <div
          className="hamburger"
          onClick={() =>
            screenSize === "mobile"
              ? setScreenSize("notMobile")
              : setScreenSize("mobile")
          }
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <ul className={screenSize}>
          <li className="nav-item">
            <Link to={`/`}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to={`/findTenant`}>Tenant</Link>
          </li>
          <li className="nav-item">
            <Link to={`/findRoom`}>Room</Link>
          </li>
          {hasToken() ? (
            <>
              {JSON.parse(tenant).role === "tenant" || JSON.parse(tenant).role === "owner" ? (
                <li className="nav-item">
                  <Link to={`/profile`}>Profile</Link>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item">
                <Link onClick={handleLogout} to={`/register`}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to={`/login`}>Login</Link>
              </li>
              <li className="nav-item">
                <Link to={`/register`}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
