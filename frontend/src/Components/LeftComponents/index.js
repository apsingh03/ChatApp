import React from "react";
import Profile from "./Profile";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";
import GroupBox from "./GroupBox";
import CreateGroup from "../CreateGroup";
import Invitation from "./Invitation";

const LeftSide = () => {
  return (
    <div className="left">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/userProfile" element={<Profile />} />
        <Route path="/chatbox/*" element={<ChatBox />} />
        <Route path="/groups/*" element={<GroupBox />} />
        <Route path="/invitation/*" element={<Invitation />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
};

export default LeftSide;
