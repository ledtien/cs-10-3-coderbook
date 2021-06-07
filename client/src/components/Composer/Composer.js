import React, { useState } from "react";
import { Card, Form, Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { postActions } from "../../redux/actions";
import FileBase from "react-file-base64";

import "./style.css";

const ComposerButton = ({ title, icon }) => {
  return (
    <Button className="d-flex justify-content-center align-items-center bg-light bg-white text-dark border-0 rounded-md">
      {" "}
      <FontAwesomeIcon icon={icon} className="mr-2" size="lg" />
      {title}
    </Button>
  );
};

export default function Composer() {
  const [body, setBody] = useState({ body: "", selectedFile: "" });
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postActions.createPost(body));
    setBody({ ...body, body: "", selectedFile: "" });
  };

  return (
    <Card className="mb-3 w-100 shadow composer-card">
      <Card.Body className="px-3 pt-3">
        {" "}
        {/* STEP 2 */}
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Control
              id="body"
              type="text"
              value={body.body}
              onChange={(e) => setBody({ ...body, body: e.target.value })}
              placeholder="What's on your mind?"
              className="border-0 rounded-md post-text"
            />{" "}
          </Form.Group>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setBody({ ...body, selectedFile: base64 })}
          />
        </Form>
      </Card.Body>
      <hr className="mt-2" />
      <ButtonGroup size="lg" className="m-2">
        <ComposerButton title="Live Video" icon="video" />
        <ComposerButton title="Photo Video" icon="photo-video" />
        <ComposerButton title="Feeling/Activity" icon="smile" />
      </ButtonGroup>
    </Card>
  );
}
