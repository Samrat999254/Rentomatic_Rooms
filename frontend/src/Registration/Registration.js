import React from "react";
import { Link } from "react-router-dom";
import "./registration.css";

function Registration() {
  return (
    <div className="registration-form-container">
      <div className="registration-container">
        <div id="form">
        <img src="logo99.png" alt="logo" className="logocs" />
          <div className="form-title">
        
            {" "}
            <h1
              style={{
                fontSize: "1.5rem",
                marginTop: "1rem",
               marginLeft: "2.5 rem",
                paddingLeft: "4.8rem",
               
                
              }}
            >
              Register Now
            </h1>
            {/* <i className="x  fa-solid fa-x"></i> */}
          </div>
          <Link to={"/createOwnerAccount"}>
            <button className="btn">Registration as Owner</button>
          </Link>

          <br />
          <i
            className="info fa fa-circle-info"
            style={{ paddingRight: ".5rem" }}
          />
          <span>You can add room</span>
          <br />

          <Link to={"/createTenantAccount"}>
            <button className="btn">Registration as Tenant</button>
          </Link>

          <br />
          <i
            className="info fa fa-circle-info"
            style={{ paddingRight: ".5rem" }}
          />
          <span>You can find room</span>

          <p>
            Already have an account? <Link className="text-underline" to={`/login`}>Login Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registration;
