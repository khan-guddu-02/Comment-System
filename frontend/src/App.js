import React, { useEffect, useState } from "react";
import { getComments, addComment } from "./api";
import Comment from "./components/Comment";


function App() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchComments = async () => {
    const res = await getComments();
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!text) return;
    await addComment(null, text);
    setText("");
    fetchComments();
  };

  const sortedComments = [...comments];
  if(sortBy === "newest") sortedComments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  if(sortBy === "oldest") sortedComments.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
  if(sortBy === "mostScore") sortedComments.sort((a,b) => b.score - a.score);
  if(sortBy === "leastScore") sortedComments.sort((a,b) => a.score - b.score);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Interactive Comment Section</h1>
      
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Add</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <label>Sort by: </label>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostScore">Most Score</option>
          <option value="leastScore">Least Score</option>
        </select>
      </div>

      {sortedComments.map(c => (  
        <Comment key={c.id} comment={c} refreshComments={fetchComments} />
      ))}
    </div>
  );
}

export default App;

