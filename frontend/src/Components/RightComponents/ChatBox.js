import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosInformationCircle } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { BsEmojiSmileFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";

const ChatBox = () => {
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
        <div>
          <div className="receiveChatLeftSide">
            <div className="message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              quis modi consequatur, sint laborum provident. Tempore nobis, cum
              asperiores labore quam totam? Eius quaerat dolorum cum officia
              tempore. Molestias.
            </div>

            <div className="senderInfo">
              <div>
                <small>11:49pm</small>
              </div>
              <div>
                <p>Name</p>
              </div>
              <div>
                <img
                  src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg"
                  alt="user"
                />
              </div>
            </div>
          </div>

          <div className="sendChatRightSide">
            <div className="message">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              quis modi consequatur, sint laborum provident. Tempore nobis, cum
              asperiores labore quam totam? Eius quaerat dolorum cum officia
              tempore. Molestias.
            </div>

            <div className="senderInfo">
              <div>
                <img src="images/doubleTick.png" alt="double-tick" />
              </div>
              <div>
                <small>11:49pm</small>
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
        </div>


        <div>
          <div className="receiveChatLeftSide">
            <div className="message">
              1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              quis modi consequatur, sint laborum provident. Tempore nobis, cum
              asperiores labore quam totam? Eius quaerat dolorum cum officia
              tempore. Molestias.
            </div>

            <div className="senderInfo">
              <div>
                <small>11:49pm</small>
              </div>
              <div>
                <p>Name</p>
              </div>
              <div>
                <img
                  src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg"
                  alt="user"
                />
              </div>
            </div>
          </div>

          <div className="sendChatRightSide">
            <div className="message">
             2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              quis modi consequatur, sint laborum provident. Tempore nobis, cum
              asperiores labore quam totam? Eius quaerat dolorum cum officia
              tempore. Molestias.
            </div>

            <div className="senderInfo">
              <div>
                <img src="images/doubleTick.png" alt="double-tick" />
              </div>
              <div>
                <small>11:49pm</small>
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
        </div>

        <div>
          <div className="receiveChatLeftSide">
            <div className="message">
             3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              quis modi consequatur, sint laborum provident. Tempore nobis, cum
              asperiores labore quam totam? Eius quaerat dolorum cum officia
              tempore. Molestias.
            </div>

            <div className="senderInfo">
              <div>
                <small>11:49pm</small>
              </div>
              <div>
                <p>Name</p>
              </div>
              <div>
                <img
                  src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg"
                  alt="user"
                />
              </div>
            </div>
          </div>

          <div className="sendChatRightSide">
            <div className="message">
            4  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              quis modi consequatur, sint laborum provident. Tempore nobis, cum
              asperiores labore quam totam? Eius quaerat dolorum cum officia
              tempore. Molestias.
            </div>

            <div className="senderInfo">
              <div>
                <img src="images/doubleTick.png" alt="double-tick" />
              </div>
              <div>
                <small>11:49pm</small>
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
        </div>

        <div>
          <div className="receiveChatLeftSide">
            <div className="message">
           5   Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              quis modi consequatur, sint laborum provident. Tempore nobis, cum
              asperiores labore quam totam? Eius quaerat dolorum cum officia
              tempore. Molestias.
            </div>

            <div className="senderInfo">
              <div>
                <small>11:49pm</small>
              </div>
              <div>
                <p>Name</p>
              </div>
              <div>
                <img
                  src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg"
                  alt="user"
                />
              </div>
            </div>
          </div>

          <div className="sendChatRightSide">
            <div className="message">
           6   Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              quis modi consequatur, sint laborum provident. Tempore nobis, cum
              asperiores labore quam totam? Eius quaerat dolorum cum officia
              tempore. Molestias.
            </div>

            <div className="senderInfo">
              <div>
                <img src="images/doubleTick.png" alt="double-tick" />
              </div>
              <div>
                <small>11:49pm</small>
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
        </div>

        <div>
          <div className="receiveChatLeftSide">
            <div className="message">
           7   Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              quis modi consequatur, sint laborum provident. Tempore nobis, cum
              asperiores labore quam totam? Eius quaerat dolorum cum officia
              tempore. Molestias.
            </div>

            <div className="senderInfo">
              <div>
                <small>11:49pm</small>
              </div>
              <div>
                <p>Name</p>
              </div>
              <div>
                <img
                  src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg"
                  alt="user"
                />
              </div>
            </div>
          </div>

          <div className="sendChatRightSide">
            <div className="message">
           8   Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              quis modi consequatur, sint laborum provident. Tempore nobis, cum
              asperiores labore quam totam? Eius quaerat dolorum cum officia
              tempore. Molestias.
            </div>

            <div className="senderInfo">
              <div>
                <img src="images/doubleTick.png" alt="double-tick" />
              </div>
              <div>
                <small>11:49pm</small>
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
        </div>

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
            className="form-control "
            placeholder="Whats Your Message"
          />
        </div>

        <div className="sendBtn" style={{}}>
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
