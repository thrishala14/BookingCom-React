import React, { useContext } from "react";
import "../styles/HeaderTop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdViewHeadline } from "react-icons/md";
import {
  faQuestion,
  faBell,
  faUser,
  faRightFromBracket,
  faHeart,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "./LoginContext";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BsSuitcaseLg } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { deepPurple, yellow } from "@mui/material/colors";
import ReactCountryFlag from "react-country-flag";

const HeaderTop = () => {
  const { currentUser, setCurrentUser } = useContext(LoginContext);
  const navigate = useNavigate();
  const staticLabels = window.appLabels;

  const signout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser({});
    navigate("/");
  };

  const getFirstLetter = (name) => {
    return name.split("")[0];
  };

  return (
    <div className="header">
      <h2>{staticLabels.generic.appName}</h2>
      <div className="button-header">
        <div className="topnav">
          <button>
            <Tooltip title={staticLabels.headers.selectCountry}>
              <IconButton style={{ color: "white", fontSize:"smaller"}}>INR</IconButton>
            </Tooltip>
          </button>

          <button>
            <Tooltip title={staticLabels.headers.contactCustomerService}>
              <IconButton>
                <FontAwesomeIcon icon={faQuestion} style={{ fontSize:"smaller"}}/>
              </IconButton>
            </Tooltip>
            {/* <ReactCountryFlag countryCode="IND" /> */}
          </button>

          <button>
            <Tooltip title="View your notification">
              <IconButton>
                <FontAwesomeIcon size={2} icon={faBell} style={{ fontSize:"smaller"}}/>
              </IconButton>
            </Tooltip>
          </button>

          <button style={{ border: "1pt white solid", padding: "0.5rem" }}>
            {staticLabels.headers.listYourProperty}
          </button>
          <div className="dropdown">
            <button className="dropbtn">
              {currentUser.firstName !== undefined ? (
                <p style={{ display: "flex" }}>
                  <Avatar sx={{ bgcolor: yellow[700], color: "black", width: 30, height: 30 }}>
                    <span className="avatar-letter">{getFirstLetter(currentUser.firstName)}</span>
                  </Avatar>
                  <span>{currentUser.firstName}</span>
                </p>
              ) : (
                staticLabels.profile.profile
              )}
            </button>
            <div className="dropdown-content">
              {currentUser.firstName !== undefined ? (
                <Link to="/account">
                  <FaRegUser /> {staticLabels.profile.manageAccount}
                </Link>
              ) : (
                <Link to="/login">
                  <FaRegUser /> {staticLabels.profile.login}{" "}
                </Link>
              )}
              {currentUser.role === "admin" && (
                <Link to="/admin">
                  <MdOutlineAdminPanelSettings />
                  {staticLabels.profile.admin}
                </Link>
              )}
              <Link to="/bookings">
                <BsSuitcaseLg /> {staticLabels.profile.bookingsTrips}
              </Link>
              <Link to="/savedList">
                <FaRegHeart /> {staticLabels.profile.savedList}
              </Link>
              <a href="#" onClick={signout}>
                <PiSignOutBold />
                {staticLabels.profile.signout}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderTop;
