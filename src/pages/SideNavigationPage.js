import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Profile.css'
import {
    faHeart,
    faHouse,
    faSuitcase,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";


const SideNavigationPage = () => {
  const labels = window.appLabels.profile;
  
  return (
    <div className='profile-page'>
        <div className="sidenav">
        <table className="sidenav-table">
          <tr>
            <td>
              <Link to="/account">
                <FontAwesomeIcon icon={faUser} />
                {labels.manageAccount}
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/bookings">
                <FontAwesomeIcon icon={faSuitcase} />
                {labels.bookingsTrips}
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/savedList">
                <FontAwesomeIcon icon={faHeart} />
                {labels.savedList}
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="#">
                <FontAwesomeIcon icon={faHouse} />
                {window.appLabels.headers.listYourProperty}
              </Link>
            </td>
          </tr>
        </table>
      </div>
      
    </div>
  )
}

export default SideNavigationPage