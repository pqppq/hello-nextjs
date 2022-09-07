import { useState, useEffect, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import axios from "axios";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notificaiton;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState();

  useEffect(() => {
    setIsFetchingComments(true);
    if (showComments) {
      axios.get(`/api/comments/${eventId}`).then((response) => {
        setComments(response.data.comments);
        setIsFetchingComments(false);
      });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    axios
      .post(`/api/comments/${eventId}`, {
        ...commentData,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registerd newsletter",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
