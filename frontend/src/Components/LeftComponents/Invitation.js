import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { joinGroupViaInvitationLinkAsync } from "../../redux/slices/GroupSlice";

const Invitation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groupRedux = (state) => state.group;

  const joinInvitation = async () => {
    const groupInviteUrl = location.pathname.split("/")[2];

    const action = await dispatch(
      joinGroupViaInvitationLinkAsync({
        inviteLink: groupInviteUrl,
      })
    );

    if (action.type === "chats/joinGroupViaInvitationLink/fulfilled") {
      alert(action.payload.msg);
      navigate("/groups");
    }
  };

  useEffect(() => {
    joinInvitation();
  }, []);

  return <></>;
};

export default Invitation;
