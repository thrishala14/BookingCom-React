import React from "react";
import "../styles/PropertyTypeBanner.css";
import Carousel from "react-multi-carousel";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { grey } from "@mui/material/colors";

const PropertyTypeBanner = () => {
  const propertyTypes = [
    {
      type: "Hotels",
      img: "https://www.ahstatic.com/photos/8838_rov1c_00_p_1024x768.jpg",
    },
    {
      type: "Apartments",
      img: "https://th.bing.com/th/id/OIP.Bz9G2LIf3QpFhdx2BfUykAAAAA?rs=1&pid=ImgDetMain",
    },
    {
      type: "Resorts",
      img: "https://th.bing.com/th/id/OIP.LuGS7Jrf2x69YQAIk35f1wHaFA?rs=1&pid=ImgDetMain",
    },
    {
      type: "Villas",
      img: "https://th.bing.com/th/id/OIP.MwW3LMCI9ZM9rj2sqweYjQHaFV?rs=1&pid=ImgDetMain",
    },
    {
      type: "Cabins",
      img: "https://th.bing.com/th/id/OIP.AzdlQxkLoUCuqOHvuixgIQHaFS?rs=1&pid=ImgDetMain",
    },
    {
      type: "Cottages",
      img: "https://th.bing.com/th/id/R.514d986d17b2c7a8ab8874f4a3b607fb?rik=vHn4N%2bXlH6K3cw&riu=http%3a%2f%2fcdn.homesthetics.net%2fwp-content%2fuploads%2f2014%2f06%2fDream-Cottages-for-Your-Holiday-Inspiration-homesthetics-5.jpg&ehk=XuYOpBFPP9WOyKIOEeNwXZkLkr2ehz%2fNwOkzFnfC%2fcs%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      type: "Glamping",
      img: "https://cdn.5280.com/2018/03/Glamping-Tents_-Collective-Retreats.jpg",
    },
    {
      type: "Serviced apartments",
      img: "https://servicedapartmentsbyevo.co.uk/wp-content/uploads/2018/12/download-2.jpeg",
    },
    {
      type: "Holiday homes",
      img: "https://th.bing.com/th/id/OIP.iOCcKcTqv9vM_t2ndW3f-gHaE8?rs=1&pid=ImgDetMain",
    },
    {
      type: "Guest houses",
      img: "https://th.bing.com/th/id/OIP.ydHiAfwORICOHQbmrn8U1wHaE6?rs=1&pid=ImgDetMain",
    },
    {
      type: "Hostels",
      img: "https://th.bing.com/th/id/OIP.151asy1_jvdDtbPl3aHYrwHaE8?rs=1&pid=ImgDetMain",
    },
    {
      type: "Motels",
      img: "https://th.bing.com/th/id/OIP.XliYLJtx4V3_3HBORSndiwHaFj?rs=1&pid=ImgDetMain",
    },
    {
      type: "B&Bs",
      img: "https://th.bing.com/th/id/OIP.OzC0WVji38h_itIKqX_82wHaE7?rs=1&pid=ImgDetMain",
    },
    {
      type: "Ryokans",
      img: "https://asianwanderlust.com/wp-content/uploads/2019/04/Kanazawa-Ryokan-5-%E2%80%93-Yamanoo-2-1.jpg",
    },
    {
      type: "Riads",
      img: "https://th.bing.com/th/id/OIP.DUTWhQFwtRr54Qni9jeilgHaE8?rs=1&pid=ImgDetMain",
    },
    {
      type: "Holiday parks",
      img: "https://th.bing.com/th/id/OIP.5W8BsUoaRv7hSStCIHaxVwHaE7?rs=1&pid=ImgDetMain",
    },
    {
      type: "Homestays",
      img: "https://th.bing.com/th/id/OIP.DmB3n4gRV7_-OK0Z6yvEcQHaE7?rs=1&pid=ImgDetMain",
    },
    {
      type: "Campsites",
      img: "https://th.bing.com/th/id/OIP.rYGvfCwmgsNfo7YjA9dpjwHaFj?rs=1&pid=ImgDetMain",
    },
    {
      type: "Country houses",
      img: "https://th.bing.com/th/id/OIP.VLhl_HcXDLE7tmZV0ocPPgHaE8?rs=1&pid=ImgDetMain",
    },
    {
      type: "Farm stays",
      img: "https://th.bing.com/th/id/OIP.4JKvTLUJkAw89kgZlWDAiQHaEx?rs=1&pid=ImgDetMain",
    },
    {
      type: "Boats",
      img: "https://th.bing.com/th/id/OIP.4HECgDhNUif6JABvpL6jxwHaE7?rs=1&pid=ImgDetMain",
    },
    {
      type: "Luxury tents",
      img: "https://www.thevillatent.com/villadashboard/uploads/pageimages/blogs/single/2687Ultra-Luxury-Resort-Tents.jpg",
    },
    {
      type: "Self catering accomodation",
      img: "https://www.thewightholidaycompany.co.uk/wp-content/uploads/2018/02/Self-Catering-accommodation-768x576.jpg",
    },
    {
      type: "Tiny houses",
      img: "https://th.bing.com/th/id/OIP.lT9ZtlDDswz0cqCA4KmV-QHaHa?rs=1&pid=ImgDetMain",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
  };

  const CustomRightArrow = ({ onClick }) => {
    return (
      <button className="right-arrow" onClick={() => onClick()}>
        <FaCaretRight size={25} color={grey[700]} />
      </button>
    );
  };

  const CustomLeftArrow = ({ onClick }) => {
    return (
      <button className="left-arrow" onClick={() => onClick()}>
        <FaCaretLeft size={25} color={grey[700]} />
      </button>
    );
  };

  return (
    <div className="property-type-banner">
      <h2>Browse by property type</h2>
      <Carousel
        responsive={responsive}
        slidesToSlide={1}
        autoPlay={true}
        infinite = {true}
        // customRightArrow={<CustomRightArrow />}
        // customLeftArrow={<CustomLeftArrow />}
      >
        {propertyTypes.map((item) => {
          return (
            <div>
              <Card>
                <CardMedia
                  component="img"
                  height="194"
                  image={item.img}
                  alt={item.type}
                />
                <CardContent>
                  <Typography
                    variant="p"
                    color="text.primary"
                    className="hotel-name"
                  >
                    {item.type}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default PropertyTypeBanner;
