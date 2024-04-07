import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosInformationCircle } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { BsEmojiSmileFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import {
  createChatAsync,
  getAllChatsAsync,
  getChatsLengthAsync,
} from "../../redux/slices/Chatting";
import IsLoading from "../IsLoading.js";
import { toast } from "react-toastify";
const ChatBox = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const chatRedux = useSelector((state) => state.chat);
  const usersRedux = useSelector((state) => state.users);

  const withWhomIdFromUseLocation = location.pathname.split("/")[2];
  const withWhomUserNameFromUseLocation = location.pathname.split("/")[3];
  const idsCodeFromUseLocation = location.pathname.split("/")[4];

  // console.log("idsCodeFromUseLocation - ", idsCodeFromUseLocation )

  const [userMessage, setuserMessage] = useState("");
  const [chatWhichPage, setchatWhichPage] = useState();
  const [itemsPerPage, setitemsPerPage] = useState(20);

  const [allChats, setallChats] = useState([]);

  const getChatsLengthRedux = async () => {
    const chatsLengthActionResult = await dispatch(
      getChatsLengthAsync({ withWhomId: withWhomIdFromUseLocation })
    );

    if (
      chatsLengthActionResult.payload.success === true &&
      chatsLengthActionResult.payload.length > 0
    ) {
      const chatLengthPage = Math.ceil(
        chatsLengthActionResult.payload.length / itemsPerPage
      );

      // console.log(
      //   "length - ",
      //   chatsLengthActionResult.payload.length,
      //   "page - ",
      //   chatLengthPage
      // );

      setchatWhichPage(chatLengthPage);

      const actionResultAllChats = await dispatch(
        getAllChatsAsync({
          page: chatLengthPage,
          itemsPerPage,
          withWhomId: withWhomIdFromUseLocation,
          idsCode: idsCodeFromUseLocation,
        })
      );
      // console.log("ALL chats with whom", actionResultAllChats.payload.rows);
      setallChats(actionResultAllChats.payload.rows);
    }
  };

  useEffect(() => {
    getChatsLengthRedux();
  }, [location]);

  const sendMessageHandler = async () => {
    if (userMessage.length === 0) {
      toast.error("Please Type Your Message");
    } else {
      // console.log( userMessage );

      const actionResult = await dispatch(
        createChatAsync({
          message: userMessage,
          withWhomId: withWhomIdFromUseLocation,
        })
      );

      setuserMessage(" ");

      // console.log("createChat - ", actionResult.payload);
    }
  };

  const handleScroll = async (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    if (scrollTop === 0) {
      if (chatWhichPage >= 2) {
        const actionResult = await dispatch(
          getAllChatsAsync({
            page: chatWhichPage - 1,
            itemsPerPage,
            withWhomId: withWhomIdFromUseLocation,
          })
        );

        setallChats((prevChats) => [
          ...actionResult.payload.rows,
          ...prevChats,
        ]);

        setchatWhichPage(chatWhichPage - 1);
      }
    }
  };

  let uniqueKey = Math.floor(Math.random() * 10000);

  return (
    <div className="chat">
      <div className="header d-flex flex-row justify-content-between align-items-baseline">
        <div className="d-flex flex-row align-items-baseline ">
          <div>
            <img src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg" alt="loreumipsum" />
          </div>

          <div className="px-3">
            <h5 className="name"> {withWhomUserNameFromUseLocation} </h5>

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

      <div className="chatBody" onScroll={handleScroll}>
        {allChats &&
          allChats.map((data, index) => {
            // console.log("map - ", data);
            return (
              <div key={index}>
                {(function () {
                  if (usersRedux?.loggedUserData?.id === data?.user?.id) {
                    return (
                      <div className="sendChatRightSide" key={data.id}>
                        <div className="message">
                          {" "}
                          {data?.id} {data?.message}
                        </div>

                        <div className="senderInfo">
                          <div>
                            <img
                              src={"/images/doubleTick.png"}
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
                      <div className="receiveChatLeftSide" key={data.id}>
                        <div className="message">
                          {" "}
                          {data?.id} {data?.message}
                        </div>

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
            value={userMessage}
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
