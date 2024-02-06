import React, { useContext, useEffect, useState } from "react";
import SideNavigationPage from "./SideNavigationPage";
import LoginContext from "../components/LoginContext";
import axios from "axios";
import SavedListCard from "../components/SavedListCard";
import { TfiHeart } from "react-icons/tfi";
import '../styles/SavedListPage.css'
import { FcLike } from "react-icons/fc";
import { toast } from "sonner";

const SavedListPage = () => {
  const { currentUser } = useContext(LoginContext);
  const [savedlist, setSavedList] = useState([]);

  useEffect(() => {
    
    let url = `${process.env.REACT_APP_GET_SAVED_LIST}${currentUser.customerId}`;
    axios.get(url).then((res) => {
      console.log("res", res.data);
      setSavedList((p)=>res.data)
    }).catch(err=> toast.error("Login to view saved list"))
  }, [currentUser, savedlist]);

  return (
    <div style={{ display: "flex" }}>
      <SideNavigationPage />
      <div className="saved-list-page">
        <h1 style={{ color: "black" }}>My Next Trip</h1>
        <p>
          <FcLike/> {savedlist.length} favourites
        </p>
        {savedlist.length === 0 ? (
          <div className="no-fav-message">
          <TfiHeart  fontSize={60} color="#003b95"/>
          <h3>Here are 3 simple steps to help you begin:</h3>
          <p> 1. Search for a place to stay</p>
          <p> 2. Tap the heart icon when you find a place you like</p>
          <p> 3. You'll find all you've saved here</p>
          </div>
        ) : (
          savedlist.map((item) => (
            <SavedListCard style={{ width: "100%" }} h={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default SavedListPage;
