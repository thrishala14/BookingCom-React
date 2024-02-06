import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import { NumericFormat } from 'react-number-format';

const BookingsCard = ({booking}) => {

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    console.log("bookings card")
    axios
      .get(`${process.env.REACT_APP_GET_IMAGE}/${booking.hotel.hotelId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => setImageUrl(res.data.hotelImage));
  }, [booking]);



  return (
    <div className="bookings-card">
    <Card>
    <div style={{display:"flex"}}>
      <Card.Img src={imageUrl} variant="top" />
      <Card.Body style={{ paddingLeft: "0.5rem" }}>
      <div className="head">
        <h2>{booking.hotel.hotelName}</h2>

        <p className="address">
          {booking.hotel.hotelAddress}, {booking.hotel.hotelCity}
        </p>
        </div>
        <div className="price">
          <p className="subscript">1 night, 2 adults</p>
          <p className="amount">
            <MdOutlineCurrencyRupee /> 
            <NumericFormat value={booking.hotel.hotelPrice.toFixed(2)} displayType={'text'} thousandSeparator={true}/>
          </p>
        </div>
      </Card.Body>
      </div>
    </Card>
  </div>
  )
}

export default BookingsCard