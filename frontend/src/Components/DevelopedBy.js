import React from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DevelopedBy = (props) => {
  return (
    <div className="d-flex flex-row justify-content-center mt-3">
      <p style={{ fontSize: "18px", userSelect: "none" }}>Developed By - </p>
      <div>
        <Link
          to="https://www.linkedin.com/in/apsingh03/"
          title="Linked In"
          target="_blank"
          className="mx-3"
        >
          <FaLinkedin size={30} color={props.color} />
        </Link>
        <Link to="https://github.com/apsingh03" title="Github" target="_blank">
          <FaGithub size={30} color={props.color} />
        </Link>
      </div>
    </div>
  );
};

export default DevelopedBy;
