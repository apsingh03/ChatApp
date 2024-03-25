import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersRedux = useSelector((state) => state.users);

  console.log("usersRedux - ", usersRedux);

  return <div>HomePage</div>;
};

export default HomePage;
