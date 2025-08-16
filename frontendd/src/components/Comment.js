import React, { useState } from "react";
import { addComment, voteComment } from "../api";

function Comment({ comment, refreshComments }) {
  const [replyText, setReplyText] = useState("");

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText) return;
    await addComment(comment.id, replyText);
    setReplyText("");
    refreshComments();
  };

  const handleVote = async (type) => {
    await voteComment(comment.id, type);
    refreshComments();
  };

  return (
    <div style={{ marginLeft: "20px", border: "1px solid gray", padding: "10px", marginTop: "10px" }}>
      <p>{comment.text}</p>
      <p>Score: {comment.score}</p>
      <button onClick={() => handleVote("upvote")}>Upvote</button>
      <button onClick={() => handleVote("downvote")}>Downvote</button>

      <form onSubmit={handleReply}>
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Reply..."
        />
        <button type="submit">Reply</button>
      </form>

      {comment.replies.map(rep => (
        <Comment key={rep.id} comment={rep} refreshComments={refreshComments} />
      ))}
    </div>
  );
}

export default Comment;
