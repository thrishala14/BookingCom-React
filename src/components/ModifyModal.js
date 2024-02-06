import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import "../styles/ModifyModal.css";
import axios from "axios";
import { toast } from "sonner";
import swal from "sweetalert";

const ModifyModal = ({ hotel, imgs, state }) => {
  const initialImgs = imgs;
  const [imgNew, setImgNew] = useState(0);

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_IMAGE":
        return state.map((i) => {
          console.log(i.hotelImageId, action.id);
          if (i.hotelImageId === action.id) {
            console.log("abc");
            return { ...i, hotelImage: action.payload };
          } else {
            return i;
          }
        });
      case "DELETE_IMAGE": 
        return  swal({
          title: "Are you sure you want to delete this image",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            axios.delete(process.env.REACT_APP_DELETE_HOTEL_IMAGE+action.id)
            .then(()=>(toast.success("deleted image"), setOpen(false)))
          }
          else{
            swal("Image Not Deleted!")
          }})
      case "ADD_NEW_IMAGE": 
          return axios.post(process.env.REACT_APP_ADD_HOTEL_IMAGE, {
            hotelDto: {hotelId: hotel.hotelId},
            hotelImage: action.payload
          } ).then(r=>(toast.success("New Image Added"),setOpen(false)))
      case "DELETE_NEW_IMAGE":
        return setImgNew(a=>a-1)
      default:
        return state;
    }
  };
  const [images, dispatch] = useReducer(reducer, initialImgs);

  const [newHotel, setNewHotel] = useState({
    hotelId: hotel.hotelId,
    hotelName: hotel.hotelName,
    hotelAddress: hotel.hotelAddress,
    hotelCity: hotel.hotelCity,
    hotelRooms: hotel.hotelRooms,
    hotelPrice: hotel.hotelPrice,
  });


  const { setOpen } = state;

  const modify = () => {
    let url = process.env.REACT_APP_MODIFY_HOTEL;
    const reqBody = {
      hotelId: newHotel.hotelId,
      hotelName: newHotel.hotelName,
      hotelAddress: newHotel.hotelAddress,
      hotelCity: newHotel.hotelCity,
      hotelRooms: newHotel.hotelRooms,
      hotelPrice: newHotel.hotelPrice,
      images: images,
    };
    
    console.log(reqBody);
    axios
      .put(url, reqBody, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => toast.success("Modified Hotel"))
      .catch((err) => alert("error"));
    setOpen(false);
  };

  return (
    
    <form className="modify-modal-form" onSubmit={(e) => e.preventDefault()}>
      <h2>Modify Hotel - ID : {hotel.hotelId}</h2>
      <TextField
        variant="outlined"
        name="hotelName"
        label="Hotel Name"
        defaultValue={hotel.hotelName}
        onChange={(e) =>
          setNewHotel({ ...newHotel, hotelName: e.target.value })
        }
      />
      <TextField
        variant="outlined"
        name="hotelAddress"
        label="Address"
        type="text"
        defaultValue={hotel.hotelAddress}
        onChange={(e) =>
          setNewHotel({ ...newHotel, hotelAddress: e.target.value })
        }
      />
      <TextField
        variant="outlined"
        name="hotelCity"
        label="Hotel City"
        defaultValue={hotel.hotelCity}
        onChange={(e) =>
          setNewHotel({ ...newHotel, hotelCity: e.target.value })
        }
      />
      <TextField
        variant="outlined"
        name="hotelPrice"
        label="Price"
        type="number"
        defaultValue={hotel.hotelPrice}
        onChange={(e) =>
          setNewHotel({ ...newHotel, hotelPrice: e.target.value })
        }
      />
      <TextField
        variant="outlined"
        name="hotelRooms"
        type="number"
        label="Total Room"
        defaultValue={hotel.hotelRooms}
        onChange={(e) =>
          setNewHotel({ ...newHotel, hotelRooms: e.target.value })
        }
      />
      {imgs.map((i) => {
        return (
          <>
            <TextField
              variant="outlined"
              name="images"
              label="Upload Hotel Image"
              type="url"
              defaultValue={i.hotelImage}
              onChange={(e) =>
                dispatch({
                  type: "ADD_IMAGE",
                  id: i.hotelImageId,
                  payload: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <RxCross1
                      style={{ cursor: "pointer" }}
                      color="red"
                      onClick={() => dispatch({
                        type: "DELETE_IMAGE",
                        id: i.hotelImageId
                      })}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      })}

      {[...Array(imgNew)].map((i) => {
        return (
          <>
            <TextField
              variant="outlined"
              name="images"
              label="Upload Hotel Image"
              type="url"
              onChange={(e) =>
                dispatch({
                  type: "ADD_NEW_IMAGE",
                  payload: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <RxCross1
                      style={{ cursor: "pointer" }}
                      color="red"
                      onClick={() => dispatch({
                        type: "DELETE_NEW_IMAGE"
                      })}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      })}
      <Button type="submit" onClick={()=>setImgNew(a=>a+1)}>
        {window.appLabels.buttons.addImg}
      </Button>
      <Button type="submit" onClick={modify}>
        {window.appLabels.buttons.submit}
      </Button>
    </form>
  );
};

export default ModifyModal;
