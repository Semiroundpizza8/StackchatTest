import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const NameForm = ({ setName }) => {
  const [nameForm, setNameForm] = useState("");

  return (
    <div
      style={{
        marginTop: "20vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Hello! Please enter your name below:</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setName(nameForm);
        }}
        style={{
          display: "flex",
          width: "40vw",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form.Control
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setNameForm(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NameForm;
