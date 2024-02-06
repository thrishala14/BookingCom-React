import React, { useEffect, useState } from "react";
import "../styles/Availability.css";
import AvailabilityRow from "./AvailabilityRow";
import { toast } from "sonner";

const Availablity = ({ hotel }) => {

    const today = new Date().toISOString().split("T")[0];
    const [dates, setDates] = useState({
        checkin: null,
        checkout:null,
    })

    useEffect(()=>{
      if(dates.checkin>dates.checkout){
        toast.error(window.appLabels.toastErrors.checkOutDateError)
        setDates({...dates, checkout: new Date(+new Date(dates.checkin) +86400000).toISOString().split("T")[0]});
      }
    }, [dates])
    
    const tmrw = new Date(+new Date(dates.checkin) +86400000).toISOString().split("T")[0];

  return (
    <div className="hotel-availability">
      <h2>Availablity</h2>
      <div className="search-bar-availability">
        <input type="date" className="dates" defaultValue={today} min={today} onChange={(e)=>setDates({...dates, checkin: e.target.value})}/>
        <strong>to</strong>
        <input type="date" value = { dates.checkout} className="dates" min={tmrw} onChange={(e)=>setDates({...dates, checkout: e.target.value})}/>
       
      </div>
      <table>
        <thead>
          <th style={{ width: "14rem" }}>Room Type</th>
          <th style={{ width: "8.5rem" }}>Number of guests</th>
          <th style={{ width: "9rem" }}>Today's Price</th>
          <th style={{ width: "17rem" }}>Your choices</th>
          <th style={{ width: "7rem" }}>Select Rooms</th>
          <th style={{ width: "15rem" }}>Reserve</th>
        </thead>
        <AvailabilityRow roomType = "double" guests = {2} price = {hotel.hotelPrice} breakfast = {false}  hotel = {hotel} dates = {dates}/>
        <AvailabilityRow roomType = "double" guests = {2} price = {hotel.hotelPrice + 200} breakfast = {true} hotel = {hotel} dates = {dates}/>
        <AvailabilityRow roomType = "double" guests = {1} price = {hotel.hotelPrice - 500} breakfast = {false}  hotel = {hotel} dates = {dates}/>
        <AvailabilityRow roomType = "double" guests = {1} price = {hotel.hotelPrice -300} breakfast = {true}  hotel = {hotel} dates = {dates}/>
        <AvailabilityRow roomType = "single" guests = {1} price = {hotel.hotelPrice*0.7} breakfast = {false}  hotel = {hotel} dates = {dates}/>
        <AvailabilityRow roomType = "single" guests = {1} price = {hotel.hotelPrice*0.7 +200} breakfast = {true}  hotel = {hotel} dates = {dates}/>
        
      </table>
    </div>
  );
};

export default Availablity;
