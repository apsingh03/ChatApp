import React, { useEffect, useState } from "react";
import { IoMdChatboxes } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { getAllUsersAsync } from "../../redux/slices/UsersSlice";
import { useSelector, useDispatch } from "react-redux";
import IsLoading from "../IsLoading.js";
import { Link } from "react-router-dom";

const Contacts = () => {
  const dispatch = useDispatch();
  const chatRedux = useSelector((state) => state.chat);
  const usersRedux = useSelector((state) => state.users);

  // console.log("usersRedux - ", usersRedux?.data?.users);
  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, []);

  return (
    <div className="chatBox">
      <div className="header ">
        <div className="d-flex flex-row justify-content-between">
          <div>
            {" "}
            <h4> Users</h4>{" "}
          </div>

          <div>
            <IsLoading
              isLoading={usersRedux?.isLoading && usersRedux?.isLoading}
              color={"#000"}
            />
          </div>
        </div>

        <div className="searchBox mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Here"
          />
          <span className="icon">
            {" "}
            <IoSearch />{" "}
          </span>
        </div>
      </div>

      <hr />

      <div className="recentChatContainer" style={{ height: "80vh" }}>
        <h6 className="p-3">All Registered Users</h6>

        {usersRedux?.data?.users &&
          usersRedux?.data?.users.map((data) => {
            if (
              localStorage.getItem("loggedData") !== null &&
              JSON.parse(localStorage.getItem("loggedData")).id !== data.id
            ) {
              return (
                <Link
                  key={data.id}
                  to={`/chatbox/${data.id}/${data.username}`}
                  className="chatRow d-flex flex-row align-items-baseline justify-content-between py-1 px-3 text-decoration-none  "
                >
                  <div className="d-flex flex-row align-self-baseline ">
                    {" "}
                    <img src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg" />
                    <p className="px-3 "> {data.username} </p>
                  </div>

                  <div>
                    {/* <button className="btn btn-primary btn">Add Friend</button> */}
                  </div>
                </Link>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Contacts;
