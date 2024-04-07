import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideHeader from "../Components/SideHeader";
import LeftSide from "../Components/LeftComponents";
import RightSide from "../Components/RightComponents";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleHamburger, settoggleHamburger] = useState(false);

  const usersRedux = useSelector((state) => state.users);

  const redirectIfNotLogged = () => {
    if (usersRedux?.loggedUserData?.isUserLogged === null) {
      navigate("/signin");
    }
  };

  useEffect(() => {
    redirectIfNotLogged();
  }, []);

  return (
    <>
      <div id="bodyContainer">
        <SideHeader
          settoggleHamburger={settoggleHamburger}
          toggleHamburger={toggleHamburger}
        />

        <section id="rightSide">
          <LeftSide
            toggleHamburger={toggleHamburger}
            settoggleHamburger={settoggleHamburger}
          />

          <RightSide />
        </section>
      </div>
    </>
  );
};

export default HomePage;
