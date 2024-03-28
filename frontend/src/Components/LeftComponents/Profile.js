import React from "react";

import { FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import {useSelector , useDispatch} from "react-redux";

const Profile = () => {

  const usersRedux = useSelector( (state) => state.users );

  console.log(usersRedux)

  return (
    <div className="userProfile">
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
          <p className="name"> { usersRedux?.loggedUserData?.id } { usersRedux?.loggedUserData?.username }</p>
          <p className="position">Full Stack Developer</p>
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
          <p className="px-3"> { usersRedux?.loggedUserData?.email }</p>
        </div>

        <div className="d-flex flex-row ">
          <div>
            {" "}
            <FaRegUser />{" "}
          </div>
          <p className="px-3"> { usersRedux?.loggedUserData?.username } </p>
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
