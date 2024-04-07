import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAboutGroupByIdAsync,
  getAllGroupsJoinedUserAsync,
} from "../../redux/slices/AboutGroupSlice";
import { getAllUsersAsync } from "../../redux/slices/UsersSlice";
import {
  getUserJoinedGroupsAsync,
  joinGroupViaInvitationLinkAsync,
  joinGroupViaUserIdAsync,
  removeFromGroupAsync,
} from "../../redux/slices/GroupSlice";
import IsLoading from "../IsLoading";
import { toast } from "react-toastify";

const AboutGroup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const aboutGroupRedux = useSelector((state) => state.aboutGroup);
  const usersRedux = useSelector((state) => state.users);
  const groupRedux = (state) => state.group;
  const groupIdFromUseLocation = location.pathname.split("/")[3];
  const [inviteLink, setinviteLink] = useState("");

  const [aboutGroupIsLoading, setaboutGroupIsLoading] = useState(false);
  const [getAllUsersJoinedGroups, setgetAllUsersJoinedGroups] = useState([]);

  // console.log("usersRedux - ", inviteLink);

  const getGroupDetails = async () => {
    setaboutGroupIsLoading(true);
    const action = await dispatch(
      getAboutGroupByIdAsync({
        groupId: groupIdFromUseLocation,
      })
    );

    if (action.type === "aboutGroup/getById/fulfilled") {
      // console.log( "action " , action.payload.inviteLink  );
      setinviteLink(action.payload.inviteLink);
      setaboutGroupIsLoading(false);
    }
  };

  const getAllGroupMessagesUser = async () => {
    setaboutGroupIsLoading(true);
    const getAllusersAction = await dispatch(getAllGroupsJoinedUserAsync());

    if (
      getAllusersAction.type === "aboutGroup/getAllGroupsJoinedUser/fulfilled"
    ) {
      setgetAllUsersJoinedGroups(getAllusersAction.payload);
      // console.log("getAllUsersJoinedGroups - ", getAllusersAction.payload);

      setaboutGroupIsLoading(false);
    }
  };

  useEffect(() => {
    getGroupDetails();
    getAllGroupMessagesUser();
    dispatch(getAllUsersAsync());
  }, [navigate]);

  const joinGroupOnClick = async (userId) => {
    setaboutGroupIsLoading(true);
    const action = await dispatch(
      joinGroupViaUserIdAsync({
        userId: userId,
        groupId: groupIdFromUseLocation,
      })
    );

    if (action.type === "chats/joinGroupViaUserId/fulfilled") {
      // alert(action.payload);
      console.log(action.payload);
      if (action.payload.msg === "You have Joined this User") {
        toast.success(action.payload.msg);
        navigate("/groups");
      } else {
        toast.error(action.payload.msg);
      }

      setaboutGroupIsLoading(false);
    }
  };

  const removeFromGroupOnClick = async (userId) => {
    const removeAction = await dispatch(
      removeFromGroupAsync({
        userId: userId,
      })
    );

    if (removeAction.type === "chats/removeFromGroup/fulfilled") {
      toast.success(removeAction.payload.msg);
      navigate("/groups");
    }

    // console.log("removeAction - ", removeAction);
  };

  return (
    <>
      <div id="aboutGroup">
        {[aboutGroupRedux.data] &&
          [aboutGroupRedux.data].map((data, index) => {
            // setinviteLink(data.inviteLink);
            return (
              <div className="header " key={index}>
                <div className="d-flex flex-row justify-content-between mb-2">
                  <div>
                    <h6>
                      {" "}
                      <b>Group Name - </b> {data.name}{" "}
                    </h6>
                  </div>
                  <div>
                    <IsLoading isLoading={aboutGroupIsLoading} color={"#000"} />
                  </div>

                  <div>
                    <h6>
                      {" "}
                      <b>Total Users -</b> <small>{data.totalUsers}</small>{" "}
                    </h6>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <h6>
                      {" "}
                      <b>Invition Link -</b> <small>{data.inviteLink}</small>{" "}
                      <Link
                        target="_blank"
                        to={`${data.inviteLink}`}
                        className="btn btn-sm btn-primary mx-2"
                      >
                        Click Here
                      </Link>{" "}
                    </h6>
                  </div>

                  <div>
                    <h6>
                      {" "}
                      <b> Admin - </b> {data.admin_id}{" "}
                    </h6>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="body">
          <div className="row">
            <div className="col-12 ">
              <div className="box">
                <p className="text-center">List of All Users</p>

                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">S.No </th>
                      <th scope="col">Username</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersRedux.data.users &&
                      usersRedux.data.users.map((data, index) => {
                        const alreadyInGroup = getAllUsersJoinedGroups.some(
                          (group) => group.user_id === data.id
                        );
                        //  console.log("alreadyInGroup " , alreadyInGroup );
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{data.username}</td>
                            {alreadyInGroup ? (
                              <td
                                onClick={() => removeFromGroupOnClick(data.id)}
                              >
                                {" "}
                                <button className="btn btn-sm btn-danger">
                                  Remove From Group
                                </button>{" "}
                              </td>
                            ) : (
                              <td onClick={() => joinGroupOnClick(data.id)}>
                                {" "}
                                <button className="btn btn-sm btn-primary">
                                  Join In this Group
                                </button>{" "}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="col-12  col-lg-6">
              <div className="box">
                <p className="text-center">List of All Admins</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutGroup;
