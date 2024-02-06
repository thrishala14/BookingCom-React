import React from "react";
import "../styles/Offers.css";
import Carousel from "react-multi-carousel";
import { Button, Card, CardActions, Typography } from "@mui/material";

const Offers = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
  };

  return (
    <div className="offers">
      <h2>Offers</h2>
      <p>Promotions, deals and special offers for you</p>
      <Carousel responsive={responsive} slidesToSlide={2} autoPlay={true} transitionDuration={5000} >
        <div style={{width: "34rem"}}>
          <Card variant="outlined">
            <div style={{ display: "flex" }}>
              <div>
                <Typography variant="h5" component="div">
                  Take your longest holiday yet
                </Typography>
                <Typography variant="p">
                  Browse properties offering long-term stays, many at reduced
                  monthly rates.
                </Typography>
                <CardActions>
              <Button size="small">Find a Stay</Button>
            </CardActions>
              </div>
              <div>
                <img src="https://th.bing.com/th/id/OIP.ziKozwHXn15NXFAGyQkDUQHaE8?w=233&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" />
              </div>
            </div>

            
          </Card>
        </div>
        <div style={{width: "34rem"}}>
          <Card variant="outlined">
            <div style={{ display: "flex" }}>
              <div>
                <Typography variant="h5" component="div">
                  Fly away to your dream holiday
                </Typography>
                <Typography variant="p">
                  Get inspired, compare and book flights with more flexibility
                </Typography>
                <CardActions>
              <Button size="small">Search for Flights</Button>
            </CardActions>
              </div>
              <div>
                {" "}
                <img src= "https://p3d.in/static/uploads/50531/image-27dc498856.png" />
              </div>
            </div>

            
          </Card>
        </div>
        <div style={{width: "34rem"}}>
          <Card variant="outlined" style={{backgroundColor: "black"}}>
            <div style={{ display: "flex" }}>
              <div>
                <Typography variant="h5" component="div" color={"white"}>
                  New year, new adventures
                </Typography>
                <Typography variant="p" color={"white"}>
                  Save 15% or more when you book and stay before 1 April 2024
                </Typography>
                <CardActions>
              <Button size="small">Find Early 2024 Deals</Button>
            </CardActions>
              </div>
              <div>
                <img src="https://static.capitalgroup.com/content/dam/cgc/shared-content/images/uncategorized/esg/esg-perspectives/ESG-Storefront-hero-642x418.jpg" />
              </div>
            </div>

            
          </Card>
        </div>
      </Carousel>
    </div>
  );
};

export default Offers;
