import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../styles/HotelImageNav.css'

const HotelImageNav = (props) => {
 

  return (
    <>
        <Carousel  axis = 'vertical' showStatus= {false} showIndicators= {false} showArrows= {false} >
            {props.img.map((item)=>{
              return <div> 
                    <img src={item.hotelImage} />
                </div>
            })}
        </Carousel>

    </>
  )
}

export default HotelImageNav