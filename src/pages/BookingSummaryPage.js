import React, { useContext, useEffect, useState } from "react";
import "../styles/BookingSummaryPage.css";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { green, grey, yellow } from "@mui/material/colors";
import moment from "moment/moment";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import LoginContext from "../components/LoginContext";
import { TiTick } from "react-icons/ti";
import { GoClockFill } from "react-icons/go";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { toast } from "sonner";
import logo from '../images/booking-com.jpg';

const BookingSummaryPage = () => {
  const location = useLocation();
  const [diffDate, setDiffDate] = useState(0);
  const { currentUser } = useContext(LoginContext);
  const labels = window.appLabels;
  const [Razorpay] = useRazorpay();

  const handlePayment = async() =>{
    const options = {
      key: "rzp_test_CWpizXcUOhqswA", 
      amount: location.state.info.hotel.hotelPrice * diffDate * location.state.rooms*100,  
      currency: "INR",
      name: "Booking.com",
      description: "Payment",
      image: logo,
      handler: function (response) {
        console.log(response);
        addToBookings();
      },
      prefill: {
        name: currentUser.firstName + currentUser.lastName,
        email: currentUser.customerEmail,
        contact: currentUser.customerPhone,
      },
      notes: {
        address: "Bangalore",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      console.log(response)
    });


    rzp1.open();
  }

  const addToBookings = async() => {
    if (Object.keys(currentUser).length === 0) {
      toast.error(labels.toastError.loginError);
    } else {
      let url = `${process.env.REACT_APP_RESERVE}`;
      const requestBody = {
        customer: {
          customerId: currentUser.customerId
        },
        hotel: location.state.info.hotel,
        checkIn: location.state.info.dates.checkin,
        checkOut: location.state.info.dates.checkout,
        noOfRooms: location.state.rooms,
        roomType: location.state.info.roomType,
        totalPrice:
          location.state.info.hotel.hotelPrice *
          diffDate *
          location.state.rooms,
        bookingStatus: "upcoming",
        bookedAtDate: new Date().toLocaleDateString("sv-SE"),
      };

      const mailBody = {
        "recipient": currentUser.customerEmail,
        "msgBody": `Hey ${currentUser.firstName},\n\nWe’re happy to host you!
        \nThis email is to confirm your successful reservation at ${location.state.info.hotel.hotelName} on ${location.state.info.dates.checkin} 
        \nReservation details:
        \n\tTotal Amount: Rs. ${location.state.info.hotel.hotelPrice *
          diffDate *
          location.state.rooms}
        \n\tCheck-in date and time: ${location.state.info.dates.checkin} at 12:00pm
        \n\tCheck-out date and time: ${location.state.info.dates.checkout} at 11:00 am
        \n\tFor any questions, call us at +91-9740258381.
        \nBest regards, \n Thrishala`,
        "subject": "Booking Confirmation",
      };

      let urlRooms = `${process.env.REACT_APP_UPDATE_AVAIL_ROOMS_REMOVE}id=${location.state.info.hotel.hotelId}&rooms=${location.state.rooms}`;
      console.log(urlRooms);
      axios
        .put(urlRooms, null, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) =>
          axios
            .post(url, requestBody, {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
              },
            })
            .then(
              (res) => (
                toast.success(window.appLabels.toastSuccess.roomReserved),
                console.log(mailBody),
                axios.post(process.env.REACT_APP_SEND_MAIL, mailBody, {
                  headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                  }
                }).catch(e=>console.log(e))
              )
            )
            .catch((err) => toast.error(err.response.data))
        )
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    const newStartDate = new Date(location.state.info.dates.checkin);
    const newEndDate = new Date(location.state.info.dates.checkout);
    setDiffDate(moment(newEndDate).diff(newStartDate, "days"));
    console.log(location.state.info);
  }, [location.state.info]);

  return (
    <div className="booking-confirmation">
      <div style={{ width: "25%" }}>
        <div className="hotel-information">
          <span>
            Hotel <FaStar color={yellow[600]} /> <FaStar color={yellow[600]} />
          </span>
          <h4>{location.state.info.hotel.hotelName}</h4>
          <p>
            {location.state.info.hotel.hotelAddress},{" "}
            {location.state.info.hotel.hotelCity}
          </p>
          <span style={{ color: "green" }}>Excellent Location - 10</span>
        </div>
        <div className="booking-information">
          <h4 style={{ paddingBottom: "1rem", paddingTop: "1rem" }}>
            Your booking details
          </h4>
          <table>
            <tr>
              <th>Check-in</th>
              <th>Check-out</th>
            </tr>
            <tr>
              <td style={{ borderRight: "0.5pt grey solid" }}>
                {location.state.info.dates.checkin}
                <br />
                <p>From 12:00</p>
              </td>
              <td>
                {location.state.info.dates.checkout}
                <br />
                <p>Until 11:00</p>
              </td>
            </tr>
          </table>
          <h4>Your total length of stay</h4>
          <p style={{ marginLeft: "1rem", color: "black", fontWeight: "200" }}>
            {diffDate} days
          </p>

          <hr color={grey[300]} />
          <h4>You Selected</h4>
          <p style={{ marginLeft: "1rem", color: "black", fontWeight: "200" }}>
            {location.state.rooms} rooms for {location.state.info.guests} guests
          </p>
        </div>
        <div className="price-summary">
          <h4>Your price summary</h4>
          <div>
            <h2 style={{ color: "black", paddingLeft: "0" }}>Price</h2>
            <div style={{ justifyContent: "right" }}>
              <h2
                style={{
                  color: "black",
                  margin: "0",
                  padding: "0",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <MdOutlineCurrencyRupee />{" "}
                {location.state.info.hotel.hotelPrice *
                  diffDate *
                  location.state.rooms}
              </h2>
              <span style={{ color: "grey" }}>
                +<MdOutlineCurrencyRupee />
                175 taxes and charges
              </span>
            </div>
          </div>
          <h4>Price Information</h4>
          <p style={{ fontSize: "small" }}>
            <GiMoneyStack /> Excludes ₹ 175 in taxes and charges
          </p>
        </div>
      </div>
      <div style={{ width: "75%" }}>
        <div className="signed-in">
          <div>
            <img src={"data:image/png;base64,"+currentUser.customerPhoto} alt={currentUser.firstName} />
          </div>
          <div>
            <h3>You are signed in</h3>
            <p> {currentUser.customerEmail}</p>
          </div>
        </div>
        <div className="customer-information">
          <h3>Enter your details</h3>
          <form>
            <div style={{ display: "flex" }}>
              <div>
                <label>First Name: </label>
                <br />
                <input defaultValue={currentUser.firstName} />
              </div>

              <div>
                <label>Last Name: </label>
                <br />
                <input defaultValue={currentUser.lastName} />
              </div>
            </div>
            <br />
            <label>Email: </label>
            <br />
            <input type="email" defaultValue={currentUser.customerEmail} />
            <p>Confirmation email goes to this address</p>
            <br />
            <label>Phone: </label>
            <br />
            <input defaultValue={currentUser.customerPhone} />
            <p>Needed by the property to validate your booking</p>
          </form>
          <hr color={grey[200]} />
          <h4>Who are you booking for?</h4>
          <input type="radio" value={true} name="book" defaultChecked= {true}/>
          <label>Booking for myself</label>
          <br />
          <input type="radio" value={false} name="book" />
          <label>Booking for someone else</label>
        </div>
        <div className="arrival-time">
          <h3>Your arrival time</h3>
          <p>
            <TiTick color={green[900]} />
            Your room will be ready for check-in between 12:00 and 12:00
          </p>
          <p>
            <GoClockFill color={green[900]} />
            24-hour front desk - Help whenever you need it!
          </p>
        </div>
        <div className="confirm-booking">
          <button onClick={handlePayment}>Next: Final Details</button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryPage;
