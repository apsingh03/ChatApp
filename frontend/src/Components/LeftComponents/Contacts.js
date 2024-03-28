import React from "react";
import { IoMdChatboxes } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const Contacts = () => {
  return (
    <div className="chatBox">
    <div className="header ">
      <div className="d-flex flex-row justify-content-between">
        <div>
          {" "}
          <h4> Users</h4>{" "}
        </div>

        {/* <div>
          {" "}
          <IoMdChatboxes />{" "}
        </div> */}
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

    <div className="recentChatContainer">
      <h6 className="p-3">All Registered Users</h6>

      <div className="chatRow d-flex flex-row align-items-baseline  py-1 px-3">
        <div className="image">
          {" "}
          <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" />
          <div className="online"></div>
        </div>
        <p className="px-3 "> ajay@gmail.com </p>
      </div>

      {["", "", "", "", "", "", "", "", "", "", "", "", ""].map((data) => {
        return (
          <div className="chatRow d-flex flex-row align-items-baseline justify-content-between py-1 px-3">
           

            <div className="d-flex flex-row align-self-baseline " >
              {" "}
              <img src="https://clicklovegrow.com/wp-content/uploads/2021/03/img-5659-1024x731.jpg" />
              <p className="px-3 "> ajay@gmail.com </p>
            </div>
           

  <div>

  <button className="btn btn-primary btn-sm" >Add Friend</button>
            
    </div>             

             
              
            
          
          </div>
        );
      })}
    </div>
  </div>
  )
}

export default Contacts