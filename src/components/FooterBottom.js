import React from 'react'
import '../styles/FooterBottom.css'
import agoda from '../images/agoda.jpg';
import booking from '../images/booking-com.jpg';
import kayak from '../images/kayak.png';
import opentable from '../images/opentable.jpg';
import priceline from '../images/priceline.jpg';
import rentalcars from '../images/rentalcars.png';

const FooterBottom = () => {
  const footerLabel = window.appLabels.footer
  return (
    <>
        <div className='copyright'>{footerLabel.copyright}</div>
        <div className='footer-bottom'>{footerLabel.footerText}</div>
        <div className='footer-images'>
            <img src = {agoda} alt = "agoda"></img>
            <img src = {booking} alt = "booking"></img>
            <img src = {kayak} alt = "kayuk"></img>
            <img src = {opentable} alt = "opentable"></img>
            <img src = {priceline} alt = "priceline"></img>
            <img src={rentalcars} alt = "rentalcars"></img>
        </div>
    </>
  )
}

export default FooterBottom