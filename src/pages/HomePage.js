import React from "react";


import bglr from "../images/bglr.jpg";
import mumbai from "../images/mumbai.jpg";
import jaipur from "../images/jaipur.jpg";
import delhi from "../images/india-delhi-humayuns-tomb.jpg";
import chennai from "../images/chennai.jpg";
import "../styles/Home.css";
import useAuth from "../auth/useAuth";
import Offers from "../components/Offers";
import PropertyTypeBanner from "../components/PropertyTypeBanner";


const HomePage = () => {
  // const [hotels, setHotels] = useState([]);
  
  const {currentUser} = useAuth();
  // useEffect(() => {
  //   let url = `${process.env.REACT_APP_GET_ALL_HOTELS}`;
  //   axios.get(url).then((result) => setHotels(result.data));
  // }, []);

  return (
    <div style={{ marginLeft: "2rem" }} className="homePageClass">
    <Offers/>
    <PropertyTypeBanner/>
    <div className="home-tags">
      <h2>Trending Destinations</h2>
      <p>Most popular choices for travelers from India</p></div>
      <div className="trending-loc">
        <div className="container">
          <img src={delhi} id="delhi" alt = "delhi"/>
          <div className="top-left">
            <h2>New Delhi</h2>
          </div>
        </div>

        <div className="container">
          <img src={bglr} id="bglr" alt = "bglr"/>
          <div className="top-left">
            <h2>Bangalore</h2>
          </div>
        </div>
      </div>
      <div className="abc">
        <div className="container">
          <img src={jaipur} id="jaipur" alt = "jaipur"/>
          <div className="top-left">
            <h2>Jaipur</h2>
          </div>
        </div>

        <div className="container">
          <img src={mumbai} id="mumbai" alt = "mumbai"/>
          <div className="top-left">
            <h2>Mumbai</h2>
          </div>
        </div>

        <div className="container">
          <img src={chennai} id="chennai" alt = "chennai"/>
          <div className="top-left">
            <h2>Chennai</h2>
          </div>
        </div>
      </div>
      {/* <div>
        <h3>Home guests Love</h3>
        <div className="hotels">
          {hotels.map((i) => (
            <Cards
              name={i.hotelName}
              addr={i.hotelCity}
              price={i.hotelPrice}
              idNo = {i.hotelId}
            />
          ))}
        </div>
      </div> */}
      <div className="footer-banner">
        <div className="left-footer-banner">{" "}</div>
        <div className="middle-footer-banner">
          <span>{currentUser.firstName}, find</span>
          <span className="list-banner">
            <ul>
              <li>apartments</li>
              <li>villas</li>
              <li>aparthotels</li>
              <li>holiday homes</li>
              <li>cottages</li>
              <li>homes</li>
              <li>apartments</li>
            </ul>
          </span>
          <span>for your next trip</span>
        </div>
        <div className="right-footer-banner">
          <img src= "https://th.bing.com/th/id/OIP.5YXNxTAcR4QWIBRhBhWZXAHaEx?rs=1&pid=ImgDetMain" alt = "banner"/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
