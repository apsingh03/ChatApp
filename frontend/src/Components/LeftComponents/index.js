import React, { useEffect } from "react";
import Profile from "./Profile";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChatBox from "./ChatBox";
import Contacts from "./Contacts";
import GroupBox from "./GroupBox";
import CreateGroup from "../CreateGroup";
import Invitation from "./Invitation";

const LeftSide = ({ toggleHamburger, settoggleHamburger }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Medium screen (md) and larger
        settoggleHamburger(false); // Set toggleHamburger to false
      }
    };
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`left ${toggleHamburger ? "d-none" : "d-block"} `}>
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
