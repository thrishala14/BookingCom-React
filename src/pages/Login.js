import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../components/LoginContext";
import axios from "axios";
import '../styles/Login.css';
import { toast } from "sonner";

const Login = () => {
  const {setCurrentUser } = useContext(LoginContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const loginLabel = window.appLabels.toastErrors.loginError
  const navigate = useNavigate();

  const login = () => {
    if(user.email ==="" || user.password === ""){
      toast.error(loginLabel.emptyField)
    }
    else{
      console.log(user)
    axios
      .get(
        `${process.env.REACT_APP_LOGIN}email=${user.email}&password=${user.password}`
      )
      .then((res) => {
        if (res.status === 200) {
          setCurrentUser(res.data);
          toast.success("Welcome " + res.data.firstName)
           navigate("/")
        } else {
          toast.error(loginLabel.invalidCred)
        }
      })
      .catch((err)=>toast.error(err.response.data))
      ;}
  };

  return (
    <>
     
      <form onSubmit={(e) => e.preventDefault()} className="login-form">
      <h3> {window.appLabels.buttons.login}</h3>
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br/>
        <button type="submit" onClick={login}>
          {window.appLabels.buttons.login}
        </button>
        <Link to="/register">{window.appLabels.buttons.notReg}</Link>
      </form>
    </>
  );
};

export default Login;
