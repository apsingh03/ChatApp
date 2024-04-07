import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdChatboxes } from "react-icons/io";
import { GrContactInfo } from "react-icons/gr";
import { IoBookmarks } from "react-icons/io5";
import { IoSunnySharp, IoMoon } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";
import Hamburger from "hamburger-react";
const SideHeader = ({ settoggleHamburger, toggleHamburger }) => {
  return (
    <div id="leftSide">
      <div
        className="hamburgerIcon"
        onClick={() => settoggleHamburger(!toggleHamburger)}
      >
        <Hamburger color="#878a92" size={30} />
      </div>

      <div
        className="iconContainer"
        data-tooltip="User Profile"
        data-flow="right"
      >
        <Link to="/userProfile">
          <span className="icon">
            <CgProfile />
          </span>
        </Link>
      </div>

      <div className="iconContainer" data-tooltip="Chatbox" data-flow="right">
        <Link to="/chatbox">
          <span className="icon">
            <IoMdChatboxes />
          </span>
        </Link>
      </div>

      <div
        className="iconContainer"
        data-tooltip="Group Chat"
        data-flow="right"
      >
        <Link to="/groups">
          <span className="icon">
            <HiMiniUserGroup />
          </span>
        </Link>
      </div>

      <div className="iconContainer" data-tooltip="Contacts" data-flow="right">
        <Link to="/contacts">
          <span className="icon">
            <GrContactInfo />
          </span>
        </Link>
      </div>

      <div className="iconContainer" data-tooltip="Night" data-flow="right">
        <Link to="#">
          <span className="icon">{true ? <IoMoon /> : <IoSunnySharp />}</span>
        </Link>
      </div>
    </div>
  );
};

export default SideHeader;
