/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { getProfile } from "../helper/ApiHelper";
import { getAllCartItems, removeItemFromCart } from "../helper/CartHelper";
// import { getRoomByOwner } from "../helper/RoomHelper.js";
import ImageHelper from "../helper/ImageHelper";
import ProfileHelper from "../helper/ProfileHelper";
import { getSession } from "../helper/session";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, isEmptyArray } from "formik";
import { updateR } from "../helper/ApiHelper";

import { useNotifications } from "@mantine/notifications";

import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";

import "./Profile.css";

let tenant = getSession();

const Profile = () => {
  const notifications = useNotifications();

  const [products, setProducts] = useState([]);

  const [rooms, setRooms] = useState([{}]);
  const [profile, setProfile] = useState();
  const [reload, setReload] = useState(true);
  const isMounted = useRef(false);

  const [activebtn, setActivebtn] = useState({
    captcha: false,
    accept: false,
  });
  const [state, setState] = useState({
    loading: false,
    err: "",
    getRedirect: "",
  });
  const [checkedState, setCheckedState] = useState(new Array(4).fill(false));

  const facilities = [
    "Internet",
    "Pets Allowed",
    "Parking",
    "Attached Bathroom",
  ];

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  // const notifications = useNotifications();
  const { captcha, accept } = activebtn;

  function onChange(value) {
    if (value === "accept") {
      setActivebtn({ ...activebtn, accept: true });
    } else {
      setActivebtn({ ...activebtn, captcha: true });
    }
  }

  const { loading, err } = state;

  const RegisterValidationSchema = Yup.object().shape({});

  function handleFormSubmit(values, { resetForm }) {
    setState({ loading: true });
    values.owner.facilities = checkedState;

    let formData = new FormData();
    for (let value in values) {
      if (value === "owner") {
        formData.append(value, JSON.stringify(values[value]));

        // console.log(JSON.stringify(values[value]));
      } else {
        formData.append(value, values[value]);
      }
    }
    console.log(values, checkedState);

    updateR(formData)
      .then((data) => {
        console.log(data);
        setState({ loading: false });
        if (data.error) {
          notifications.showNotification({
            color: "red",
            title: "Error",
            message: "Failed to post room",
          });
        } else {
          notifications.showNotification({
            color: "green",
            title: "Success",
            message: "Successfully posted room",
          });
          // resetForm();
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
    // props.handleJobRequestAction(formData,user._id)
  }

  const area = [
    { name: "Tengal", lat: 27.71023679894223, lan: 85.30579194672158 },

    { name: "Naghal", lat: 27.710198805528908, lan: 85.30918225857671 },

    { name: "Jyatha", lat: 27.711832510352643, lan: 85.3121863323724 },

    { name: "Jamal", lat: 27.709514921826212, lan: 85.31514749082815 },

    { name: "Kamaladi", lat: 27.709400940792275, lan: 85.31956777084181 },

    { name: "Kalikasthan", lat: 27.704005702295955, lan: 85.32536134173348 },

    { name: "Bhadrakali", lat: 27.697128286193333, lan: 85.31716451180526 },

    { name: "Tripureshowr", lat: 27.695266369718787, lan: 85.31523332150803 },

    { name: "Kupondole", lat: 27.686696674237105, lan: 85.31463365006898 },

    { name: "Thapathali", lat: 27.689679290708103, lan: 85.32300342739498 },

    { name: "Buddhanagar", lat: 27.686877441191, lan: 85.32994421834823 },

    { name: "Gairigaon", lat: 27.688142801488954, lan: 85.34882725255929 },

    { name: "Baneshwor", lat: 27.691803225494645, lan: 85.34173335592325 },

    { name: "Koteshwor", lat: 27.675985697874747, lan: 85.34622445727618 },

    { name: "Balkumari", lat: 27.669929238134397, lan: 85.34061058224046 },

    { name: "Gwarko", lat: 27.666629682011138, lan: 85.33270012133903 },

    { name: "Kusinti", lat: 27.6556907155722, lan: 85.31631781290697 },

    { name: "Ekantakuna", lat: 27.66757887941739, lan: 85.31044876165144 },

    { name: "Kalanki", lat: 27.693655985802092, lan: 85.28028693890967 },

    { name: "Jadibutti", lat: 27.675220340943337, lan: 85.35349376695548 },

    { name: "Lokanthali", lat: 27.673728845448956, lan: 85.35910764199119 },

    { name: "Narephate", lat: 27.672282527342304, lan: 85.34987026579606 },

    { name: "Kaushaltar", lat: 27.675627108907886, lan: 85.36518083407529 },

    { name: "Sagbari", lat: 27.673819239694918, lan: 85.36768156022757 },

    { name: "Gatthaghar", lat: 27.676892599590417, lan: 85.37293818970305 },

    { name: "Thimi", lat: 27.678474442278116, lan: 85.38038933367886 },

    { name: "Sallaghari", lat: 27.671785350954636, lan: 85.40751455954009 },

    { name: "Katunje", lat: 27.66437263645023, lan: 85.40930079250602 },

    { name: "Balkot", lat: 27.663739820252644, lan: 85.37776102223424 },

    { name: "Bhaktapur", lat: 27.671016983049867, lan: 85.42951074577422 },

    { name: "Boudha", lat: 27.720172, lan: 85.358011 },

    { name: "Patan", lat: 27.669943, lan: 85.320404 },

    { name: "Pepsicola", lat: 27.68891, lan: 85.360321 },

    { name: "Kritipur", lat: 27.663, lan: 85.2774 },
  ];

  const handleInputChange = (field, value) => {
    setProfile((prevProfile) => {
      const newProfile = [...prevProfile];
      newProfile[0][field] = value;
      return newProfile;
    });
  };

  const handleUpdate = () => {
    //check profile phone number is valid np number or not
    // if (profile[0].phoneNumber.length !== 10) {
    //   //nepal number too

    //   alert("Phone number should be 10 digit");
    //   return;
    // }

    const dataToUpdate = {
      fullName: profile[0].fullName,
      address: profile[0].address,
      email: profile[0].email,
      password: profile[0].password,
    };

    // Send a request to the server to update the profile
    fetch(`http://localhost:5000/api/v1/users/update/${profile[0]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.error) {
          notifications.showNotification({
            color: "red",
            title: "Error",
            message: data.message,
          });
        } else {
          notifications.showNotification({
            color: "green",
            title: "Success",
            message: "Profile updated successfully",
          });
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loadAllCartProducts = () => {
    setProducts(getAllCartItems());
  };

  const reloadPage = () => {
    setReload(!reload);
  };

  function checkrole(params) {
    if (JSON.parse(tenant).role === "tenant") {
      return "tenant";
    } else if (JSON.parse(tenant).role === "owner") {
      return "owner";
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function dateconvert(string) {
    return new Date(string).toLocaleDateString();
  }
  function getage(string) {
    return new Date().getFullYear() - new Date(string).getFullYear();
  }

  function deleteroom(params) {
    fetch(`http://localhost:5000/api/v1/users/deleteroom/${params}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.error) {
          notifications.showNotification({
            color: "red",
            title: "Error",
            message: data.message,
          });
        } else {
          notifications.showNotification({
            color: "green",
            title: "Success",
            message: "Room deleted successfully",
          });
        }
        // refresh the page location reload

        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    loadAllCartProducts();
  }, [reload]);

  useEffect(() => {
    isMounted.current = true;
    getProfile(JSON.parse(tenant).id)
      .then((data) => {
        console.log(data);
        if (isMounted.current) {
          setProfile(data);
          setRooms(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isMounted.current = false;
    };
  }, []);

  // console.log(profile ? profile[0].fullName : "wait . . . ");
  return (
    <>
      <div style={{ width: "100%", background: "#F8FAF6", minHeight: "100vh" }}>
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "20%", margin: "60px 0px 30px 60px" }}>
            <Card shadow="md" p="lg" className="card11">
              <Card.Section>
                {profile && profile.length > 0 ? (
                  <ProfileHelper
                    className="rounded-t-lg object-fit image11"
                    productId={profile[0]._id}
                  />
                ) : // : <ImageHelper productId={profile[0]._id} className="rounded-t-lg object-fit" />
                null}
              </Card.Section>

              <Group position="apart" style={{ marginTop: "1rem" }}>
                <Text weight={500}>
                  {profile !== undefined
                    ? capitalizeFirstLetter(profile[0].fullName)
                    : ""}{" "}
                </Text>
                <Badge color="teal" variant="light">
                  {profile !== undefined ? profile[0].gender : ""}
                </Badge>
              </Group>

              {JSON.parse(tenant).role === "tenant" && (
                <Text size="sm" style={{ color: "", marginTop: "2px" }}>
                  {profile !== undefined && profile.length > 0
                    ? profile[0].tenant.profileDescription.bio
                    : ""}
                </Text>
              )}
            </Card>
          </div>

          <div style={{ width: "70%", margin: "60px 0px 30px 30px" }}>
            <Card shadow="sm" p="lg" style={{ padding: "65px" }}>
              <Card.Section>
                {/* <Image src="./image.png" height={160} alt="Norway" /> */}
              </Card.Section>

              <Group position="apart" style={{ marginBottom: 2 }}>
                <Text
                  weight={500}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M24.7555 25.4669C25.3451 25.344 25.6962 24.728 25.4164 24.1946C24.6659 22.7639 23.438 21.5068 21.8485 20.5582C19.8838 19.3856 17.4765 18.75 15 18.75C12.5235 18.75 10.1162 19.3856 8.1514 20.5582C6.56196 21.5068 5.33401 22.7639 4.58353 24.1946C4.30375 24.728 4.65483 25.344 5.24444 25.4669L6.8391 25.7992C12.2218 26.921 17.7781 26.921 23.1608 25.7992L24.7555 25.4669Z"
                      fill="black"
                    />
                    <circle cx="15" cy="10" r="6.25" fill="black" />
                  </svg>

                  <h4 class="text-3xl ml-2" style={{ color: "#183639" }}>
                    About me
                  </h4>
                </Text>
                <Badge color="teal" variant="light">
                  Verified User
                </Badge>
              </Group>

              <div class="row">
                <div class="col-6" id="data">
                  <div class="flex w-full ">
                    <label for="fullName">Full Name:</label>
                    <input
                      className="full"
                      type="text"
                      value={
                        profile !== undefined
                          ? capitalizeFirstLetter(profile[0].fullName)
                          : ""
                      }
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      style={{ lineHeight: 2.5 }}
                    />
                  </div>
                  {/* <br />
                  <div class="flex w-full">
                    <label for="dateOfBirth">Date of Birth:</label>
                    <input
                      type="text"
                      disabled
                      value={profile !== undefined ? dateconvert(profile[0].dateOfBirth) : ""}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      style={{ lineHeight: 2.5 }}
                    />
                  </div> */}
                  <br />
                  {/*  */}
                  {/* <br /> */}
                  <div class="flex w-full">
                    <label for="address">Address:</label>
                    <input
                      className="full"
                      type="text"
                      value={
                        profile !== undefined
                          ? capitalizeFirstLetter(profile[0].address)
                          : ""
                      }
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      style={{ lineHeight: 2.5 }}
                    />
                  </div>
                </div>
                <div class="col-6">
                  {/* <div class="flex w-full">
                    <label for="phoneNumber">Phone No:</label>
                    <input disabled
                      type="text"
                      value={profile !== undefined ? profile[0].phoneNumber : ""}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      style={{ lineHeight: 2.5 }}
                    />
                  </div>
                  <br /> */}
                  <div class=" ">
                    <label className="gap" for="email">
                      Email:
                    </label>
                    <input
                      className="full"
                      // aria-label="disabled"

                      type="text"
                      // disabled
                      value={profile !== undefined ? profile[0].email : ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      style={{ lineHeight: 2.5 }}
                    />
                  </div>
                  {/* <br /> */}
                  {/* {JSON.parse(tenant).role === "tenant" && (
                    // <div class="flex w-full">
                    //   <label for="occupation">Occupation:</label>
                    //   <input
                    //     type="text"
                    //     value={profile !== undefined ? capitalizeFirstLetter(profile[0].tenant.occupation) : ""}
                    //     onChange={(e) => handleInputChange('tenant.occupation', e.target.value)}
                    //     style={{ lineHeight: 2.5 }}
                    //   />
                    // </div>
                  )} */}
                  {/* <br /> */}

                  {/* 
                  <div class="flex w-full">
                    <label for="age">Age:</label>
                    <input
                      type="text"
                      value={profile !== undefined ? getage(profile[0].dateOfBirth) : ""}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      style={{ lineHeight: 1.5 }}
                    />
                  </div>
                  */}
                </div>
              </div>
              <button
                class="registration-containedddr"
                style={{ marginLeft: "5px" }}
                onClick={handleUpdate}
              >
                Update
              </button>
            </Card>
          </div>
        </div>

        <div style={{ width: "100%", margin: "0px 60px" }}>
          {JSON.parse(tenant).role === "tenant" ? (
            <h1 style={{ margin: "10px 0" }}>Bookmarked Rooms</h1>
          ) : JSON.parse(tenant).role === "owner" ? (
            <h1 style={{ margin: "10px 0" }}>Your Rooms</h1>
          ) : (
            <h1 style={{ margin: "10px 0" }}>Booked Rooms</h1>
          )}
          <div style={{ display: "flex", gap: "1rem" }}>
            {JSON.parse(tenant).role === "tenant" ? (
              (products || []).map((room) => {
                // console.log(room);
                return (
                  <>
                    <div
                      style={{ margin: "20px 0" }}
                      className="max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                    >
                      <ImageHelper
                        productId={room._id}
                        className="rounded-t-lg object-fit"
                      />
                      <div className="p-5">
                        <h6 className="mb-2 text-1xl font-medium tracking-tight text-gray-900 dark:text-white">
                          {room.owner !== undefined
                            ? room.owner.description
                            : "wait . . . "}
                        </h6>
                        <h6 className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                          {room.owner &&
                          room.owner.roomAddress &&
                          room.owner.roomAddress.district !== ""
                            ? room.owner.roomAddress.district
                            : "wait . . . "}{" "}
                        </h6>
                        <h6 className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                          Rs.{" "}
                          {room.owner !== undefined
                            ? room.owner.roomDetails.rentPerMonth
                            : "wait . . . "}{" "}
                          per month
                        </h6>
                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          onClick={() => {
                            removeItemFromCart(room._id);
                            reloadPage();
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            ) : JSON.parse(tenant).role === "owner" ? (
              <>
                {rooms ? (
                  rooms.map((room) => {
                    if (
                      room &&
                      room.owner &&
                      room.owner.hasOwnProperty("images")
                    ) {
                      console.log("owner object has images property");
                      return (
                        <>
                          <div
                            style={{ margin: "20px 0" }}
                            className="max-w-xs bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                          >
                            <ImageHelper
                              productId={room._id}
                              className="rounded-t-lg object-fit"
                            />
                            <div className="p-5">
                              <h6 className="mb-2 text-1xl font-medium tracking-tight text-gray-900 dark:text-white">
                                {room.owner !== undefined
                                  ? room.owner.description
                                  : "wait . . . "}
                              </h6>
                              <h6 className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                                {room.owner &&
                                room.owner.roomAddress &&
                                room.owner.roomAddress.district !== ""
                                  ? room.owner.roomAddress.district
                                  : "wait . . . "}{" "}
                              </h6>
                              <h6 className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                                Rs.{" "}
                                {room.owner && room.owner.roomDetails
                                  ? room.owner.roomDetails.rentPerMonth
                                  : "wait . . . "}{" "}
                                per month
                              </h6>
                              <button
                                type="button"
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                onClick={() => {
                                  deleteroom(room.owner._id);
                                  reloadPage();
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    } else {
                      console.log("owner object does not have images property");
                      return (
                        <div className="owner-account">
                          <Formik
                            enableReinitialize
                            initialValues={{
                              images: null,
                              role: "owner",
                              owner: {
                                id: profile !== undefined ? profile[0]._id : "",
                                email:
                                  profile !== undefined ? profile[0].email : "",
                                roomDetails: {
                                  roomType: "",
                                  rentPerMonth: "",
                                  rentDuration: "",
                                },
                                workPreference: "",
                                tenantPreference: "",
                                roomAddress: {
                                  district: "",
                                  area: {},
                                },
                                title: "",
                                name:
                                  profile !== undefined
                                    ? profile[0].fullName
                                    : "",
                                owneremail:
                                  profile !== undefined ? profile[0].email : "",
                                description: "",
                                facilities: [],
                              },
                            }}
                            onSubmit={handleFormSubmit}
                            // validationSchema={RegisterValidationSchema}
                          >
                            {(renderProps) => {
                              const {
                                values: formValues,
                                touched,
                                errors,
                                setFieldValue,
                              } = renderProps;
                              return (
                                <>
                                <div>
                                  
                                </div>
                                  <div className="header">  Add your Rooms</div>
                                  <Form encType="multipart-formdata"  >
                                  <div id="ui">
                                    <div className="room-details">
                                      <div className="room-details-title">
                                        <span>Room Details:</span>
                                        {/* <hr className="seperater right"></hr> */}
                                      </div>




                                      <div className="room-details-content" >
                                        <div className="room-details-content__wrapper">
                                          <label for="room-types">
                                            Room types:
                                          </label>{" "}
                                          <select
                                            className="xyz form_filed"
                                            required
                                            value={
                                              formValues.owner.roomDetails
                                                .roomType
                                            }
                                            onChange={(e) =>
                                              renderProps.setFieldValue(
                                                "owner.roomDetails.roomType",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option>Select</option>

                                            <option value="Single">
                                              Single
                                            </option>
                                            <option value="Double">
                                              Double
                                            </option>
                                          </select>
                                        </div>

                                        <div className="room-details-content__wrapper">
                                          <label for="available">
                                            Available From:
                                          </label>
                                          <input
                                            className="form_filed"
                                            type="date"
                                            //  value={formValues.owner.roomDetails.roomType}
                                            //  onChange={(e) =>
                                            //                renderProps.setFieldValue("owner.roomDetails.roomType", e.target.value)
                                            //            }
                                          />
                                        </div>
                                        <div className="room-details-content__wrapper">
                                          <label for="rent-duration">
                                            Rent Duration:
                                          </label>

                                          <select
                                            className="xyz form_filed"
                                            value={
                                              formValues.owner.roomDetails
                                                .rentDuration
                                            }
                                            onChange={(e) =>
                                              renderProps.setFieldValue(
                                                "owner.roomDetails.rentDuration",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option>Select</option>
                                            <option value="Under 6 months">
                                              Under 6 months
                                            </option>
                                            <option value="More than 6 months">
                                              More than 6 months
                                            </option>
                                            <option value="Unlimited">
                                              Unlimited
                                            </option>
                                          </select>
                                        </div>

                                        <div className="room-details-content__wrapper">
                                          <label for="rent-per-month">
                                            Rent per Month:
                                          </label>{" "}
                                          <input
                                            type="text"
                                            className="form_filed"
                                            value={
                                              formValues.owner.roomDetails
                                                .rentPerMonth
                                            }
                                            onChange={(e) =>
                                              renderProps.setFieldValue(
                                                "owner.roomDetails.rentPerMonth",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="room-details-content__wrapper">
                                          <label for="work-preference">
                                            Tenant preference:
                                          </label>
                                          <select
                                            className="xyz form_filed"
                                            value={
                                              formValues.owner.tenantPreference
                                            }
                                            onChange={(e) =>
                                              renderProps.setFieldValue(
                                                "owner.tenantPreference",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option>Select</option>

                                            <option value="Male">Male</option>
                                            <option value="Female">
                                              Female
                                            </option>
                                            <option value="Couple">
                                              Couple
                                            </option>
                                            <option value="Others">
                                              Others
                                            </option>
                                          </select>
                                        </div>

                                        <div className="room-details-content__wrapper">
                                          <label for="work-preference">
                                            Work preference:
                                          </label>{" "}
                                          <select
                                            className="xyz form_filed"
                                            value={
                                              formValues.owner.workPreference
                                            }
                                            onChange={(e) =>
                                              renderProps.setFieldValue(
                                                "owner.workPreference",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option class="mr-4">Select</option>

                                            <option value="Student">
                                              Student
                                            </option>
                                            <option value="Employeed">
                                              Employeed
                                            </option>
                                            <option value="Retired">
                                              Retired
                                            </option>
                                            <option value="Other">Other</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="rooms-checkbox">
                                        <div style={{ display: "flex" }}>
                                          {facilities.map((data, index) => (
                                            <>
                                              <input
                                                checked={checkedState[index]}
                                                onChange={() => {
                                                  handleOnChange(index);
                                                }}
                                                type="checkbox"
                                              />
                                              <label for="Internet">
                                                {data}
                                              </label>

                                              <br />
                                            </>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="room-address">
                                      <div className="room-address-title">
                                        <span>Room Address:</span>
                                        {/* <hr className="seperater right"></hr> */}
                                      </div>
                                      <div className="room-address-content">
                                        <div>
                                          <label for="district">
                                            District:
                                          </label>
                                          <select
                                            className="xyz form_filed"
                                            value={
                                              formValues.owner.roomAddress
                                                .district
                                            }
                                            onChange={(e) =>
                                              renderProps.setFieldValue(
                                                "owner.roomAddress.district",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option>Select</option>
                                            <option value="Kathmandu">
                                              Kathmandu
                                            </option>
                                            <option value="Bhaktapur">
                                              Bhaktapur
                                            </option>
                                            <option value="Lalitpur">
                                              Lalitpur
                                            </option>
                                          </select>
                                        </div>
                                        <div>
                                          <label for="area">Area:</label>
                                          <select
                                            style={{ marginLeft: "26px" }}
                                            className="xyz form_filed"
                                            value={
                                              formValues.owner.roomAddress.area
                                            }
                                            onChange={(e) =>
                                              renderProps.setFieldValue(
                                                "owner.roomAddress.area",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option>Select</option>
                                            {area.map((area) => (
                                              <option
                                                value={JSON.stringify(area)}
                                              >
                                                {area.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                         
                                    </div>

                                    <div id="ui">
                                    <div className="title-and-description">
                                      <div className="title-description-title">
                                        <span>Title and Description:</span>
                                      </div>
                                      <div className="title-and-description-content">
                                        <div className="title-and-description-text">
                                          <label for="ad-title">
                                            Ad Title:
                                          </label>
                                          <input
                                            className="form_filed"
                                            type="text"
                                            value={formValues.owner.title}
                                            onChange={(e) =>
                                              renderProps.setFieldValue(
                                                "owner.title",
                                                e.target.value
                                              )
                                            }
                                          />

                                          <label
                                            className="hidden"
                                            for="ad-title"
                                          >
                                            Email Address:
                                          </label>
                                          <input
                                            className="form_filed hidden"
                                            type="text"
                                            value={formValues.owner.id}
                                            onChange={(e) =>
                                              renderProps.setFieldValue(
                                                "owner.id",
                                                e.target.value
                                              )
                                            }
                                          />

                                          <br />
                                          <div style={{ display: "flex" }}>
                                            <label for="ad-description">
                                              Ad Description:
                                            </label>
                                            <textarea
                                              className="form_filed"
                                              value={
                                                formValues.owner.description
                                              }
                                              onChange={(e) =>
                                                renderProps.setFieldValue(
                                                  "owner.description",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          <br />
                                        </div>
                                        <div className="title-and-description-image py-0.5">
                                          <h4>Add your room Images:</h4>
                                          <input
                                            type="file"
                                            class="hidden"
                                            id="files"
                                            required
                                            // value={formValues.owner.images}
                                            name="images"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={(e) =>
                                              renderProps.setFieldValue(
                                                "images",
                                                e.currentTarget.files[0]
                                              )
                                            }
                                          />
                                          <label
                                            class="filee registration-containedddr btn"
                                            for="files"
                                          >
                                            Upload Image
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    </div>

                                    <div>
                                      <div
                                        style={{
                                          opacity: "1",
                                          color: "#23656C",
                                        }}
                                        className="create"
                                      >
                                        <button
                                          style={{ margin: "auto" }}
                                          type="submit"
                                        >
                                          Post Room
                                        </button>
                                      </div>
                                    </div>
                                  </Form>
                                </>
                              );
                            }}
                          </Formik>
                          
                        </div>
                        
                      );
                    }

                    // console.log();
                  })
                ) : (
                  <h1>No rooms found</h1>
                )
                // Replace this with your modal or component for adding a new room
                }
              </>
            ) : (
              <hr />
              // <h1>Booked Rooms</h1>
              // Code for booked rooms goes here
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
