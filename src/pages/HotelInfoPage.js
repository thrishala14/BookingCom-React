import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/HotelnfoPage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginContext from "../components/LoginContext";
import { TfiHeart } from "react-icons/tfi";
import axios from "axios";
import { FcLike } from "react-icons/fc";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { CiWifiOn } from "react-icons/ci";
import { PiBowlFoodThin } from "react-icons/pi";
import { CiParking1 } from "react-icons/ci";
import Availablity from "../components/Availablity";
import HotelImageNav from "../components/HotelImageNav";
import { Toaster, toast } from "sonner";
import { MdOutlineLocationOn } from "react-icons/md";

import swal from "sweetalert";
import  '../styles/ModifyModal.css'
import { Box, Typography, Modal } from "@mui/material";
import ModifyModal from "../components/ModifyModal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const HotelInfoPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { currentUser } = useContext(LoginContext);
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);
  const labels = window.appLabels;
  const navigate = useNavigate();

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const modifyHotel = () => {
    navigate("/modify");
  };

  const deleteHotel = () => {
    swal({
      title: "Are you sure?",
      text: "Deleted hotel cannot be recovered",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let url = `${process.env.REACT_APP_ADMIN_DELETE_HOTEL}${location.state.hotel.h.hotelId}`;
        let url2 =
          process.env.REACT_APP_DELETE_HOTEL +
          location.state.hotel.h.hotelId;
        axios
          .delete(url2, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              swal(res.data, {
                icon: "success",
              });
              navigate("/hotels");
            } else {
              swal("Hotel not deleted", {
                icon: "info",
              });
            }
          });
      }
    });
  };

  const addToSaveList = () => {
    if (Object.keys(currentUser).length === 0) {
      toast.error(labels.toastErrors.notLoggedInError);
    } else {
      let url = `${process.env.REACT_APP_ADD_SAVED_LIST}`;
      const requestBody = {
        customer: {customerId: currentUser.customerId},
        hotel: location.state.hotel.h,
      };

      axios
        .post(url, requestBody, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) =>
          toast.success(window.appLabels.toastSuccess.addSavedList)
        )
        .catch((err) => toast.error(err.response.data));
      setIsClicked((a) => !a);
    }
  };
  return (
    <div className="hotel-info-page">
      <Toaster richColors={true} position="top-center" />
      <Link to="/home">Home</Link> {" > "} <Link to="/hotels">Hotels</Link>{" "}
      {" > "} <Link>{location.state.hotel.h.hotelName}</Link>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div className="search-bar-hotel">
          <h3>Search</h3>
          <p>Destination/property name:</p>
          <input />
          <p>Check-in date:</p>
          <input />
          <p>Check-out Date:</p>
          <input />
          <input placeholder="2 adults . 1 room" />
          <button>Search</button>
        </div>
        <div>
          <div className="hotel-det">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginLeft: "2.5rem" }}>
                <h2>
                  {location.state.hotel.h.hotelName}{" "}
                  {!isClicked ? (
                    <TfiHeart onClick={addToSaveList} />
                  ) : (
                    <FcLike />
                  )}
                </h2>

                <p>
                  <MdOutlineLocationOn />
                  {location.state.hotel.h.hotelAddress},{" "}
                  {location.state.hotel.h.hotelCity}
                </p>
              </div>
              {currentUser.role === "admin" && (
                <div className="admin-access">
                  <button id="modifyHotel" onClick={handleOpen}>
                    {labels.buttons.modify}
                  </button>
                  <button id="deleteHotel" onClick={deleteHotel}>
                    {labels.buttons.delete}
                  </button>
                </div>
              )}
              <div className="modify-modal">
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Modify Hotel
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 0}}>
                      <ModifyModal hotel = {location.state.hotel.h} imgs = {location.state.img} state = {{setOpen}}/>
                    </Typography>
                  </Box>
                </Modal>
              </div>
              <p className="reserve-room">
                <MdOutlineCurrencyRupee /> {location.state.hotel.h.hotelPrice}
                <button onClick={handleClick}>
                  {labels.bookings.reserveRooms}
                </button>
              </p>
            </div>
          </div>

          <div className="hotel-details">
            <HotelImageNav
              img={location.state.img}
              name={location.state.hotel.h.hotelName}
            />
          </div>
        </div>
      </div>
      <div className="amenities">
        <h2>Amenities</h2>
        <span class="tag-cloud">
          <CiParking1 size={20} />
          Free Parking
        </span>
        <span class="tag-cloud">
          <PiBowlFoodThin size={20} />
          Breakfast Included
        </span>
        <span class="tag-cloud">
          <CiWifiOn size={20} />
          Wi-Fi
        </span>
      </div>
      <div ref={ref}>
        <Availablity hotel={location.state.hotel.h} />
      </div>
    </div>
  );
};

export default HotelInfoPage;
