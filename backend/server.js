const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let comments = []; // in-memory comments storage

// Get all comments
app.get("/api/comments", (req, res) => {
  res.json(comments);
});

// Add new comment or reply
app.post("/api/comments", (req, res) => {
  const { parentId, text } = req.body;
  const newComment = {
    id: Date.now(),
    text,
    score: 0,
    upvotes: 0,
    downvotes: 0,
    replies: [],
    createdAt: new Date()
  };

  if (parentId) {
    const addReply = (commentsList) => {
      commentsList.forEach(c => {
        if (c.id === parentId) {
          c.replies.push(newComment);
        } else {
          addReply(c.replies);
        }
      });
    };
    addReply(comments);
  } else {
    comments.push(newComment);
  }

  res.json(newComment);
});

// Upvote / Downvote
app.post("/api/comments/vote", (req, res) => {
  const { id, type } = req.body;

  const updateVote = (commentsList) => {
    commentsList.forEach(c => {
      if (c.id === id) {
        if(type === "upvote") c.upvotes += 1;
        if(type === "downvote") c.downvotes += 1;
        c.score = c.upvotes - c.downvotes;
      } else {
        updateVote(c.replies);
      }
    });
  };
  updateVote(comments);
  res.json({ message: "Vote updated" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));