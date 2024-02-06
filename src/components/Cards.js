import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Cards.css";
import { NumericFormat } from "react-number-format";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import useAuth from "../auth/useAuth";
import { Chip } from "@mui/material";
import { blue } from "@mui/material/colors";

const Cards = (props) => {
  const [imageUrl, setImageUrl] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_GET_IMAGE}/${props.h.hotelId}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => setImageUrl(res.data));
  }, [props]);

  const infoPage = () => {
    navigate("/hotelInfo", { state: { hotel: props, img: imageUrl } });
  };

  return (
    <>
      <Card onClick={infoPage}>
        {imageUrl.length > 0 ? (
          <Card.Img variant="top" src={imageUrl[0].hotelImage} />
        ) : null}
        <Card.Body style={{ paddingLeft: "0.5rem" }}>
          <Card.Title>
            <strong>{props.h.hotelName}</strong>
          </Card.Title>
          <Card.Text>{props.h.hotelAddress}, {props.h.hotelCity}</Card.Text>
          <p className="reviews"><Chip label="8.8" size="small" /> Fabulous . 533 reviews</p>
          <p className="card-price">
            <span>Starting at </span><MdOutlineCurrencyRupee />{" "}
            <NumericFormat
            className="amount"
              value={props.h.hotelPrice.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
            />
          </p>
          
        </Card.Body>
      </Card>
    </>
  );
};

export default Cards;
