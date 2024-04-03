import React, { useEffect, useState } from "react";
import { IoMdChatboxes } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import IsLoading from "../IsLoading.js";
import {
  allGroupAsync,
  getUserJoinedGroupsAsync,
} from "../../redux/slices/GroupSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";
import CreateGroup from "../CreateGroup.js";
import { MdAdminPanelSettings } from "react-icons/md";

const GroupBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groupRedux = useSelector((state) => state.group);
  const usersRedux = useSelector((state) => state.users);
  const [createGroupModel, setcreateGroupModel] = useState(false);
  const [allGroups, setallGroups] = useState([]);

  // console.log("groupRedux ", groupRedux);
  // console.log("createGroupModel - ", createGroupModel );

  const fetchAllGroup = async () => {
    const action = await dispatch(allGroupAsync());

    if (action.type === "chats/allGroup/fulfilled") {
      // console.log( "fetchAllGroup - " ,  action );
      setallGroups(action.payload);
    }
  };

  useEffect(() => {
    dispatch(getUserJoinedGroupsAsync());
    fetchAllGroup();
  }, []);

  return (
    <>
      {createGroupModel ? (
        <CreateGroup
          createGroupModel={createGroupModel}
          setcreateGroupModel={setcreateGroupModel}
          setallGroups={setallGroups}
          allGroups={allGroups}
        />
      ) : null}

      <div className="chatBox">
        <div className="header ">
          <div className="d-flex flex-row justify-content-between">
            <div>
              {" "}
              <h4>Groups</h4>{" "}
            </div>

            <div
              title="Create Group"
              onClick={() => setcreateGroupModel(!createGroupModel)}
            >
              {" "}
              <MdCreateNewFolder />{" "}
            </div>
          </div>

          {/* <div className="searchBox mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Here"
          />
          <span className="icon">
            {" "}
            <IoSearch />{" "}
          </span>
        </div> */}
        </div>

        <hr />

        <div className="recentChatContainer">
          <h6 className="p-3">Your Joined Groups</h6>

          {groupRedux?.data.map((data, index) => {
            return (
              <Link
                to={`/groups/${data.id}/${data.name}`}
                className="chatRow d-flex flex-row align-items-baseline justify-content-between text-decoration-none py-2 px-3"
                key={data.id}
              >
                <p> {index + 1} </p>
                <p className="px-3 "> {data.name} </p>
                <p>
                  {" "}
                  <small>Total Users -</small> {data.totalUsers}{" "}
                </p>
              </Link>
            );
          })}
        </div>

        <hr />

        <div className="recentChatContainer">
          <h6 className="p-3">All Groups</h6>

          {allGroups &&
            allGroups?.map((data, index) => {
              // console.log(" data -  ", data.admin_id);
              // console.log("usersRedux - ", usersRedux?.loggedUserData?.id);
              return (
                <div
                  className="chatRow d-flex flex-row align-items-baseline justify-content-between  text-decoration-none p-2"
                  key={data.id}
                >
                  {usersRedux?.loggedUserData?.id === data.admin_id ? (
                    <Link
                      title="You are Admin of this Group"
                      className="d-flex flex-row  text-decoration-none"
                      to={`/groups/aboutGroup/${data.id}/`}
                    >
                      <p> {index + 1} </p>
                      <p className="px-1 ">
                        <MdAdminPanelSettings color="#000" size={20} />
                      </p>
                      <p className="px-1 "> {data.name} </p>
                      <p className="px-1 ">
                        {" "}
                        <small>Total Users -</small> {data.totalUsers}{" "}
                      </p>
                    </Link>
                  ) : (
                    <div className="d-flex flex-row  text-decoration-none">
                      <p> {index + 1} </p>
                      <p className="px-1 "> {data.name} </p>
                      <p className="px-1 ">
                        {" "}
                        <small>Total Users -</small> {data.totalUsers}{" "}
                      </p>
                    </div>
                  )}

                  <div>
                    <Link
                      to={`${data.inviteLink}`}
                      target="_blank"
                      className="btn btn-primary btn-sm "
                    >
                      Link
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default GroupBox;
