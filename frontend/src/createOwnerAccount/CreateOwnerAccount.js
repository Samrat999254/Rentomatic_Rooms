/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { useNotifications } from "@mantine/notifications";
import "./createOwnerAccount.css";
import { signup } from "../helper/ApiHelper";



function CreateUserAccount() {
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

  const notifications = useNotifications();
  const { captcha, accept } = activebtn;

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  function onChange(value) {
    setRecaptchaValue(value)

    if (value === "accept") {
      setActivebtn({ ...activebtn, accept: true });
    } else {
      setActivebtn({ ...activebtn, captcha: true });
    }
  }

  const { loading, err } = state;

  const RegisterValidationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Please enter fullname")
      .max(50),
    address: Yup.string()
      .required("Please enter address")
      .max(50),
    phoneNumber: Yup.string()
      .required("Please enter address")
      .max(50),
    gender: Yup.string()
      .required("Please enter address")
      .max(50),
    email: Yup.string()
      .required("Please enter email")
      .email()
      .max(255),
    password: Yup.string()
      .required("Please enter a password")
      .min(8)
      .max(255),
  });

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

    signup(formData)
      .then((data) => {
        console.log(data);
        setState({ loading: false });
        if (data.error) {
          notifications.showNotification({
            color: "red",
            title: "Error",
            message: "Failed to register",
          });
        } else {
          notifications.showNotification({
            color: "green",
            title: "Success",
            message: "Successfully registered",
          });
          resetForm();
          // navigate("/admin/rooms");
          window.location.href = "/login";
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

  console.log(checkedState);
  return (
    <>
      <div className="owner-account">
        <Formik
          enableReinitialize
          initialValues={{
            fullName: "",
            
            dateOfBirth: "",
            address: "",
            phoneNumber: "",
            gender: "",
            email: "",
            password: "",
            images: null,
            role: "owner",
            owner: {
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
              name: "",
              owneremail: "",
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
                <Form encType="multipart-formdata">
                  <div className="image-area">
                    <h2
                      style={{
                        padding: "20px 0",
                        color: "#000",
                        fontSize: "40px",
                        fontWeight: "700",
                      }}
                    >
                      Create an Owner Account
                    </h2>
                    <span class="text-center" style={{ padding:"20px 30px", fontSize: "18px", marginTop: "-3.1rem" }}>
                      {" "}
                      Rentomatic Rooms offers free advertisement of your rooms.
                      Create your owner account and list rooms with proper
                      details. Your rooms will be rented out to a good tenant in
                      no time.
                    </span>
                  </div>
               
                  <div className="user-details " id="ud">
                    <div className="user-details-title fw-600">
                      <span>My Account Details:</span>
                    </div>

                    <div className="row">

                    <div className="user-details-description col-8">
                      <label for="full-name">Full name:</label>
                      <input
                        className="form_filed"
                        type="text"
                        //Placeholder="Samart Thapa"
                        value={formValues.fullName}
                        onChange={(e) => {
                          renderProps.setFieldValue("fullName", e.target.value);
                          renderProps.setFieldValue(
                            "owner.name",
                            e.target.value
                          );
                        }}
                      />
                      <br />
                      <label for="dob">Date of Birth:</label>
                      <input
                        className="form_filed"
                        type="date"
                        value={formValues.dateOfBirth}
                        onChange={(e) =>
                          renderProps.setFieldValue(
                            "dateOfBirth",
                            e.target.value
                          )
                        }
                      />
                      <br />
                      <label for="address">Address:</label>
                      <input
                        className="form_filed"
                        //Placeholder="Kathmandu"
                        type="text"
                        value={formValues.address}
                        onChange={(e) =>
                          renderProps.setFieldValue("address", e.target.value)
                        }
                      />
                      <br />
                      <label for="phone">Phone number:</label>
                      <input
                        className="form_filed"
                        type="text"
                        //Placeholder="9829113344"
                        value={formValues.phoneNumber}
                        onChange={(e) =>
                          renderProps.setFieldValue(
                            "phoneNumber",
                            e.target.value
                          )
                        }
                      />
                      <br />
                      <label for="gender">Gender:</label>{" "}
                      <select
                        className="form_filed"
                        value={formValues.gender}
                        onChange={(e) =>
                          renderProps.setFieldValue("gender", e.target.value)
                        }
                      >
                        <option>Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <br />
                      <label for="email">Email:</label>
                      <input
                        className="form_filed"
                        type="email"
                        value={formValues.email}
                        onChange={(e) => {
                          renderProps.setFieldValue("email", e.target.value);
                          renderProps.setFieldValue(
                            "owner.owneremail",
                            e.target.value
                          );
                        }}
                      />
                      <br />
                      <label for="password">Password:</label>
                      <input
                        className="form_filed"
                        //Placeholder="*********"
                        type="password"
                        value={formValues.password}
                        onChange={(e) =>
                          renderProps.setFieldValue("password", e.target.value)
                        }
                      />
                      
                      <br />
                    </div>
                    <div  style={{marginLeft:"-250px"}} className="title-and-description-image col-4 py-0.5">
                        <h4>Add your Profile Image:</h4>
                        <input
                          type="file"
                          class="hidden"
                          required
                          id="file"
                          // value={formValues.owner.images}
                          name="images"
                          accept="image/*"
                          style={{display:"none"}}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "image",
                              e.currentTarget.files[0]
                            )
                          }
                        />
                        <label class="filee registration-containedddr btn" for="file">Upload Image</label>

                      </div>
                      </div>
                  </div>
                  <div id="ud">
                  <div className="room-details" >
                    <div className="room-details-title fw-600">
                      <span>Room Details:</span>
                      {/* <hr className="seperater right"></hr> */}
                    </div>
                    <div className="room-details-content">
                      <div className="room-details-content__wrapper">
                        <label for="room-types">Room types:</label>{" "}
                        <select
                          className="xyz form_filed"
                          value={formValues.owner.roomDetails.roomType}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.roomDetails.roomType",
                              e.target.value
                            )
                          }
                        >
                          <option>Select</option>

                          <option value="Single">Single</option>
                          <option value="Double">Double</option>
                        </select>
                      </div>

                      <div className="room-details-content__wrapper">
                        <label for="available">Available From:</label>
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
                        <label for="rent-duration">Rent Duration:</label>

                        <select
                          className="xyz form_filed"
                          value={formValues.owner.roomDetails.rentDuration}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.roomDetails.rentDuration",
                              e.target.value
                            )
                          }
                        >
                          <option>Select</option>
                          <option value="Under 6 months">Under 6 months</option>
                          <option value="More than 6 months">
                            More than 6 months
                          </option>
                          <option value="Unlimited">Unlimited</option>
                        </select>
                      </div>

                      <div className="room-details-content__wrapper">
                        <label for="rent-per-month">Rent per Month:</label>{" "}
                        <input
                          type="text"
                          className="form_filed"
                          value={formValues.owner.roomDetails.rentPerMonth}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.roomDetails.rentPerMonth",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="room-details-content__wrapper">
                        <label for="work-preference">Tenant preference:</label>
                        <select
                          className="xyz form_filed"
                          value={formValues.owner.tenantPreference}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.tenantPreference",
                              e.target.value
                            )
                          }
                        >
                          <option>Select</option>

                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Couple">Couple</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>

                      <div className="room-details-content__wrapper">
                        <label for="work-preference">Work preference:</label>{" "}
                        <select
                          className="xyz form_filed"
                          
                          value={formValues.owner.workPreference}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.workPreference",
                              e.target.value
                            )
                          }
                        >
                          <option class="mr-4">Select</option>

                          <option value="Student">Student</option>
                          <option value="Employeed">Employeed</option>
                          <option value="Retired">Retired</option>
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
                            <label for="Internet">{data}</label>

                            <br />
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <br />
                  <hr />
                  <div className="room-address" id="rd">
                     <div className="raa">Room Address:</div>
                    <div className="room-address-content">
                      <div className="">
                        <label for="city">District:</label>&nbsp;&nbsp;&nbsp;
                    
                        <select 
                          className="xyz form_filed"
                          value={formValues.owner.roomAddress.district}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.roomAddress.district",
                              e.target.value
                            )
                          }
                        >
                          <option>Select</option>
                          <option value="Kathmandu">Kathmandu</option>
                          <option value="Bhaktapur">Bhaktapur</option>
                          <option value="Lalitpur">Lalitpur</option>
                        </select>
                      </div>
                      <div className="ok22">
                        <label for="area">Area:</label>&nbsp;&nbsp;&nbsp;&nbsp;
                        <select
                          className="xyz form_filed"
                          value={formValues.owner.roomAddress.area}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.roomAddress.area",
                              e.target.value
                            )
                          }
                        >
                          <option>Select</option>
                          {area.map((area) => (
                            <option value={JSON.stringify(area)}>
                              {area.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="title-and-description" id="ud">
                    <div className="title-description-title">
                      <span>Title and Description:</span>
                    </div>
                    <div className="title-and-description-content">
                      <div className="title-and-description-text">
                        <label for="ad-title">Ad Title:</label>
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
                        <br />
                        <div style={{ display: "flex" }}>
                          <label for="ad-description">Ad Description:</label>
                          <textarea
                            className="form_filed"
                            value={formValues.owner.description}
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
                        <h4>Add your Room Images:</h4>
                        <input
                          type="file"
                          class="hidden"
                          required
                          id="files"
                          // value={formValues.owner.images}
                          name="images"
                          accept="image/*"
                          style={{display:"none"}}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "images",
                              e.currentTarget.files[0]
                            )
                          }
                        />
                        <label class="filee registration-containedddr btn" for="files">Upload Image</label>

                      </div>

                    </div>
                  </div>
                  <div>
                    <ReCAPTCHA
                      className="re " style={{width:"100%"}}
                      sitekey="6LeLC34fAAAAALwYaqseHZhN9VyclngMgBXDy0F_"
                      onChange={onChange}
                    />
                    <div className="terms text-center">
                      {" "}
                     
                      <p >
                      <input
                        onClick={() => onChange("accept")}
                        type="checkbox"
                      />
                        I have read and agree the Terms & Privacy Policy of
                        Rentomatic Rooms.
                      </p>
                    </div>
                    {accept && captcha ? (
                      !loading ? (
                        <div className="create">
                          <button type="submit" style={{margin:"auto"}}>
                            Create Owner Account with Ads
                          </button>
                        </div>
                      ) : (
                        <div className="create">
                          <button
                            disabled
                            style={{margin:"auto"}}
                            type="button"
                            class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                          >
                            <svg
                              role="status"
                              class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="#1C64F2"
                              />
                            </svg>
                            Loading...
                          </button>
                        </div>
                      )
                    ) : (
                      <div  style={{ opacity: "1",color:"#23656C", }} className="create">
                        <button style={{margin: "auto"}} disabled type="submit">
                          Create Owner Account with Ads
                        </button>
                      </div>
                    )}
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default CreateUserAccount;
