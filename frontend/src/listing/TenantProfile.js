/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "@mantine/core";

import { getTenantById } from "../helper/ApiHelper";
import ImageHelper from "../helper/ImageHelper";
import "./Listing.css";
import ProfileHelper from "../helper/ProfileHelper";

// ... (import statements)

const TenantProfile = () => {
  let { id } = useParams();

  const [opened, setOpened] = useState(false);
  const [values, setValues] = useState({});

  const preloadProduct = async () => {
    await getTenantById(id).then((data) => {
      console.log(data);
      if (data.err) {
        setValues({ ...values, err: data.err });
      } else {
        setValues(data);
      }
    });
  };

  console.log(values);

  useEffect(() => {
    preloadProduct();
  }, []);

  // Retrieve the authentication token
  // Retrieve the authentication token
// Retrieve the authentication token
const authTokenString = localStorage.getItem('authentication-token-user');
let authToken;

// Check if the token exists
if (authTokenString) {
  authToken = JSON.parse(authTokenString); // Parse the string into an object
  console.log('Authentication Token:', authToken);

  // Check if the role property exists before logging
  if (authToken.role) {
    console.log('Authentication Token Role:', authToken.role);
  } else {
    console.log('Role property not found in Authentication Token');
  }
} else {
  console.log('Authentication Token not found in localStorage');
}



  return (
    <div className="container mt-5">
      <div className="listing-container">
        <div className="listing-container-image">
          <ProfileHelper productId={values._id} />
        </div>
        <div className="listing-container-content">
          <div className="content-title">
            <h2
              style={{
                marginLeft: "-3rem",
                marginTop: ".07rem",
                fontSize: "25px",
              }}
            >
              {values.tenant?.profileDescription?.bio || "wait . . . "}
            </h2>
            <h4
              style={{
                marginLeft: "-3rem",
                marginTop: "-1rem",
                marginBottom: "1rem",
              }}
            >
              {values.tenant?.preferredRooms ? `Max rent: Rs. ${values.tenant.preferredRooms.rentPerMonth} per month` : "wait . . . "}
            </h4>
            <hr
              style={{
                marginLeft: "-3rem",
                marginBottom: "1.5rem",
              }}
            />
            <div className="content-description">
              <div className="content-description-type">
                <ul>
                  <li>Area:</li>
                  <li>Rental Period:</li>
                  <li>Available Within:</li>
                  <li>Gender:</li>
                  <li>Occupation:</li>
                  <li>Internet:</li>
                  <li>Pets Allowed:</li>
                  <li>Parking:</li>
                  <li>Attached Bathroom:</li>
                </ul>
              </div>
              <div className="content-description-content">
                <ul>
                  <li>
                    {values.tenant?.preferredRooms?.roomLocation || "wait . . . "}
                  </li>
                  <li>
                    {values.tenant?.preferredRooms?.rentDuration || "wait . . . "}
                  </li>
                  <li>
                    {values.tenant?.preferredRooms?.availableWithin ? new Date(values.tenant.preferredRooms.availableWithin).toLocaleDateString() : "wait . . . "}
                  </li>
                  <li>
                    {values.tenant?.iam || "wait . . . "}
                  </li>
                  <li>
                    {values.tenant?.occupation || "wait . . . "}
                  </li>
                  {values.tenant?.facilities?.map((data) => (
                    <li key={data}>{data ? "Yes" : "No"}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input">
      <Modal
  opened={opened}
  onClose={() => setOpened(false)}
  title="Tenant Contact Details"
>
  {authToken && authToken.role ? (
    <>
      <h3>Name: {values.fullName}</h3>
      <h6>Email: {values.email}</h6>
      <h6>Phone: {values.phoneNumber}</h6>
    </>
  ) : (
    <p>User must be logged in to view contact details. </p>
  )}
</Modal>



        <button onClick={() => setOpened(true)}>
          View Tenant Contact Info
        </button>
      </div>
    </div>
  );
};

export default TenantProfile;

