import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";
import GroupChatBox from "./GroupChatBox";
import AboutGroup from "./AboutGroup";

const RightSide = () => {
  return (
    <>
      <div className="right">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/userProfile" element={<Home />} />
          <Route path="/chatbox" element={<Home />} />
          <Route path="/chatbox/*" element={<ChatBox />} />
          <Route path="/groups" element={<Home />} />
          <Route path="/groups/*" element={<GroupChatBox />} />
          <Route path="/groups/aboutGroup/*" element={<AboutGroup />} />
          <Route path="/contacts" element={<Home />} />{" "}
        </Routes>
      </div>
    </>
  );
};

export default RightSide;
