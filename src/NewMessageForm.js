import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const NewMessageForm = ({ name, socket }) => {
  const [formMessage, setFormMessage] = useState("");

  const handleFormSubmit = (event, formMessage) => {
    event.preventDefault();
    if (socket)
      socket.emit("sendMessage", { author: name, content: formMessage });
    setFormMessage("");
  };

  return (
    <Form onSubmit={(e) => handleFormSubmit(e, formMessage)}>
      <Form.Control
        type="text"
        placeholder="Enter Message"
        value={formMessage}
        onChange={(e) => setFormMessage(e.target.value)}
      />
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default NewMessageForm;
