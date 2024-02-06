import axios from "axios";
import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const errMsgs = window.appLabels.registerErrorMsgs;

  const [registeredUser, setRegistered] = useState({
    firstName: "",
    lastName: "",
    customerPhoto: null,
    customerEmail: "",
    customerPhone: "",
    customerDob: "",
    customerPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistered({ ...registeredUser, [name]: value });
  };

  const submit = () => {
    if (Object.keys(errors).length === 0) {
      let url = `${process.env.REACT_APP_REGISTER}`;
      const reqBody = {
          "firstName": registeredUser.firstName,
          "lastName": registeredUser.lastName,
          "customerEmail": registeredUser.customerEmail,
          "customerPhone": registeredUser.customerPhone,
          "file": registeredUser.customerPhoto,
          "customerDob": registeredUser.customerDob,
          "customerPassword": registeredUser.customerPassword,
          "role": "user"
       
      };

     
      axios
        .post(url, reqBody, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then(
          (res) => {toast.success(window.appLabels.toastSuccess.registered);  navigate("/login")}
        )
        .catch((err) =>toast.error(err.response.data));
    } else {
      alert("Check Input values");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <Toaster position="top-center" richColors= {true}/>
      <form className="register-form" onSubmit={handleSubmit(submit)}>
        <input
          placeholder="First Name"
          type="text"
          {...register("firstName", { required: true, maxLength: 15 })}
          name="firstName"
          onChange={handleInputChange}
        />
        <br />
        {errors.firstName && <p>{errMsgs.firstName}</p>}
        <br />
        <input
          placeholder="Last Name"
          type="text"
          name="lastName"
          {...register("lastName", { required: true, maxLength: 15 })}
          onChange={handleInputChange}
        />
        <br />
        {errors.lastName && <p>{errMsgs.lastName}</p>}
        <br />
        <input
          placeholder="Email"
          name="customerEmail"
          {...register("customerEmail", {
            required: true,
            pattern:
              /^[A-Za-z0-9](([a-zA-Z0-9,=.!\-#|$%^&*+/?_{}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$/,
          })}
          onChange={handleInputChange}
        />
        <br />
        {errors.customerEmail && <p>{errMsgs.email}</p>}
        <br />
        <input
          placeholder="Phone"
          name="customerPhone"
          {...register("customerPhone", {
            required: true,
            pattern: /^[789]\d{9}$/,
          })}
          onChange={handleInputChange}
        />
        <br />
        {errors.customerPhone && <p>{errMsgs.phone}</p>}
        <br />
        <input
          type="date"
          placeholder="Date of Birth"
          onfocus="this.showPicker()"
          required
          min={'1920-01-01'}
          max={'2007-12-31'}
          name="customerDob"
          {...register("customerDob")}
          className="dates"
          onChange={handleInputChange}
        />
        <br />
        <br />
        {/* <input
          placeholder="Photo"
          name="customerPhoto"
          onChange={handleInputChange}
        /> */}
        <input
          type="file"
          required
          onChange={(e)=>setRegistered({...registeredUser, customerPhoto: e.target.files[0]})}
        /> 
        <br />
        <br />

        <input
          placeholder="Password"
          type="password"
          name="customerPassword"
          {...register("customerPassword", {
            required: true,
            pattern: /^[A-Za-z0-9]{8,}$/,
          })}
          onChange={handleInputChange}
        />
        <br />
        {errors.customerPassword && <p>{errMsgs.password}</p>}

        <button type="submit">
          {window.appLabels.buttons.register}
        </button>
      </form>
    </div>
  );
};

export default Register;
