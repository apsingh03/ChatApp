import React from "react";
import ReactLoading from "react-loading";

const IsLoading = (props) => {
  return (
    <>
      {props.isLoading === true ? (
        <ReactLoading
          type="spinningBubbles"
          color={props.color}
          height={25}
          width={25}
        />
      ) : null}
    </>
  );
};

export default IsLoading;
