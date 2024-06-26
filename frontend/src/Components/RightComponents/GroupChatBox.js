import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosInformationCircle } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { BsEmojiSmileFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import IsLoading from "../IsLoading.js";
import { toast } from "react-toastify";
import {
  createGroupChatMessageAsync,
  getGroupByIdAsync,
  getGroupByIdChatsLengthAsync,
} from "../../redux/slices/GroupSlice.js";
import ScrollToBottom from "react-scroll-to-bottom";
import socketIOClient from "socket.io-client";

import AWS from "aws-sdk";
import ImageUploadInGroupChatBox from "../ImageUploadInGroupChatBox.js";
const GroupChatBox = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const groupIdFromUseLocation = location?.pathname?.split("/")[2];
  const groupNameFromUseLocation = location?.pathname?.split("/")[3];

  const usersRedux = useSelector((state) => state.users);
  const groupRedux = useSelector((state) => state.group);

  const [userMessage, setuserMessage] = useState("");
  const [chatWhichPage, setchatWhichPage] = useState();
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [allGroupChats, setallGroupChats] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getChatsLengthRedux = async () => {
    // let length = chatRedux?.data?.count / 5;

    const chatsLengthActionResult = await dispatch(
      getGroupByIdChatsLengthAsync({ groupId: groupIdFromUseLocation })
    );

    // console.log( "chatsLengthActionResult - " , chatsLengthActionResult );

    if (chatsLengthActionResult.payload.success === true) {
      const chatLengthPage = Math.ceil(
        chatsLengthActionResult.payload.length / itemsPerPage
      );
      // console.log(
      //   "Array Length - ",
      //   chatsLengthActionResult.payload.length,
      //   "which Page - ",
      //   chatLengthPage
      // );

      setchatWhichPage(chatLengthPage);

      const actionResult = await dispatch(
        getGroupByIdAsync({
          groupId: groupIdFromUseLocation,
          page: chatLengthPage,
          itemsPerPage,
        })
      );

      if ((actionResult.type = "group/getGroupById/fulfilled")) {
        // console.log("data ", actionResult.payload.rows[23]);
        setallGroupChats(actionResult.payload.rows);
      }
    }
  };

  useEffect(() => {
    getChatsLengthRedux();
  }, [location]);

  const sendMessageHandler = async () => {
    if (userMessage.length === 0) {
      toast.error("Please Type Your Message");
    } else {
      const actionResult = await dispatch(
        createGroupChatMessageAsync({
          message: userMessage,
          groupId: groupIdFromUseLocation,
        })
      );

      // console.log("create msg - ", actionResult.payload);
      // setallGroupChats((prevChats) => [...prevChats, ...actionResult.payload]);

      // setuserMessage("");

      // console.log("create grp  msg - " , actionResult.payload )
    }
  };

  // Event handler for Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      sendMessageHandler();
    }
  };

  const handleScroll = async (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    if (scrollTop === 0) {
      // console.log("scrollTop - " , scrollTop  , chatWhichPage , itemsPerPage );

      if (chatWhichPage >= 2) {
        const actionResult = await dispatch(
          getGroupByIdAsync({
            groupId: groupIdFromUseLocation,
            page: chatWhichPage - 1,
            itemsPerPage,
          })
        );

        setallGroupChats((prevChats) => [
          ...actionResult.payload.rows,
          ...prevChats,
        ]);

        setchatWhichPage(chatWhichPage - 1);
      }
    }
  };

  //
  // --- SOCKET
  //
  const [socket, setSocket] = useState(null);

  // CONNECTION CODE
  useEffect(() => {
    const BACKENDPOINT = process.env.REACT_APP_BACKENDHOSTNAME;
    const socket = socketIOClient(BACKENDPOINT, { transports: ["websocket"] });
    setSocket(socket);
    // console.log("socket - ", socket);

    // Clean up function to disconnect socket
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for new message events from the server
    socket.on("newMessage", (socketAction) => {
      // console.log("socketAction ", socketAction);
      setallGroupChats((prevMessages) => [...prevMessages, ...socketAction]);
      setuserMessage("");
    });

    // Clean up function to remove event listener
    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  let uniqueKey = Math.floor(Math.random() * 10000);

  const handleImageSelect = (selectedFile) => {
    // console.log("Selected File:", selectedFile);

    if (selectedFile) {
      setisLoading(true);

      try {
        const BUCKET_NAME = process.env.REACT_APP_AWS_BUCKET_NAME;
        const IAM_USER_KEY = process.env.REACT_APP_AWS_IAM_USER_KEY;
        const IAM_USER_SECRET = process.env.REACT_APP_AWS_IAM_USER_SECRET;

        let s3Bucket = new AWS.S3({
          accessKeyId: IAM_USER_KEY,
          secretAccessKey: IAM_USER_SECRET,
          Bucket: BUCKET_NAME,
        });

        // we already have bucket
        // s3Bucket.createBucket( () => {

        const newFileName = "IMGUPLOADEDTOAWS" + selectedFile?.name;

        var params = {
          Bucket: BUCKET_NAME,
          Key: newFileName,
          Body: selectedFile,
          // ACL: "public-read",
        };

        return new Promise((resolve, reject) => {
          s3Bucket.upload(params, async (err, s3response) => {
            if (err) {
              console.log(`somethong went wrong  -- \n`, err);
              reject(err);
              setisLoading(false);
              // throw new Error(err);
            } else {
              // console.log(`success `, s3response);
              // resolve(s3response.Location);
              await dispatch(
                createGroupChatMessageAsync({
                  message: s3response.Location,
                  groupId: groupIdFromUseLocation,
                })
              );
              setisLoading(false);
            }
          });
        });

        // } )
      } catch (error) {
        console.log(`uploadToS3 Error ${error}`);
      }
    }
  };

  return (
    <div className="chat">
      <div className="header d-flex flex-row justify-content-between align-items-baseline">
        <div className="d-flex flex-row align-items-baseline ">
          <div>
            <img
              src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg"
              alt="loremumipsum"
            />
          </div>

          <div className="px-3">
            <h5 className="name">
              {" "}
              {groupNameFromUseLocation.split("%")[0]}{" "}
              {groupNameFromUseLocation.split("%")[1].substring(2)}{" "}
            </h5>

            <p className="onlineStatus" style={{ marginTop: "-10px" }}>
              {" "}
              <small>Away</small>{" "}
            </p>
          </div>
        </div>

        <div>
          <IsLoading
            isLoading={
              (groupRedux?.isLoading && groupRedux?.isLoading) || isLoading
            }
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
        <ScrollToBottom>
          {allGroupChats &&
            allGroupChats.map((data, index) => {
              // console.log("map - ", data);
              return (
                <div key={index}>
                  {(function () {
                    uniqueKey++;
                    if (usersRedux?.loggedUserData?.id === data?.user?.id) {
                      return (
                        <div className="sendChatRightSide" key={uniqueKey}>
                          <div className="message">
                            {(function () {
                              if (
                                data?.message &&
                                data.message.includes("IMGUPLOADEDTOAWS")
                              ) {
                                return (
                                  <img
                                    src={`${data.message}`}
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      borderRadius: "5px",
                                    }}
                                    alt="userSendedImages"
                                  />
                                );
                              } else {
                                return (
                                  <>
                                    {" "}
                                    {data?.id} - {data?.message}{" "}
                                  </>
                                );
                              }
                            })()}
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
                        <div className="receiveChatLeftSide" key={uniqueKey}>
                          <div className="message">
                            {(function () {
                              if (
                                data?.message &&
                                data.message.includes("IMGUPLOADEDTOAWS")
                              ) {
                                return (
                                  <img
                                    src={`${data.message}`}
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      borderRadius: "10px",
                                    }}
                                    alt="userSendedImages"
                                  />
                                );
                              } else {
                                return (
                                  <>
                                    {" "}
                                    {data?.id} - {data?.message}{" "}
                                  </>
                                );
                              }
                            })()}
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
        </ScrollToBottom>
      </div>

      <div className="footer d-flex flex-row justify-content-between">
        <div style={{ paddingLeft: "10px" }}>
          <ImageUploadInGroupChatBox onImageSelect={handleImageSelect} />
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
            onKeyDown={handleKeyDown}
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

export default GroupChatBox;
