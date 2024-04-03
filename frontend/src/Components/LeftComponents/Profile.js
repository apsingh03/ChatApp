import React, { useEffect } from "react";

import { FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigation = useNavigate();
  const usersRedux = useSelector((state) => state.users);

  // console.log();

  const redirectIfNotLogged = () => {
    if (usersRedux?.loggedUserData?.isUserLogged === null) {
      navigation("/signin");
    }
  };

  useEffect(() => {
    redirectIfNotLogged();
  }, []);

  return (
    <div className="userProfile" style={{}}>
      <div className="header">
        <div className=" d-flex flex-row justify-content-between p-3 text-white font-weight-bold">
          <div>
            <h6>My Profile</h6>
          </div>
          <div>
            <h6>I</h6>
          </div>
        </div>
      </div>

      <div className="profileContainer">
        <div className="imgContainer">
          <img src="https://doot-light.react.themesbrand.com/static/media/avatar-1.9c8e605558cece65b06c.jpg" />
        </div>

        <div>
          <p className="name">
            {" "}
            {usersRedux?.loggedUserData?.id}{" "}
            {usersRedux?.loggedUserData?.username}
          </p>
          <p>
            {" "}
            <small> {usersRedux?.loggedUserData?.email} </small>{" "}
          </p>
          <p className="position">Full Stack Developer</p>
          <p className="text-center">
            {" "}
            <button
              onClick={() => [
                localStorage.removeItem("loggedData"),
                navigation("/signin"),
              ]}
              type="button"
              className="btn btn-sm btn-warning"
            >
              Logout
            </button>{" "}
          </p>
        </div>
      </div>

      <hr />

      <p className="px-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nam
        dicta non qui dignissimos nostrum{" "}
      </p>

      <hr />

      <div className="px-3">
        <div className="d-flex flex-row ">
          <div>
            {" "}
            <MdEmail />{" "}
          </div>
          <p className="px-3"> {usersRedux?.loggedUserData?.email}</p>
        </div>

        <div className="d-flex flex-row ">
          <div>
            {" "}
            <FaRegUser />{" "}
          </div>
          <p className="px-3"> {usersRedux?.loggedUserData?.username} </p>
        </div>

        <div className="d-flex flex-row ">
          <div>
            {" "}
            <FaLocationDot />{" "}
          </div>
          <p className="px-3"> Delhi USA </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
