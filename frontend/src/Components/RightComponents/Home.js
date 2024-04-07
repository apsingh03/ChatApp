import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";

const Home = () => {
  // const [socketId, setsocketId] = useState("");
  // const [MessagesFromSocket, setMessagesFromSocket] = useState([]);

  // let socket;

  // const BACKENDPOINT = "http://localhost:8000/";

  // useEffect(() => {
  //   socket = socketIo(BACKENDPOINT, { transports: ["websocket"] });

  //   socket.on("connect", () => {
  //     // alert("Connected with socket");.
  //     console.log("connected with socket");
  //     setsocketId(socket.id);
  //   });

  //   socket.emit("joined", " are bhai bata kjhk");

  //   socket.on("welcome", (data) => {
  //     setMessagesFromSocket([...MessagesFromSocket, ...data]);
  //     console.log(data.user, data.message);
  //   });

  //   socket.on("userJoined", (data) => {
  //        setMessagesFromSocket([...MessagesFromSocket, ...data]);
  //     console.log(data.user, data.message);
  //   });

  //   socket.on("leave", (data) => {
  //        setMessagesFromSocket([...MessagesFromSocket, ...data]);
  //     console.log(data.user, data.message);
  //   });

  //   // socket.on("message" , () => {

  //   // } )

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.on("sendMessage", (data) => {
  //     console.log(data.user, data.message, data.id);
  //   });

  //   return () => {
  //     socket.off();
  //   };
  // }, [MessagesFromSocket]);

  //   const send = () => {

  //     socket.emit("message", { message: "Loreum Ipsum", id: socketId });
  //   };

  // send();

  return (
    <div className="home">
      <h5>Welcome to Chatting Platform</h5>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur rerum
        soluta laborum vel saepe fugit velit culpa dignissimos? Perspiciatis
        velit ducimus molestiae deleniti odit, eaque sit facilis maiores aperiam
        voluptatibus
      </p>
      <button>Get Started</button>
    </div>
  );
};

export default Home;
