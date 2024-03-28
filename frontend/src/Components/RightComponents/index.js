import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";

const RightSide = () => {
  return (
    <>
      <div className="right">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/userProfile" element={<Home />} />
          <Route path="/chatbox" element={<ChatBox />} />
        <Route path="/contacts" element={<Home />} />  </Routes>

        
       
      </div>
    </>
  );
};

export default RightSide;
