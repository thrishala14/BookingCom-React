import React, { useEffect, useState } from "react";
import LoginContext from "../components/LoginContext";

const AuthProvider = ({children}) => {
  const getInitialUser = () => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : {};
  };

  const [currentUser, setCurrentUser] = useState(getInitialUser);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return <div>
    <LoginContext.Provider  value = {{currentUser, setCurrentUser}}>
      {children}
    </LoginContext.Provider>
  </div>;
};

export default AuthProvider;
