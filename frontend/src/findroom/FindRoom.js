import React from "react";
import "./FindRoom.css";
import { useState, useEffect } from "react";
import ImageHelper from "../helper/ImageHelper";
import { getAllRooms, searchRoom } from "../helper/ApiHelper";
import { Link, useNavigate } from "react-router-dom";
import { addItemToCart } from "../helper/CartHelper";

function FindRoom() {
  let navigate = useNavigate();

  const [value] = useState(1);
  const [active, setActive] = useState({
    recent: false,
    cheapest: false,
    expensive: false,
    kathmandu: false,
    lalitpur: false,
    bhaktapur: false,
    male: false,
    female: false,
    Couple: false,
    short: false,
    long: false,
  });
  const [products, setProducts] = useState([]);
  const [setError] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  // const term = queryParams.get("term")
  const location = queryParams.get("location");
  let price = queryParams.get("price");
  let preference = queryParams.get("preference");
  let duration = queryParams.get("duration");

  const {
    bhaktapur,
    cheapest,
    expensive,
    Couple,
    female,
    kathmandu,
    lalitpur,
    long,
    male,
    recent,
    short,
  } = active;

  // // console.log(duration);

  const preloadProducts = async () => {
    if (location) {
      if (location === "Kathmandu") {
        setActive({ kathmandu: true });
      }
      if (location === "Lalitpur") {
        setActive({ lalitpur: true });
      }
      if (location === "Bhaktapur") {
        setActive({ bhaktapur: true });
      }

      await searchRoom("location", location).then((data) => {
        // console.log(data);

        if (data.err) {
          setError(data.err);
        } else {
          setProducts(data);
        }
      });
    }
    if (price) {
      if (price === "cheapest") {
        setActive({ cheapest: true });
      }
      if (price === "expensive") {
        setActive({ expensive: true });
      }

      await searchRoom("price", price).then((data) => {
        // console.log(data);

        if (data.err) {
          setError(data.err);
        } else {
          setProducts(data);
        }
      });
    }

    if (preference) {
      if (preference === "male") {
        setActive({ male: true });
      }
      if (preference === "female") {
        setActive({ female: true });
      }
      if (preference === "Couple") {
        setActive({ Couple: true });
      }

      await searchRoom("preference", preference).then((data) => {
        // console.log(data);

        if (data.err) {
          setError(data.err);
        } else {
          setProducts(data);
        }
      });
    }
    //Duration
    if (duration) {
      if (duration === "short") {
        setActive({ short: true });
      }
      if (duration === "long") {
        setActive({ long: true });
      }

      await searchRoom("duration", duration).then((data) => {
        // console.log(data);

        if (data.err) {
          setError(data.err);
        } else {
          setProducts(data);
        }
      });
    }
    if (!price && !location && !preference && !duration) {
      await getAllRooms().then((data) => {
        // // console.log(data);

        if (data.err) {
          setError(data.err);
        } else {
          setProducts(data);
        }
      });
    }
  };

  function handleBookMark(room) {
    addItemToCart(room);
  }

  useEffect(() => {
    preloadProducts();
  }, []);
  useEffect(() => {
    const ele = document.querySelector(".slider-mechanism");
    if (ele) {
      ele.style.left = `${Number(value)}px`;
    }
  });
  // console.log(active);
  return (
    <>
      <div className="findroom-main-section">
        <div className="title-main-section">
          <h2
            style={{ padding: ".8rem 0", color: "#212529", fontSize: "28px" }}
          >
            Find Your Preferred Room
          </h2>
        </div>
        <div className="main-section-hero">
          <div className="example">
            {products.map((room) => {
              if (
                room.owner &&
                room.owner.description &&
                room.owner.roomAddress &&
                room.owner.roomAddress.district &&
                room.owner.roomDetails &&
                room.owner.roomDetails.rentPerMonth
              ) {
                return (
                  <>
                    <div
                      style={{
                        marginLeft: "1.5rem",
                        marginBottom: "1.5rem",
                        height: "fit-content",
                        width: "270px",
                        borderRadius: "15px",
                      }}
                      className="max-w-lg bg-white  border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                    >
                      <ImageHelper productId={room._id} className="image11" />

                      <div class="p-5">
                        <h6 className="mb-2 text-1xl font-medium tracking-tight text-gray-900 dark:text-white">
                          {room.owner.description}
                        </h6>

                        <h6 className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                          {room.owner.roomAddress.district}
                        </h6>

                        <h6 className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                          Rs. {room.owner.roomDetails.rentPerMonth} per month
                        </h6>

                        <i
                          className="heart fa-regular fa-heart margin-20px icone"
                          onClick={() => handleBookMark(room)}
                        ></i>

                        <Link
                          style={{ marginLeft: "-90px" }}
                          to={`/room/${room.owner._id}`}
                          className="inline-flex items-center py-2 px-3 text-sm font-medium  text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          View more
                          <svg
                            className="ml-2 -mr-1 w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
          <div className="filters">
            <div className="filters-title">
              <h3
                style={{
                  fontWeight: "semibold",
                  fontSize: "25px",
                  color: "#212529",
                  marginBottom: "1rem",
                  marginTop: "-1rem",
                }}
              >
                Filters
              </h3>
            </div>
            <div className="filter-content">
              <span>What are you looking for?</span>
              <br />
              <div>
                <button>
                  <Link className="tenant-btn" to={`/findtenant`}>
                    Tenant
                  </Link>
                </button>
                <button className="active">
                  <Link className="room-btn " to={`/findroom`}>
                    Room
                  </Link>
                </button>
              </div>
              <span>Sort By</span>
              <br />
              <div>
                {/* <button
                  onClick={() => setActive({ recent: true })}
                  className={`recent-btn ${recent ? "active" : ""}`}
                >
                  Recent
                </button> */}
                <button
                  onClick={() => {
                    navigate(`/findroom/?price=cheapest`);
                    window.location.reload();
                    setActive({ cheapest: true });
                  }}
                  className={`cheapest-btn ${cheapest ? "active" : ""}`}
                >
                  Cheapest
                </button>
                <button
                  onClick={() => {
                    navigate(`/findroom/?price=expensive`);
                    window.location.reload();
                    setActive({ expensive: true });
                  }}
                  className={`expensive ${expensive ? "active" : ""}`}
                >
                  Expensive
                </button>
              </div>
              <span>Location</span>
              <br />
              <div>
                <button
                  onClick={() => {
                    navigate(`/findroom/?location=Kathmandu`);
                    window.location.reload();
                  }}
                  className={`kathmandu-btn selected-btn ${
                    kathmandu ? "active" : ""
                  }`}
                >
                  Kathmandu
                </button>
                <button
                  className={`lalitpur-btn ${lalitpur ? "active" : ""}`}
                  onClick={() => {
                    navigate(`/findroom/?location=Lalitpur`);
                    window.location.reload();
                  }}
                >
                  Lalitpur
                </button>
                <button
                  className={`bhaktapur-btn ${bhaktapur ? "active" : ""}`}
                  onClick={() => {
                    navigate(`/findroom/?location=Bhaktapur`);
                    window.location.reload();
                  }}
                >
                  Bhaktapur
                </button>
              </div>
              <span>Room For</span>
              <br />
              <div>
                <button
                  onClick={() => {
                    navigate(`/findroom/?preference=male`);
                    window.location.reload();
                  }}
                  className={`male-btn ${male ? "active" : ""}`}
                >
                  Male
                </button>

                <button
                  onClick={() => {
                    navigate(`/findroom/?preference=female`);
                    window.location.reload();
                  }}
                  className={`female-btn ${female ? "active" : ""}`}
                >
                  Female
                </button>
                <button
                  onClick={() => {
                    navigate(`/findroom/?preference=Couple`);
                    window.location.reload();
                  }}
                  className={`Couple ${Couple ? "active" : ""}`}
                >
                  Couple
                </button>
              </div>
              <span>Stay Duration</span>
              <br />
              <div>
                <button
                  onClick={() => {
                    navigate(`/findroom/?duration=short`);
                    window.location.reload();
                  }}
                  className={`shortTerm-btn ${short ? "active" : ""}`}
                >
                  Short Term
                </button>
                <button
                  onClick={() => {
                    navigate(`/findroom/?duration=long`);
                    window.location.reload();
                  }}
                  className={`longTerm-btn ${long ? "active" : ""}`}
                >
                  Long Term
                </button>
              </div>
              {/* <span>Rent for Month</span> */}
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindRoom;
