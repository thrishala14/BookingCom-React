import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../components/LoginContext";
import "../styles/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SideNavigationPage from "./SideNavigationPage";
import useAuth from "../auth/useAuth";
import { toast } from "sonner";

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const buttons = window.appLabels.buttons
  const labels = window.appLabels.profilePageHeaders;
  const [updateInfo, setUpdateInfo] = useState({
    fname: false,
    lname: false,
    photo: false,
    email: false,
    phone: false,
    dob: false,
  });

  const [picUpdate, setPicUpdate] = useState(false);
  const [picImg, setPicImg] = useState(null);

  const [updatedInfo, setUpdatedInfo] = useState({
    customerId: currentUser.customerId,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    customerEmail: currentUser.customerEmail,
    customerPhone: currentUser.customerPhone,
    customerDob: currentUser.customerDob,
    customerPassword: currentUser.customerPassword,
  });

  useEffect(() => {
    axios
      .put(`${process.env.REACT_APP_UPDATE_PROFILE}`, currentUser, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .catch((err) => console.log(err));
  }, [currentUser]);

  function updateCustomer() {
    setCurrentUser({
      ...currentUser,
      firstName: updatedInfo.firstName,
      lastName: updatedInfo.lastName,
      customerEmail: updatedInfo.customerEmail,
      customerPhone: updatedInfo.customerPhone,
      customerDob: updatedInfo.customerDob,
    });
  }

  const updateProfilePic = () => {
    let url = process.env.REACT_APP_UPDATE_PROFILE_PIC;
    const requestBody = {
      file: picImg,
      custId: currentUser.customerId,
    };
    console.log(requestBody);
    axios
      .put(url, requestBody, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => setPicUpdate(false))
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile-page">
      <SideNavigationPage />
      <div className="details">
        <div style={{ display: "flex" }}>
          <div>
            <h1>{labels.header}</h1>
            <p>{labels.subtext}</p>
          </div>

          {picUpdate === true ? (
            <div className="profile-photo-update">
              <input
                type="file"
                onChange={(e) => setPicImg(e.target.files[0])}
              />
              <button onClick={updateProfilePic}>{buttons.submit}</button>
            </div>
          ) : (
            <div className="profile-photo">
              <img
                src={"data:image/png;base64,"+currentUser.customerPhoto}
                alt={currentUser.firstName}
              />
              <div>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => setPicUpdate(true)}
                />
              </div>
            </div>
          )}
        </div>

        <table className="details-table">
          <tr>
            <td className="row-head">{labels.firstName}</td>

            {!updateInfo.fname ? (
              <>
                <td>{currentUser.firstName}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() =>
                      setUpdateInfo({ ...updateInfo, fname: true })
                    }
                  />
                </td>
              </>
            ) : (
              <>
                <td>
                  <input
                    onChange={(e) =>
                      setUpdatedInfo({
                        ...updatedInfo,
                        firstName: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      setUpdateInfo({ ...updateInfo, fname: false });
                      updateCustomer();
                    }}
                  >
                    {buttons.update}
                  </button>
                </td>
              </>
            )}
          </tr>
          <tr>
            <td className="row-head">{labels.lastName}</td>
            {!updateInfo.lname ? (
              <>
                <td>{currentUser.lastName}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() =>
                      setUpdateInfo({ ...updateInfo, lname: true })
                    }
                  />
                </td>
              </>
            ) : (
              <>
                <td>
                  <input
                    onChange={(e) =>
                      setUpdatedInfo({
                        ...updatedInfo,
                        lastName: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      setUpdateInfo({ ...updateInfo, lname: false });
                      updateCustomer();
                    }}
                  >
                    {buttons.update}
                  </button>
                </td>
              </>
            )}
          </tr>
          <tr>
            <td className="row-head">{labels.email} </td>
            {!updateInfo.email ? (
              <>
                <td>{currentUser.customerEmail}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() =>
                      setUpdateInfo({ ...updateInfo, email: true })
                    }
                  />
                </td>
              </>
            ) : (
              <>
                <td>
                  <input
                    onChange={(e) =>
                      setUpdatedInfo({
                        ...updatedInfo,
                        customerEmail: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      setUpdateInfo({ ...updateInfo, email: false });
                      updateCustomer();
                    }}
                  >
                    {buttons.update}
                  </button>
                </td>
              </>
            )}
          </tr>
          <tr>
            <td className="row-head">{labels.phone} </td>
            {!updateInfo.phone ? (
              <>
                <td>{currentUser.customerPhone}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() =>
                      setUpdateInfo({ ...updateInfo, phone: true })
                    }
                  />
                </td>
              </>
            ) : (
              <>
                <td>
                  <input
                    onChange={(e) =>
                      setUpdatedInfo({
                        ...updatedInfo,
                        customerPhone: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      setUpdateInfo({ ...updateInfo, phone: false });
                      updateCustomer();
                    }}
                  >
                    {buttons.update}
                  </button>
                </td>
              </>
            )}
          </tr>
          <tr>
            <td className="row-head">{labels.dob}</td>
            {!updateInfo.dob ? (
              <>
                <td>{currentUser.customerDob}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => setUpdateInfo({ ...updateInfo, dob: true })}
                  />
                </td>
              </>
            ) : (
              <>
                <td>
                  <input
                    type="date"
                    onfocus="this.showPicker()"
                    onChange={(e) =>
                      setUpdatedInfo({
                        ...updatedInfo,
                        customerDob: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      setUpdateInfo({ ...updateInfo, dob: false });
                      updateCustomer();
                    }}
                  >
                    {buttons.update}
                  </button>
                </td>
              </>
            )}
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
