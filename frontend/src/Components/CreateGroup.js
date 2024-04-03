import React, { useState } from "react";

import { MdOutlineCancel } from "react-icons/md";
import { createGroupAsync } from "../redux/slices/GroupSlice";
import { useDispatch, useSelector } from "react-redux";
import IsLoading from "./IsLoading";

const CreateGroup = ({
  setcreateGroupModel,
  createGroupModel,
  setallGroups,
  allGroups,
}) => {
  const dispatch = useDispatch();

  const groupRedux = useSelector((state) => state.group);

  const [groupName, setgroupName] = useState("");

  const onClickHandler = async () => {
    if (groupName.length > 0) {
      const action = await dispatch(
        createGroupAsync({
          groupName: groupName,
        })
      );

      if (action.type === "chats/createGroup/fulfilled") {
        const addedData = [action.payload];

        setallGroups((prevGroups) => [...addedData, ...prevGroups]);

        // console.log( "create Grp - " ,  action.payload);
        setcreateGroupModel(false);
        setgroupName(" ");
      }
    } else {
      alert("Please Type Group Name");
    }
  };

  return (
    <div id="popupCreateGroup">
      <div
        className="container rounded-2 p-5"
        style={{ backgroundColor: "#fff ", border: "1px solid #ddd" }}
      >
        <div className="form-group mb-3">
          <div className="d-flex flex-row justify-content-between mb-3">
            <label htmlFor="groupName">Your Group Name</label>

            <div>
              <IsLoading
                isLoading={groupRedux?.isLoading && groupRedux?.isLoading}
                color={"#000"}
              />
            </div>

            <div
              title="Close it"
              onClick={() => setcreateGroupModel(!createGroupModel)}
            >
              <MdOutlineCancel size={30} color="#000" />
            </div>
          </div>

          <input
            type="text"
            className="form-control"
            id="groupName"
            name="groupName"
            value={groupName}
            onChange={(e) => setgroupName(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={onClickHandler}
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroup;
