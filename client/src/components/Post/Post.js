import React, { useState } from "react";
import {
  Col,
  Form,
  Card,
  Button,
  ListGroup,
  ButtonGroup,
  ListGroupItem,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";

import { commentActions, postActions } from "../../redux/actions";

import Moment from "react-moment";

import "./style.css";

// const COMMENTS = [
//   {
//     id: 1,
//     body: `Loi you're such a talented developer. I hope one day I can be just like you. Hihi =)`,
//     user: {
//       name: "Charles Lee",
//       avatarUrl:
//         "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p480x480/13924881_10105599279810183_392497317459780337_n.jpg?_nc_cat=109&ccb=3&_nc_sid=7206a8&_nc_ohc=uI6aGTdf9vEAX8-Aev9&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=e8b18753cb8aa63937829afe3aa916a7&oe=6064C685",
//     },
//   },
//   {
//     id: 2,
//     body: `Thank you...`,
//     user: {
//       name: "Loi Tran",
//       avatarUrl:
//         "https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-1/14633014_10154745913714359_6100717154322258576_n.jpg?_nc_cat=105&ccb=3&_nc_sid=7206a8&_nc_ohc=PO1d3X9U7egAX9IFy1u&_nc_oc=AQlNWL-YG7EdcZYBqWlyn2vCvGxKMG6jXMOdGl-GUkRLMAxUZPnM2mMfh_mjayYJMyA&_nc_ht=scontent.fsgn5-2.fna&oh=abda95a6abf3b5883dbd6078cd8f36a3&oe=6061BFC6",
//     },
//   },
//   {
//     id: 3,
//     body: `SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented!
//     SO talented!
//     SO talented!
//     SO talented! `,
//     user: {
//       name: "Charles Lee",
//       avatarUrl:
//         "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p480x480/13924881_10105599279810183_392497317459780337_n.jpg?_nc_cat=109&ccb=3&_nc_sid=7206a8&_nc_ohc=uI6aGTdf9vEAX8-Aev9&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=e8b18753cb8aa63937829afe3aa916a7&oe=6064C685",
//     },
//   },
// ];

const Avatar = (props) => {
  return <img alt="profile" className="rounded-circle" src={props.url} />;
};

/* STEP 4 */
const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(commentActions.create(body, postId));
    setBody("");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Row>
        <Col className="d-flex">
          <Form.Control
            size="sm"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a comment..."
            className="border-0 rounded-md bg-light"
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

const Comment = ({ body, owner, comment, postId }) => {
  const commentId = comment._id;
  const [show, setShow] = useState(false);
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();

  const onToggleModal = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const onUpdateComment = (e) => {
    e.preventDefault();
    dispatch(commentActions.update(commentId, postId, newComment));
    setShow(false);
    setNewComment("");
  };

  const onDeleteComment = (e) => {
    e.preventDefault();
    dispatch(commentActions.destroy(commentId, postId));
  };
  return (
    <ListGroupItem className="justify-content-start border-bottom-0 pr-0 py-0">
      <Avatar
        url={
          owner.avatarUrl ||
          "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
        }
      />
      <div className="col">
        <div className="d-flex mb-1 ">
          <div className="comment-bubble ">
            {" "}
            <div className="font-weight-bold">{owner?.name}</div>
            <p>{body}</p>
          </div>
          <Modal
            show={show}
            dialogClassName="modal-90w"
            onHide={() => setShow(false)}
            aria-labelledby="example-custom-modal-styling-title"
            className="d-flex align-items-center justify-content-center"
          >
            <Modal.Header>
              <Modal.Title>Edit your Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={onUpdateComment}
                className="d-flex flex-column justify-content-center"
              >
                <Form.Group controlId="name">
                  <Form.Control
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    type="text"
                    placeholder="Your comment"
                  />
                </Form.Group>

                <Button
                  className="mx-auto w-50"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
          <div className="ml-auto">
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                <FontAwesomeIcon icon={faEllipsisH} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={onToggleModal}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={onDeleteComment}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </ListGroupItem>
  );
};

const PostComments = (props) => {
  return (
    <Card.Body>
      <ListGroup className="list-group-flush">
        {props.comments?.map((c, index) => (
          <Comment key={c._id} {...c} comment={c} postId={props.postId} />
        ))}
      </ListGroup>
    </Card.Body>
  );
};

// const POST_REACTIONS = [
//   { title: "Heart", icon: "heart" },
//   { title: "Angry", icon: "angry" },
//   { title: "Crying", icon: "sad-cry" },
// ];

const POST_ACTIONS = [
  { title: "Like", icon: "thumbs-up" },
  { title: "Comment", icon: "comment" },
  { title: "Share", icon: "share" },
];

const PostActionButton = ({ title, icon, postId, post }) => {
  const dispatch = useDispatch();

  const onClick = () => {
    if (title === "Like" || "Heart" || "Angry" || "Crying") {
      dispatch(postActions.createReaction(postId, title));
    }
  };

  return (
    <>
      <Button
        onClick={onClick}
        className="bg-light bg-white text-dark border-0"
      >
        {" "}
        <FontAwesomeIcon
          size="lg"
          icon={icon}
          // color="black"
          className="mr-2 action-icon"
        />
        {title}
      </Button>
    </>
  );
};

const PostActions = ({ post }) => {
  return (
    <>
      {/* <div className="reaction-button">
        <ButtonGroup aria-label="Basic example">
          {POST_REACTIONS.map((a, index) => {
            return (
              <PostActionButton
                key={a.title}
                {...a}
                postId={post._id}
                post={post}
              />
            );
          })}
        </ButtonGroup>
      </div> */}
      <ButtonGroup aria-label="Basic example">
        {POST_ACTIONS.map((a, index) => {
          return (
            <PostActionButton
              key={a.title}
              {...a}
              postId={post._id}
              post={post}
            />
          );
        })}
      </ButtonGroup>
    </>
  );
};

const PostReactions = ({ post }) => {
  return (
    <div className="d-flex justify-content-between my-2 mx-3">
      <p className="mb-0">{post.reactions.length}</p>
      <p className="mb-0">
        {post.comments.length === 0 ? "" : post.comments.length}{" "}
        {post.comments.length < 2 ? "Comment" : "Comments"}
      </p>
    </div>
  );
};

function PostHeader({ post, time }) {
  const [show, setShow] = useState(false);
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const onToggleModal = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const onUpdatePost = (e) => {
    e.preventDefault();
    dispatch(postActions.updatePost(post, body));
    setShow(false);
    setBody("");
  };

  const onDeletePost = (e) => {
    e.preventDefault();
    dispatch(postActions.deletePost(post));
  };
  return (
    <div className="d-flex p-2">
      <Avatar
        url={
          post.owner.avatarUrl ||
          "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"
        }
      />
      <div className="ml-2">
        {" "}
        <h5 className="font-weight-medium">{post.owner.name}</h5>
        <p className="time-font ">
          {" "}
          <Moment fromNow>{time}</Moment>
        </p>
      </div>
      <div className="ml-auto">
        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic">
            <FontAwesomeIcon icon={faEllipsisH} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={onToggleModal}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={onDeletePost}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Modal
          show={show}
          dialogClassName="modal-90w"
          onHide={() => setShow(false)}
          aria-labelledby="example-custom-modal-styling-title"
          className="d-flex align-items-center justify-content-center"
        >
          <Modal.Header>
            <Modal.Title>Edit your Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={onUpdatePost}
              className="d-flex flex-column justify-content-center"
            >
              <Form.Group controlId="name">
                <Form.Label>What's on your mind?</Form.Label>
                <Form.Control
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  type="text"
                  placeholder=""
                />
              </Form.Group>

              <Button className="mx-auto w-50" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default function Post({ post }) {
  return (
    <Card className="p-3 mb-3 shadow rounded-md">
      <PostHeader post={post} time={post.createdAt} />
      {post.body}
      <Card.Img
        variant="top"
        src={
          post.selectedFile
            ? post.selectedFile
            : `https://images.unsplash.com/photo-1529231812519-f0dcfdf0445f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsZW50ZWR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`
        }
      />
      <PostReactions post={post} />
      <hr className="my-1" />
      <PostActions post={post} />
      <hr className="mt-1" />
      <PostComments key={post._id} comments={post.comments} postId={post._id} />
      <CommentForm postId={post._id} />
    </Card>
  );
}
