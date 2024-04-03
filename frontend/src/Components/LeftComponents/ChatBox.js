import React, { useEffect, useState } from "react";
import { IoMdChatboxes } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getwithWhomConversationsAsync } from "../../redux/slices/Chatting";
import { Link, useLocation } from "react-router-dom";

const ChatBox = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const chatRedux = useSelector((state) => state.chat);

  // console.log("chatRedux - ", chatRedux.data);

  useEffect(() => {
    dispatch(getwithWhomConversationsAsync());
  }, []);

  return (
    <div className="chatBox">
      <div className="header ">
        <div className="d-flex flex-row justify-content-between">
          <div>
            {" "}
            <h4>Chats</h4>{" "}
          </div>

          <div>
            {" "}
            <IoMdChatboxes />{" "}
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
        <h6 className="p-3">Your Recent Chats</h6>

        {chatRedux.data &&
          chatRedux.data.map((data) => {
            // ---------------  MSG RECEIVER ---------------
            if (data.user_id !== undefined) {
              // console.log("data.user_id - ", data.user_id, data.user.username);
              // console.log(data)
              return (
                <Link
                  key={data.user.id}
                  to={`/chatbox/${data.user.id}/${data.user.username}/${data.idsCode}`}
                  className="chatRow d-flex flex-row align-items-baseline text-decoration-none  py-1 px-3"
                >
                  <div className="image">
                    {" "}
                    <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" />
                    <div className="online"></div>
                  </div>
                  <p className="px-3 ">
                    {" "}
                    {data.user.email}ddd {data.idsCode}{" "}
                  </p>
                </Link>
              );
            }

            // ---------------  MSG SENDER ---------------
            else {
              return (
                <Link
                  key={data.withWhomUser.id}
                  to={`/chatbox/${data.withWhomUser.id}/${data.withWhomUser.username}/${data.idsCode}`}
                  className="chatRow d-flex flex-row align-items-baseline text-decoration-none  py-1 px-3"
                >
                  <div className="image">
                    {" "}
                    <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" />
                    <div className="online"></div>
                  </div>
                  <p className="px-3 "> {data.withWhomUser.email} </p>
                </Link>
              );
            }
          })}
      </div>
    </div>
  );
};

export default ChatBox;
