import React from "react";
import { Card } from "react-bootstrap";

const MessageList = ({ messages }) => {
  return (
    <>
      {messages.map((message, idx) => (
        <Card key={idx} style={{ width: "80vw" }}>
          <Card.Body>
            <Card.Title>{message.author}</Card.Title>
            <Card.Text>{message.content}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default MessageList;
