import React, {useState } from "react";
import "../styles/SearchBar.css";



const SearchBar = () => {
  

  const [toDisplay, setToDisplay] = useState(false);

  const showGuest = () =>{
    setToDisplay((d)=>!d)
  }

  return (
    <div className="search-bar">
      <h1>Where to next?</h1>
      <h2>Find exclusive Genius rewards in every corner of the world!</h2>
      <div className="search">
        <input placeholder="Where are you going?" />
        <input type="date" onfocus="this.showPicker()" className="dates" />
        <strong>to</strong>
        <input type="date" onfocus="this.showPicker()" className="dates" />
        
        <button class="collapsible" onClick={showGuest}>
          Guests
        </button>

        {toDisplay===false ? 
        <div class="content">
          <p> Adults </p>
          <p> Rooms </p>
        </div>: null}
        <button className="searchBtn">{window.appLabels.buttons.submit}</button>
      </div>
    </div>
  );
};

export default SearchBar;
