import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NameForm from "./NameForm";
import io from "socket.io-client";
import MessageList from "./MessageList";
import NewMessageForm from "./NewMessageForm";

const App = () => {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  // Connect to the server
  useEffect(() => {
    const PORT = process.env.PORT || 3000;
    const newSocket = io();
    newSocket.on("connect_error", (err) => {
      console.log(err);
      console.log(`connect_error due to ${err.message}`);
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  // Set up reaction to getting a new message
  useEffect(() => {
    if (!socket) return;

    // Whenever a message is sent to our socket, load it into the app
    socket.on("getMessage", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  }, [socket]);

  if (!name.length) return <NameForm setName={setName}></NameForm>;
  return (
    <div style={{ margin: "10vw" }}>
      <h1>Messages:</h1>
      <MessageList messages={messages} />
      <NewMessageForm socket={socket} name={name}></NewMessageForm>
    </div>
  );
};

export default App;
