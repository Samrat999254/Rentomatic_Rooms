import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "@mantine/core";
import { FaStar, FaTimes } from "react-icons/fa";
import { Formik, Form } from "formik";
import { useNotifications } from "@mantine/notifications";
import { updateOwner } from "../helper/ApiHelper";
import { FaFacebookMessenger } from "react-icons/fa";
import ChatBot from "react-simple-chatbot"; 
import "./Hero.css";
import Bouddha from "./img/Boudha.jpg";
import Patan from "./img/Patan.jpg";
import Koteshwor from "./img/Koteshwor.jpg";
import Baneshwor from "./img/Baneshwor.jpg";
import Kritipur from "./img/Kritipur.jpg";
import Kalanki from "./img/Kalanki.jpg";
import { getSession } from "../helper/session";

function Hero() {
  const [showbot, setShowBot] = useState(false);
  const [search, setSearch] = useState();
  const [opened, setOpened] = useState(false);
  const [rate, setRate] = useState(0);
  let navigate = useNavigate();
  let params = useParams();

  const notifications = useNotifications();

  // getting rating values stored in local storage and assigning to the rating components
  useEffect(() => {
    const rating = parseInt(localStorage.getItem("rating"));
    setRate(isNaN(rating) ? 0 : rating);
  }, []);

  const owner = getSession();

  function handleSearch() {
    if(search === undefined || search === null || search === ''){
      return;
    }
    navigate(`/findroom/?location=${search}`);
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

    { name: "Madhyapur Thimi", lat: 27.678474442278116, lan: 85.38038933367886},

    { name: "Sallaghari", lat: 27.671785350954636, lan: 85.40751455954009 },

    { name: "Katunje", lat: 27.66437263645023, lan: 85.40930079250602 },

    { name: "Balkot", lat: 27.663739820252644, lan: 85.37776102223424 },

    { name: "Bhaktapur", lat: 27.671016983049867, lan: 85.42951074577422 },

    { name: "Boudha", lat: 27.720172, lan: 85.358011 },

    { name: "Patan", lat: 27.669943, lan: 85.320404 },

    { name: "Pepsicola", lat: 27.68891, lan: 85.360321 },

    { name: "Kritipur", lat: 27.663, lan: 85.2774 },
  ];

  function handleFormSubmit(values, { resetForm }) {
    let formData = new FormData();
    console.log(values);
    for (let value in values) {
      if (value === "owner") {
        formData.append(value, JSON.stringify(values[value]));
      } else {
        formData.append(value, values[value]);
      }
    }
    console.log(formData);
    updateOwner(formData)
      .then((data) => {
        console.log(data);
        if (data.error) {
          notifications.showNotification({
            color: "red",
            title: "Error",
            message: "Failed to post!",
          });
        } else {
          notifications.showNotification({
            color: "green",
            title: "Success",
            message: "Successfully Posted!",
          });
          resetForm();
        }
      })
      .catch((err) => console.log(err));
  }
  function handleFormSubmit(values, { resetForm }) {
    let formData = new FormData();
    console.log(values);
    for (let value in values) {
      if (value === "owner") {
        formData.append(value, JSON.stringify(values[value]));
      } else {
        formData.append(value, values[value]);
      }
    }

    // Log FormData entries
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    updateOwner(formData)
      .then((data) => {
        console.log(data);
        if (data.error) {
          notifications.showNotification({
            color: "red",
            title: "Error",
            message: "Failed to post!",
          });
        } else {
          notifications.showNotification({
            color: "green",
            title: "Success",
            message: "Successfully Posted!",
          });
          resetForm();
        }
      })
      .catch((err) => console.log(err));
}

  return (
    <>
      <div className="hero">
        <div className="hero-description">
          <h2 className="hero_heading">Rooms for Rent</h2>
          <h3 className="hero_sub_heading ">Find your suitable rentals</h3>
          <br />
          <br />
          <div className="searchspan">
            <input
              type="text"
              className="search"
              placeholder="Enter an address, city or area"
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <img
              className="searchicon"
              src={require("./img/searchicon.png")}
              alt="searchicon"
              onClick={handleSearch}
            />

          </div>
        </div>
      </div>
      <div className="hero-section-wrapper">
        <div className="hero-section">
          <h4 className="customer"> Customer Rating</h4>
          {[...Array(5)].map((item, index) => {
            const givenRating = index + 1;
            return (
              <label>
                <input
                  style={{
                    display: "none",
                  }}
                  type="radio"
                  value={givenRating}
                  onClick={() => {
                    setRate(givenRating);
                    //saving rating in local storage
                    localStorage.setItem("rating", givenRating);
                  }}
                />
                <div style={{ cursor: "pointer", marginLeft: ".2rem" }}>
                  <FaStar
                    color={
                      givenRating < rate || givenRating === rate
                        ? "#1F47F5"
                        : "white"
                    }
                  />
                </div>
              </label>
            );
          })}
          <div className="rating-description">
            <span style={{ marginRight: "1rem" }}>Rating Point</span>
            <span>{rate}</span>/<span>5</span>
          </div>
        </div>
      </div>

      <Modal
        overflow="inside"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Post Your Room Ads!"
      >
        <Formik
          enableReinitialize
          initialValues={{
            images: null,
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
              description: "",
              images: null,
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
            // console.log(formValues);
            return (
              <>
                <Form encType="multipart-formdata">
                  <div className="hero-owner-account">
                    <div className="room-details">
                      <div className="room-details-title">
                        <span>Room Details:</span>
                        <hr className="seperater right"></hr>
                      </div>
                      <div className="room-details-content">
                        <label for="room-types">Room types:</label>{" "}
                        <select
                          className="xyz"
                          value={formValues.owner.roomDetails.roomType}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.roomDetails.roomType",
                              e.target.value
                            )
                          }
                        >
                          <option value="Single">Single</option>
                          <option value="Double">Double</option>
                        </select>
                        <br />
                        <label for="available">Available From:</label>
                        <input type="date" />
                        <br />
                        <label for="rent-duration">Rent Duration:</label>
                        <select
                          className="xyz"
                          value={formValues.owner.roomDetails.rentDuration}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.roomDetails.rentDuration",
                              e.target.value
                            )
                          }
                        >
                          <option value="Under 6 months">Under 6 months</option>
                          <option value="More than 6 months">
                            More than 6 months
                          </option>
                          <option value="Unlimited">Unlimited</option>
                        </select>
                        <br />
                        <label for="rent-per-month">Rent Per Month:</label>{" "}
                        <input
                          type="text"
                          value={formValues.owner.roomDetails.rentPerMonth}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.roomDetails.rentPerMonth",
                              e.target.value
                            )
                          }
                        />
                        <br />
                        <label for="work-preference">
                          Tenant Preference:
                        </label>{" "}
                        <select
                          className="xyz"
                          id="tenantPreference"
                          value={formValues.owner.tenantPreference}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.tenantPreference",
                              e.target.value
                            )
                          }
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Couple">Couple</option>
                          <option value="Others">Others</option>
                        </select>
                        <br />
                        <label for="work-preference">
                          Work Preference:
                        </label>{" "}
                        <select
                          className="xyz"
                          value={formValues.owner.workPreference}
                          onChange={(e) =>
                            renderProps.setFieldValue(
                              "owner.workPreference",
                              e.target.value
                            )
                          }
                        >
                          <option value="Student">Student</option>
                          <option value="Employeed">Employeed</option>
                          <option value="Retired">Retired</option>
                          <option value="Other">Other</option>
                        </select>
                        <br />
                      </div>
                    </div>
                    <div className="room-address">
                      <div className="room-address-title">
                        <span>Room Address:</span>
                        <hr className="seperater right"></hr>
                      </div>
                      <label for="district">District:</label>
                      <select
                        className="xyz"
                        value={formValues.owner.roomAddress.district}
                        onChange={(e) =>
                          renderProps.setFieldValue(
                            "owner.roomAddress.district",
                            e.target.value
                          )
                        }
                      >
                        <option value="Kathmandu">Kathmandu</option>
                        <option value="Bhaktapur">Bhaktapur</option>
                        <option value="Lalitpur">Lalitpur</option>
                      </select>
                      <br />
                      <label for="area">Area:</label>
                      <select
                        type="text"
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
                      <br />
                    </div>
                    <div className="title-and-description">
                      <div className="title-description-title">
                        <span>Title and Description:</span>
                        <hr className="seperater right"></hr>
                      </div>
                      <div className="title-and-description-content">
                        <div className="title-and-description-text">
                          <label for="ad-title">Ad Title:</label>

                          <input
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
                          <label for="ad-description">Ad Description:</label>
                          <br />
                          <textarea
                            value={formValues.owner.description}
                            onChange={(e) =>
                              renderProps.setFieldValue(
                                "owner.description",
                                e.target.value
                              )
                            }
                          />
                          <br />
                        </div>
                        <div className="title-and-description-image">
                          <h4>Upload room images</h4>
                          <input
                            id="images"
                            name="images"
                            accept="image/*"
                            type="file"
                            //  value={formValues.tenant.profileDescription.images}
                            onChange={(e) =>
                              // console.log(e.currentTarget.files[0])
                              renderProps.setFieldValue(
                                "images",
                                e.currentTarget.files[0]
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="create">
                        <button type="submit">Post Room Ads</button>
                      </div>
                    </div>
                  </div>
                </Form>
              </>
            );
          }}
        </Formik>
      </Modal>
      <div className="card-section">
        <div className="card-1">
          <div className="card-description">
            <h2>Got a Room to Rent?</h2>
            <h4>
              Rentomatic rooms provides its users with free advertisement. Your
              room will be rented to a good tenant in short period of time.
            </h4>
          </div>
          <div className="card-bottom">
            <div className="btndiv">
            <button
  onClick={() => {
    const parsedOwner = JSON.parse(owner);
    if (parsedOwner && parsedOwner.role === "owner") {
      // setOpened(true);
      window.location.href = '/profile'
    } else {
      notifications.showNotification({
        color: "red",
        title: "Error",
        message: "Please sign in as a Room Owner",
      });
    }
  }}
  className="btns"
>
                List Your Rooms
              </button>
              <span className="btnplus fa-solid fa-plus"></span>
            </div>
          </div>
        </div>
        <div className="card-2">
          <div className="card-description">
            <h2>Need a Room?</h2>
            <h4>
              Rentomatic Rooms provides its users with free room findings.Your
              will be able to find your preferred rooms within short time.
            </h4>
          </div>
          <div className="card-bottom">
            <div className="btndiv">
              <Link to={"/findroom"}>
                <button className="btns">Find Your Room</button>
              </Link>

              <span className="btnplus fa-solid fa-home"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-section-2">
        <div id="features" className="title-hero-section-2">
          <h1>Rent Easily With Safety</h1>
        </div>
        <div className="hero-section-2-card">
          <div className="card">
            <i class="file fa-4x fa-solid fa-file"></i>
            <h5>List Room Easily</h5>
            <span>
              Post available rooms with proper room details and find preferred
              tenants easily.
            </span>
          </div>
          <div className="card">
            <i class="file fa-4x fa-solid fa-globe"></i>
            <h5>Online Room Tour</h5>
            <span>
              Search preferred rooms and view their details with images.
            </span>
          </div>
          <div className="card">
            <i class="file fa-4x fa-solid fa-phone-volume"></i>
            <h5>Quick Contact</h5>
            <span>
              Find preferred rooms or tenants and contact them easily to rent.
            </span>
          </div>
        </div>
      </div>

      <div className="hero-section-3">
        <div className="title-hero-section-3">
          <h1>Explore Rooms In Popular Areas</h1>
        </div>
        <div className="hero-section-3-card-section">
          <div
            className="hero-section-3-card"
            onClick={() => navigate(`/findroom/?location=Kritipur`)}
          >
            <div className="title-hero-section-3-card">Kritipur</div>
            <img src={Kritipur} alt="kritipur" />
          </div>

          <div
            className="hero-section-3-card"
            onClick={() => navigate(`/findroom/?location=Baneshwor`)}
          >
            <div className="title-hero-section-3-card">Baneshwor</div>
            <img src={Baneshwor} alt="baneshwor" />
          </div>
          <div
            className="hero-section-3-card"
            onClick={() => navigate(`/findroom/?location=Patan`)}
          >
            <div className="title-hero-section-3-card">Patan</div>
            <img src={Patan} alt="patan" />
          </div>

          <div
            className="hero-section-3-card"
            onClick={() => navigate(`/findroom/?location=Koteshwor`)}
          >
            <div className="title-hero-section-3-card">Koteshwor</div>
            <img src={Koteshwor} alt="koteshwor" />
          </div>
          <div
            className="hero-section-3-card"
            onClick={() => navigate(`/findroom/?location=boudha`)}
          >
            <div className="title-hero-section-3-card">Boudha</div>
            <img src={Bouddha} alt="boudha" />
          </div>

          <div
            className="hero-section-3-card"
            onClick={() => navigate(`/findroom/?location=Kalanki`)}
          >
            <div className="title-hero-section-3-card">Kalanki</div>
            <img src={Kalanki} alt="kalanki" />
          </div>

        </div>
      </div>

      <div style={{ position: "fixed", bottom: "32px", right: "12px" }}>
        {showbot ? (
          <>
            <FaTimes
              size={15}
              style={{
                zIndex: "1000",
                position: "relative",
           
                top: "34px",
                left: "85%",
              }}
              onClick={() => setShowBot(!showbot)}
            />

            <ChatBot
              // onClick={{}}
              onClick={() => setShowBot(!showbot)}
              style={{
                position: "-webkit-sticky !important",
                color: 'black2',
                
                // position: "fixed !important",
                bottom: "95px !important",
                right:  "30px !important",
              }}
              steps={[
                {
                  id: "1",
                  //chat bot messege
                  message: "Welcome to Rentomatic Rooms!",
                  trigger: "2",
                },
                {
                  id: "2",
                  message:
                    "I am the bot and can answer most of your questions.",
                  trigger: "3",
                },
                {
                  id: "3",
                  user: true,
                  trigger: "4",
                },
                {
                  id: "4",
                  message:
                    "You have to register as an owner and fill up the room details.",
                  trigger: "5",
                },
                {
                  id: "5",
                  user: true,
                  trigger: "6",
                },
                {
                  id:"6",
                  message:
                  "To find tenants, navigate our tenant page and find preferred tenants using the filter.",
                  trigger:"7",
                },
                {
                  id:"7",
                  user: true,
                  trigger: "8",
                },
                {
                  id:"8",
                  message:
                  "To contact tenants, First register to the system ,navigate our tenant detail section and check the view tenant contact info.",
                  trigger:"9",
                },
                {
                  id:"9",
                  user: true,
                  trigger: "10",
                },

                {
                  id:"10",
                  message:
                  "To find room, navigate our room page and view preferred rooms using filters along with room details",
                  trigger:"11",
                },
                {
                  id:"11",
                  user: true,
                  trigger: "12",
                },

                {
                  id: "12",
                  message:
                    "To contact room owner, First login to the system ,navigate our room detail section and check the view  owner contact info.",
                    
                  trigger: "13",
                },
                {
                  id: "13",
                  user: true,
                  trigger: "14",
                },

                {
                  id: "14",
                  message:
                    "You have to register as a tenant and fill up the details to login as a tenant.",
                  trigger: "15",
                },
                {
                  id: "15",
                  user: true,
                  trigger: "16",
                },
                {
                  id: "16",
                  message:
                    "To bookmark room, click the heart icon in the room page and view bookmarked room in profile.",
                  trigger: "17",
                },
                {
                  id: "17",
                  user: true,
                  trigger: "18",
                },
                {
                  id: "18",
                  message:
                  "To rate the system according to your experience, click the start icon of the rating section in the home page.",
                  end: true,
                },
              ]}
            />
          </>
        ) : (
          <FaFacebookMessenger
          color="#076CDF"
            cursor="pointer"
            onClick={() => setShowBot(!showbot)}
            size={40}
          />
        )}
      </div>
    </>
  );
}

export default Hero;
