import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import Logo from "../assets/Logo.png";

function Footer() {
  return (
    <>
      {/* <hr className="foot-line"></hr> */}
      <footer class="footer">
        <ul class="footer-right">
          <div>
            {/* <h1>lOGO</h1> */}
            <img src={Logo} alt="logo" style={{ height: "70px", width: "180px", }} />
            <p class="paragraph" style={{ marginTop: "1rem" }}>
              Rentomatic Rooms aims to solve the major problem of finding better
              room inside the Kathmandu valley. It focus on providing easy and
              free room rental services to the people. This application might be
              an alternative to traditional door-to-door room rental practices.
            </p>
          </div>
          <li>
            <h2>LINKS</h2>

            <ul class="box">
              <li>
                <Link to={"/findroom"}>ROOMS</Link>
              </li>
              <li>
                <Link to={"/findtenant"}>TENANT</Link>
              </li>
              <li>
                { <a href="/#features">FEATURES</a>}
              </li>
            </ul>
          </li>
          <li class="info">
            <h2>INFO</h2>
            <ul class="box">
              <li>
                <Link to={"/faq"}>FAQ's </Link>
              </li>
              <li>
                <Link to={"/privacy"}>PRIVACY POLICY </Link>
              </li>
            </ul>
          </li>
          <li>
            <h2 class="text-left ms-0">CONTACT US</h2>
            <ul class="box info">
              <li>Imadol, Lalitpur, Nepal</li>
              <li>01-5200033|+977 9818635469</li>
              <li>info@rentomaticrooms.com</li>
            </ul>
          </li>
        </ul>

        {/* <hr className="foot-line" /> */}
        <div className="footerlast">
          <p style={{ textAlign: "center", padding: "1rem" }}>
          &copy; RentomaticRoom2024  All Right Reserved
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
