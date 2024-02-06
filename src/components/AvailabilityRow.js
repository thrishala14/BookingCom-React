import React, { useContext, useState } from "react";

import { BiSolidUser } from "react-icons/bi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { PiBowlFoodThin, PiBedLight } from "react-icons/pi";
import { IoBedOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LoginContext from "./LoginContext";
import { toast } from "sonner";


const AvailabilityRow = (props) => {
  const staticLabels = window.appLabels;
  const navigate = useNavigate();
  const labels = window.appLabels.availability;
  const [rooms, setRooms] = useState(1);
  const { currentUser } = useContext(LoginContext);
  

  const confirmBooking = () => {
    if (Object.keys(currentUser).length === 0) {
      toast.error(staticLabels.toastErrors.notLoggedInError);
    } else {
      if (props.dates.checkin === null || props.dates.checkout === null) {
        toast.error(staticLabels.toastErrors.dateError);
      } else {
        navigate("/bookingConfirmation", {
          state: { info: props, rooms: rooms },
        });
      }
    }
  };

  return (
    <tr>
      {props.roomType === "double" ? (
        <td>
          <h2>{labels.doubleRoom}</h2> <br /> {labels.dRoomText} <IoBedOutline />
        </td>
      ) : (
        <td>
          <h2>{labels.singleRoom}</h2> <br /> {labels.sRoomText} <PiBedLight />
        </td>
      )}
      <td>
        {props.guests === 2 ? (
          <>
            <BiSolidUser />
            <BiSolidUser />
          </>
        ) : (
          <BiSolidUser />
        )}
      </td>
      <td>
        <MdOutlineCurrencyRupee /> {props.price} <br />{" "}
        <span className="extra-charge">
          +<MdOutlineCurrencyRupee />
          {labels.taxes}
        </span>
      </td>
      <td>
        {props.breakfast ? (
          <span className="breakfast">
            {" "}
            <PiBowlFoodThin /> {staticLabels.bookings.breakfast}
          </span>
        ) : null}
        <ul>
          <li>
            {labels.cancellation}
          </li>
          <li>
            {labels.prepayment}
          </li>
          <li>
            {labels.discount}
          </li>
        </ul>
      </td>
      <td>
        <select onChange={(e) => setRooms(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <option value={i}>
              {i} {"     "} (Rs. {i * props.price})
            </option>
          ))}
        </select>
      </td>
      <td>
            {props.hotel.hotelRooms > 0 ?
        <button onClick={confirmBooking}>{staticLabels.bookings.reserveRooms}</button> :
        <button disabled style={{backgroundColor:"grey"}}>{staticLabels.bookings.reserveRooms}</button> }
      </td>
    </tr>
  );
};

export default AvailabilityRow;
