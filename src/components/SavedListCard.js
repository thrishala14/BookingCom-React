import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../styles/SavedListCard.css";
import { FiXCircle } from "react-icons/fi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

const SavedListCard = ({ h }) => {
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    
    axios
      .get(`${process.env.REACT_APP_GET_IMAGE}/${h.hotel.hotelId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => setImageUrl(res.data));
  }, []);

  const deleteHotel = () => {
    console.log(h.savedListId);
    axios
      .delete(`${process.env.REACT_APP_DELETE_FROM_SAVED_LIST}${h.savedListId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => toast.info("Removed from saved list"));
  };

  return (
    <div className="saved-list-card">
      <Card>
        <div style={{ display: "flex" }}>
          {imageUrl.length > 0 ? (
            <Card.Img src={imageUrl[0].hotelImage} variant="top" />
          ) : null}
          <Card.Body style={{ paddingLeft: "0.5rem" }}>
            <div className="head">
              <h2>{h.hotel.hotelName}</h2>

              <p className="address">
                {h.hotel.hotelAddress}, {h.hotel.hotelCity}
              </p>
            </div>
            <div className="price">
              <p className="subscript">1 night, 2 adults</p>
              <p className="amount">
                <MdOutlineCurrencyRupee />
                {/* {h.hotel.hotelPrice} */}
                <NumericFormat
                  value={h.hotel.hotelPrice.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </p>
            </div>
          </Card.Body>
        </div>
        <FiXCircle
          style={{ margin: "0.5rem", fontSize: "1.5rem" }}
          onClick={deleteHotel}
        />
      </Card>
    </div>
  );
};

export default SavedListCard;
