import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getComments = () => axios.get(`${API_URL}/comments`);
export const addComment = (parentId, text) => axios.post(`${API_URL}/comments`, { parentId, text });
export const voteComment = (id, type) => axios.post(`${API_URL}/comments/vote`, { id, type });