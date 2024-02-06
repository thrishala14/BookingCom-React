import React from 'react'
import '../styles/NavHeader.css'
import { Link } from 'react-router-dom'
import { IoBedOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoCarOutline } from "react-icons/io5";
import { MdOutlineAttractions } from "react-icons/md";
import { MdOutlineAirportShuttle } from "react-icons/md";

const NavHeader = () => {
  const labels = window.appLabels.navHeader
  return (
    <div className='nav-header'>
        <ul>
            <li><button><Link to = '/'><IoBedOutline/>{labels.home}</Link></button></li>
            <li><button><Link to = '/hotels'><GoHome/>{labels.hotel}</Link></button></li>
            <li><button><IoCarOutline/>{labels.carRental}</button></li>
            <li><button><MdOutlineAttractions/>{labels.attraction}</button></li>
            <li><button><MdOutlineAirportShuttle/>{labels.airportTaxi}</button></li>
        </ul>
    </div>
  )
}

export default NavHeader