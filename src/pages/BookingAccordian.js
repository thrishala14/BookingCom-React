import React, { useState } from "react";
import "../styles/Accordian.css";
import { FaPlus, FaMinus } from "react-icons/fa6";
import axios from "axios";
import swal from "sweetalert";
import { toast } from "sonner";

const BookingAccordian = ({ booking }) => {
  const [toggle, setToggle] = useState(false);

  const toggleFun = () => {
    setToggle((b) => !b);
  };

  const modifyBooking = () => {
    alert("mod");
    console.log("modify");
  };

  const cancelBooking = () => {
    swal({
      title: "Are you sure?",
      text: "Once cancelled, you will not be able to recover your booking!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let url = `${process.env.REACT_APP_CANCEL_BOOKING}${booking.bookingsId}`;
        let urlRoom = `${process.env.REACT_APP_UPDATE_AVAIL_ROOMS_ADD}id=${booking.hotel.hotelId}&rooms=${booking.noOfRooms}`;
        axios
          .put(urlRoom, null, {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then((res) =>
            axios
              .put(url, null, {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Headers": "*",
                  "Access-Control-Allow-Origin": "*",
                },
              })
              .then((res) =>
                swal("Your booking is cancelled!", {
                  icon: "success",
                })
              )
          )
          .catch((err) => toast.error(err.response.data));
      } else {
        swal("Booking not cancelled!");
      }
    });
  };

  return (
    <div>
      <button className="accordion" onClick={toggleFun}>
        <p>
          
          {booking.hotel.hotelName}{" "}
          {booking.bookingStatus === "upcoming" ? (
            <span className="badge badge-upcoming">
              {booking.bookingStatus}
            </span>
          ) : (
            <span className="badge badge-cancelled">
              {booking.bookingStatus}
            </span>
          )}
        </p>{" "}
        <p>{toggle ? <FaMinus /> : <FaPlus />}</p>
      </button>
      {toggle ? (
        <div className="panel">
          <div>
          Booking ID: {booking.bookingsId}
            <p>
              {booking.hotel.hotelAddress}, {booking.hotel.hotelCity}
            </p>
            <p>Total Price : Rs. {booking.totalPrice}</p>
            <p>
              {booking.noOfRooms} {booking.roomType} room(s)
            </p>
          </div>

          <table>
            <thead>
              <th>Check-in</th>
              <th>Check-out</th>
            </thead>
            <tbody>
              <tr>
                <td style={{ borderRight: "0.5pt grey solid" }}>
                  {booking.checkIn}
                  <br />
                  <p>From 12:00</p>
                </td>
                <td>
                  {booking.checkOut}
                  <br />
                  <p>Until 11:00</p>
                </td>
              </tr>
              {booking.bookingStatus === "upcoming" ? (
                <tr>
                  
                  <td>
                    <button
                      style={{ backgroundColor: "red" }}
                      onClick={cancelBooking}
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default BookingAccordian;
