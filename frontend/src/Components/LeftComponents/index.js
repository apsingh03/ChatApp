import React from "react";
import Profile from "./Profile";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";

const LeftSide = () => {
  return (
    <div className="left">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/userProfile" element={<Profile />} />
        <Route path="/chatbox" element={<ChatBox />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>

      {/* <Profile /> */}
    </div>
  );
};

export default LeftSide;
