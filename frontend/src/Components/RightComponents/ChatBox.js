import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosInformationCircle } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { BsEmojiSmileFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { createChatAsync, getAllChatsAsync } from "../../redux/slices/Chatting";
import IsLoading from "../IsLoading.js";
import { toast } from "react-toastify";
const ChatBox = () => {
  const dispatch = useDispatch();
  const chatRedux = useSelector((state) => state.chat);
  const usersRedux = useSelector((state) => state.users);

  const [userMessage, setuserMessage] = useState("");

  useEffect(() => {
    dispatch(getAllChatsAsync());
  }, []);

  const sendMessageHandler = () => {
    if (userMessage.length === 0) {
      toast.error("Please Type Your Message");
    } else {
      // console.log( userMessage );

      dispatch(
        createChatAsync({
          message: userMessage,
        })
      );
    }
  };

  let uniqueKey = Math.floor(Math.random() * 10000);

  return (
    <div className="chat">
      <div className="header d-flex flex-row justify-content-between align-items-baseline">
        <div className="d-flex flex-row align-items-baseline ">
          <div>
            <img src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg" />
          </div>

          <div className="px-3">
            <h5 className="name">Marguerite Campbell</h5>

            <p className="onlineStatus" style={{ marginTop: "-10px" }}>
              {" "}
              <small>Away</small>{" "}
            </p>
          </div>
        </div>

        <div>
          <IsLoading
            isLoading={chatRedux?.isLoading && chatRedux?.isLoading}
            color={"#000"}
          />
        </div>

        <div className="icons">
          <span className="px-3">
            {" "}
            <CiSearch />{" "}
          </span>
          <span>
            {" "}
            <IoIosInformationCircle />{" "}
          </span>
        </div>
      </div>

      <div className="chatBody">
        {chatRedux.data &&
          chatRedux.data.map((data, index) => {
            // console.log("map - ", data);
            return (
              <div key={index}>
                {(function () {
                  uniqueKey++;
                  if (usersRedux?.loggedUserData?.id === data?.user?.id) {
                    return (
                      <div className="sendChatRightSide" key={uniqueKey}>
                        <div className="message">{data?.message}</div>

                        <div className="senderInfo">
                          <div>
                            <img
                              src="images/doubleTick.png"
                              alt="double-tick"
                            />
                          </div>
                          <div>
                            <small>
                              {" "}
                              {new Date().getDate() ===
                              new Date(data?.createdAt).getDate()
                                ? new Date(data?.createdAt)
                                    .toTimeString()
                                    .substring(0, 5)
                                : new Date(data?.createdAt)
                                    .toDateString()
                                    .substring(4, 10) +
                                  " " +
                                  new Date(data?.createdAt)
                                    .toTimeString()
                                    .substring(0, 5)}{" "}
                            </small>
                          </div>
                          <div>
                            <p>You</p>
                          </div>
                          <div>
                            <img
                              src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg"
                              alt="user"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="receiveChatLeftSide" key={uniqueKey}>
                        <div className="message">{data?.message}</div>

                        <div className="senderInfo">
                          <div>
                            <small>
                              {" "}
                              {new Date().getDate() ===
                              new Date(data?.createdAt).getDate()
                                ? new Date(data?.createdAt)
                                    .toTimeString()
                                    .substring(0, 5)
                                : new Date(data?.createdAt)
                                    .toDateString()
                                    .substring(4, 10) +
                                  " " +
                                  new Date(data?.createdAt)
                                    .toTimeString()
                                    .substring(0, 5)}{" "}
                            </small>
                          </div>
                          <div>
                            <p>{data?.user?.username}</p>
                          </div>
                          <div>
                            <img
                              src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg"
                              alt="user"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                })()}
              </div>
            );
          })}
      </div>

      <div className="footer d-flex flex-row justify-content-between">
        <div style={{}}>
          <MdMoreHoriz />
        </div>
        {/* 
        <div style={{}}>
          <BsEmojiSmileFill />
        </div> */}

        <div style={{ width: "100%" }}>
          <input
            type="text"
            onChange={(e) => setuserMessage(e.target.value)}
            className="form-control "
            placeholder="Whats Your Message"
          />
        </div>

        <div className="sendBtn" onClick={sendMessageHandler} style={{}}>
          <Link>
            {" "}
            <IoSend
              size={35}
              style={{
                backgroundColor: "rgba(78 , 172 , 109 ,.9)",
                padding: 5,
              }}
              color="#fff"
            />{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
