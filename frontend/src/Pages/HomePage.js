import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideHeader from "../Components/SideHeader";
import LeftSide from "../Components/LeftComponents";
import RightSide from "../Components/RightComponents";
// icons

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersRedux = useSelector((state) => state.users);

  // console.log("usersRedux - ", usersRedux);

  return (
    <>
      <div id="bodyContainer">
        <SideHeader />

        <section id="rightSide">
          <LeftSide />

          <RightSide />
        </section>
      </div>
    </>
  );
};

export default HomePage;
