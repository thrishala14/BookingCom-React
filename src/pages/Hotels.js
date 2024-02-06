import React, { useEffect, useState } from "react";
import "../styles/Hotels.css";
import "../styles/SearchBar.css";
import axios from "axios";
import Cards from "../components/Cards";
import MultiRangeSlider from "multi-range-slider-react";
import useAuth from "../auth/useAuth";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { toast } from "sonner";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const Hotels = () => {
  const { currentUser } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [costSort, setCostSort] = useState("lth");
  const [place, setPlaces] = useState([
    "Seville",
    "Madrid",
    "Portugal",
    "Lisboa",
    "Praha",
    "Krakow",
    "Denmark",
  ]);
  const [placeRange, setPlaceRange] = useState([]);

  const [guests, setGuests] = useState({
    adults: 0,
    rooms: 0,
  });

  const [toDisplay, setToDisplay] = useState(true);
  const [filterPrice, setFilterPrice] = useState({
    minPrice: 6000,
    maxPrice: 40000,
  });

  const getAllHotels = () => {
    let url = `${process.env.REACT_APP_GET_ALL_HOTELS}`;
    axios.get(url).then((result) => {
      setHotels(result.data);
    });
  };
  useEffect(() => {
    getAllHotels();
  }, []);

  const modifyPage = () => {
    if (searchStr.length > 0) {
      let url = `${process.env.REACT_APP_HOTEL_CONTAINING_STR}${searchStr}`;
      axios.get(url).then((result) => setHotels(result.data));
    } else {
      getAllHotels();
    }
  };

  const handleClick = (e) => {
    setPlaceRange(place);
    if (e.target.checked === true) {
      setPlaceRange(placeRange.concat(e.target.value));
    } else if (e.target.checked === false) {
      setPlaceRange(
        placeRange.filter((i) => {
          return i !== e.target.value;
        })
      );
    }
  };

  useEffect(() => {
    if (costSort === "lth")
      if (placeRange.length > 0) {
        setFilteredHotels(
          hotels
            .filter(
              (item) =>
                placeRange.includes(item.hotelCity) &&
                item.hotelPrice <= filterPrice.maxPrice &&
                item.hotelPrice >= filterPrice.minPrice
            )
            .sort((a, b) => a.hotelPrice - b.hotelPrice)
        );
      } else {
        setFilteredHotels(
          hotels
            .filter(
              (item) =>
                item.hotelPrice <= filterPrice.maxPrice &&
                item.hotelPrice >= filterPrice.minPrice
            )
            .sort((a, b) => a.hotelPrice - b.hotelPrice)
        );
      }
    else if (costSort === "htl")
    if (placeRange.length > 0) {
      setFilteredHotels(
        hotels
          .filter(
            (item) =>
              placeRange.includes(item.hotelCity) &&
              item.hotelPrice <= filterPrice.maxPrice &&
              item.hotelPrice >= filterPrice.minPrice
          )
          .sort((a, b) => b.hotelPrice - a.hotelPrice)
      );
    } else {
      setFilteredHotels(
        hotels
          .filter(
            (item) =>
              item.hotelPrice <= filterPrice.maxPrice &&
              item.hotelPrice >= filterPrice.minPrice
          )
          .sort((a, b) => b.hotelPrice - a.hotelPrice)
      );
    }
  }, [costSort, placeRange, filterPrice]);

  return (
    <>
      <div className="search-bar">
        <h1>Where to next?</h1>
        <h2>Find exclusive Genius rewards in every corner of the world!</h2>
        <div className="search">
          <input
            placeholder="Where are you going?"
            onChange={(e) => setSearchStr(e.target.value)}
          />
          {/* <input type="date" onfocus="this.showPicker()" className="dates" />
          <strong>to</strong>
          <input type="date" onfocus="this.showPicker()" className="dates" />
          <button class="collapsible" onClick={() => setToDisplay((p) => !p)}>
            {guests.adults} Guests . {guests.rooms} rooms
          </button> */}
          <button className="search-btn" onClick={modifyPage}>
            Search
          </button>
        </div>
      </div>
      {toDisplay === false ? (
        <div class="content">
          <p>
            Adults
            <select
              onChange={(e) => setGuests({ ...guests, adults: e.target.value })}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </p>
          <p>
            Rooms{" "}
            <select
              onChange={(e) => setGuests({ ...guests, rooms: e.target.value })}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </p>
        </div>
      ) : null}

      <div style={{ display: "flex" }}>
        <div>
          <p
            style={{
              color: "black",
              fontFamily: "cursive",
              marginLeft: "2rem",
              marginBottom: "0.5rem",
              marginTop: "2rem",
            }}
          >
            <strong>Filters</strong>
          </p>

          <div className="filter-div">
            <Accordion className="place-checkbox">
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Places</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {place.map((i) => (
                    <>
                      <input
                        type="checkbox"
                        id={i}
                        value={i}
                        onChange={handleClick}
                      />
                      <label for={i}>{i}</label>
                      <br />
                    </>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion className="price-style">
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Price Range</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <MultiRangeSlider
                    barInnerColor="lightgrey"
                    thumbLeftColor=""
                    style={{
                      height: "0 !important",
                      width: "0 !important",
                      border: "none",
                      boxShadow: "none",
                    }}
                    ruler={false}
                    min={6000}
                    max={40000}
                    minValue={filterPrice.minPrice}
                    maxValue={filterPrice.maxPrice}
                    step={1000}
                    onChange={(e) => {
                      return setFilterPrice({
                        minPrice: e.minValue,
                        maxPrice: e.maxValue,
                      });
                    }}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion className="sort-filter">
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Sort By</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Select
                    size="small"
                    id="select"
                    value=""
                    className="select-sort"
                    onChange={(e) => setCostSort(e.target.value)}
                  >
                    <MenuItem value="lth">Lowest to Highest</MenuItem>
                    <MenuItem value="htl">Highest to Lowest</MenuItem>
                  </Select>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="hotel-page">
          <div className="hotel-cards">
            {hotels.length > 0 ? (
              filteredHotels.length === 0 ? (
                hotels.map((i) => <Cards h={i} className="exp-cards" />)
              ) : (
                filteredHotels.map((i) => <Cards h={i} className="exp-cards" />)
              )
            ) : (
              <h3>Sorry, No Match!!</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotels;
