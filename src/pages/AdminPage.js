import React, { useState } from "react";
import "../styles/Admin.css";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import { RxCross1 } from "react-icons/rx";

const AdminPage = () => {
  const [str, setStr] = useState("");
  const [numOfImg, setNumOfImg] = useState(1);
  const [newHotel, setNewHotel] = useState({
    hotelName: "",
    hotelAddress: "",
    hotelCity: "",
    hotelRooms: 0,
    hotelPrice: 0,
    images: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name !== "images") {
      setNewHotel({
        ...newHotel,
        [name]: value,
      });
    } else {
      setNewHotel({
        ...newHotel,
        images: newHotel.images.concat({ hotelImage: value }),
      });
    }
  }

  function submitHotel(e) {
    e.preventDefault();
    let url = `${process.env.REACT_APP_ADMIN_SAVE_HOTEL}`;
    axios
      .post(url, newHotel, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => toast.success(window.appLabels.toastSuccess.addHotel));
  }

  return (
    <div className="admin">
      <h2>Admin Page</h2>
      <form onSubmit={(e) => submitHotel(e)}>
        <TextField
          variant="outlined"
          name="hotelName"
          label="Hotel Name"
          required
          onChange={(e) => handleChange(e)}
        />
        <TextField
          variant="outlined"
          name="hotelAddress"
          label="Address"
          type="text"
          required
          onChange={(e) => handleChange(e)}
        />
        <TextField
          variant="outlined"
          name="hotelCity"
          label="Hotel City"
          required
          onChange={(e) => handleChange(e)}
        />
        <TextField
          variant="outlined"
          name="hotelPrice"
          label="Price"
          type="number"
          required
          InputProps={{
            startAdornment: <InputAdornment position="start">Rs. </InputAdornment>,
          }}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          variant="outlined"
          name="hotelRooms"
          type="number"
          label="Total Room"
          required
          onChange={(e) => handleChange(e)}
        />
        {[...Array(numOfImg)].map(() => {
          return <>
            <TextField
              variant="outlined"
              name="images"
              label="Upload Hotel Image"
              type="url"
              onBlur={(e) => handleChange(e)}
              InputProps={{
                endAdornment: <InputAdornment position="end"><RxCross1 style={{cursor:"pointer"}} color="red" onClick={()=>setNumOfImg(a=>a-1)}/></InputAdornment>,
          }}
            />
          </>;
        })}

        <Button onClick={() => setNumOfImg((a) => a + 1)}>{window.appLabels.buttons.addImg}</Button>

        <Button type="submit">{window.appLabels.buttons.submit}</Button>
      </form>
    </div>
  );
};

export default AdminPage;
