import React, { useContext, useEffect,  useState } from 'react'
import SideNavigationPage from './SideNavigationPage'
import '../styles/Bookings.css'
import axios from 'axios';
import LoginContext from '../components/LoginContext';
import BookingAccordian from './BookingAccordian';

const Bookings = () => {
  const { currentUser } = useContext(LoginContext);
  const [bookingsList, setBookingsList] = useState([]);
  const [status, setStatus] = useState("all");

  useEffect(() => {
    console.log(bookingsList)
    let url = `${process.env.REACT_APP_GET_BOOKINGS}/${currentUser.customerId}`;
    axios.get(url).then((res) => {
      setBookingsList(res.data)
    });
  }, [currentUser, bookingsList]);

  return (
    <div className='bookings-display-page' >
      <SideNavigationPage/>
        <div style={{width: "95%"}}>
          <h2>Your Bookings & Trips</h2>
          <select onChange={(e)=>setStatus(e.target.value)}>
          <option value = "all">All Bookings</option>
            <option value = "upcoming">Upcoming</option>
            <option value = "cancelled">Cancelled</option>
          </select>

          {status === "all" ? 
          bookingsList.map((item) => (
            <BookingAccordian booking={item}/>
          )):
          status === "upcoming" ?
          bookingsList.filter(i=> i.bookingStatus ==="upcoming").map((item) => (
            <BookingAccordian booking={item}/>
          )) : 
          bookingsList.filter(i=> i.bookingStatus ==="cancelled").map((item) => (
            <BookingAccordian booking={item}/>
          ))}
      </div>
    </div>
  )
}

export default Bookings