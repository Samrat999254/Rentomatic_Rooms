/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Modal } from "@mantine/core";
import { getRoomById } from "../helper/ApiHelper";
import ImageHelper from "../helper/ImageHelper";
import "./Listing.css";

const Listing = () => {
  let { id } = useParams();
  const [state, setState] = useState({ lng: "", lat: "" });
  const [values, setValues] = useState({});
  const [opened, setOpened] = useState(false);
  const { lat, lng } = state;

  const preloadProduct = async (next) => {
    await getRoomById(id).then((data) => {
      console.log(data);
      if (data.err) {
        setValues({ ...values, err: data.err });
      } else {
        setValues(data);
      }
    });
  };
  useEffect(() => {
    preloadProduct();
  }, []);

  useEffect(() => {
    if (values.roomAddress !== undefined) {
      setState({
        ...state,
        lat: JSON.parse(values.roomAddress.area).lat,
        lng: JSON.parse(values.roomAddress.area).lan,
      });
    }
  }, [values]);
  console.log(values);


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



  // console.log(JSON.parse(values.roomAddress.area));
  return (
    <div className="bg-darks">
    <div className="container">
      <div className="listing-container">
        <div className="listing-container-image">
          <ImageHelper productId={id} />
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
              {values.roomAddress !== undefined ? values.title : "wait . . . "}
            </h2>

            <h4
              style={{
                marginLeft: "-3rem",
                marginTop: "-1rem",
                marginBottom: "1rem",
              }}
            >
              {values.roomAddress !== undefined
                ? values.roomAddress.district
                : "wait . . . "}
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
                  <li>Tenant Preference:</li>
                  <li>Rent Per Months:</li>
                  <li>Room Type:</li>
                  <li>Internet:</li>
                  <li>Pets Allowed:</li>
                  <li>Parking:</li>
                  <li>Attached Bathroom:</li>
                </ul>
              </div>
              <div className="content-description-content">
                <ul>
                  <li>
                    {values.roomAddress !== undefined
                      ? JSON.parse(values.roomAddress.area).name
                      : "wait . . . "}
                  </li>
                  <li>
                    {values.roomAddress !== undefined
                      ? values.roomDetails.rentDuration
                      : "wait . . . "}
                  </li>
                  <li>
                    {values.roomAddress !== undefined
                      ? values.tenantPreference
                      : "wait . . . "}
                  </li>
                  <li>
                    {values.roomAddress !== undefined
                      ? values.roomDetails.rentPerMonth
                      : "wait . . . "}
                  </li>
                  <li>
                    {values.roomAddress !== undefined
                      ? values.roomDetails.roomType
                      : "wait . . . "}
                  </li>
                  {values._id !== undefined
                    ? values.facilities.map((data) => {
                        return (
                          <>{data === true ? <li>Yes</li> : <li>No</li>}</>
                        );
                      })
                    : null}
                </ul>
              </div>
            </div>

            <MapContainer
              style={{ height: 220, width: 410, marginLeft: "-3rem", zIndex: 0}}
              dragging={false}
              doubleClickZoom={false}
              scrollWheelZoom={false}
              center={[27.7172, 85.324]}
              zoom={13}

              // center={[
              //   JSON.parse(values.roomAddress.area).lat,
              //   JSON.parse(values.roomAddress.area).lng,
              // ]}
              // center={[lat, lng]}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, lng]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>

            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="input">
        {/* <div>
          <i class="fa-2x fa-solid fa-envelope"></i>
          <input type="text"></input>
        </div> */}
           <Modal
  opened={opened}
  onClose={() => setOpened(false)}
  title="Owner Contact Details"
>
  {authToken && authToken.role ? (
    <>
      <h3>Name: {values.name}</h3>
      <h6>Email: {values.owneremail}</h6>
      <h6>Phone: {values.ownerPhoneNumber}</h6>
    </>
  ) : (
    <p>User must be logged in to view contact details. </p>
  )}
</Modal>




        <button onClick={() => setOpened(true)}>View Owner Contact Info</button>
      </div>
    </div>
    </div>
  );
};

export default Listing;
