import React from "react";
import ReactLoading from "react-loading";

const IsLoading = ({ isLoading, color }) => {
  return (
    <>
      {isLoading === true ? (
        <ReactLoading
          type="spinningBubbles"
          color="#fff"
          height={25}
          width={25}
        />
      ) : null}
    </>
  );
};

export default IsLoading;
