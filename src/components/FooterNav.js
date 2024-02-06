import React from 'react'
import '../styles/FooterNav.css'

const FooterNav = () => {
  const staticLabels = window.appLabels;
  return (
    <>
      <div className='footer-one'>
        <button>{staticLabels.headers.listYourProperty}</button>
      </div>
      <div className='footer-two'>
        <a>{staticLabels.footers.mobileVersion}</a>
        <a>{staticLabels.footers.manageBookings}</a>
        <a>{staticLabels.headers.contactCustomerService}</a>
        <a>{staticLabels.footers.affiliate}</a>
        <a>{staticLabels.footers.business}</a>
      </div>
    </>
  )
}

export default FooterNav