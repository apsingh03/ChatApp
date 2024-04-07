import React, { useState } from "react";
import { FaUpload } from "react-icons/fa6";

const ImageUploadInGroupChatBox = ({ onImageSelect }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // setFile(selectedFile);
    // onImageSelect(selectedFile); // Call the function with the selected file

    if (selectedFile) {
      setFile(selectedFile);
      onImageSelect(selectedFile); // Call the function with the selected file
    } else {
      // Handle case where user canceled file selection
      console.log("No file selected");
      // You can display a message to the user or perform any other action here
    }
  };

  return (
    <>
      <label htmlFor="myfile">
        {" "}
        <FaUpload
          size={35}
          style={{
            backgroundColor: "rgba(78 , 172 , 109 ,.9)",
            padding: 5,
          }}
          color="#fff"
        />
      </label>
      <input
        type="file"
        id="myfile"
        name="myfile"
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
    </>
  );
};

export default ImageUploadInGroupChatBox;
