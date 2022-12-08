import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";

const getComments = createAsyncThunk("getComments", async (data) => {
  let { eventType, eventId } = data;
  const comments = await axios.get(
    `${apiUrl}/api/comment?${eventType}Id=${eventId}`
  );
  return {
    comments: comments.data.response,
  };
});

const clearComments = createAsyncThunk("clearComments", async () => {
  return { comments: [] };
});

const deleteComment = createAsyncThunk("deleteComment", async (commentId) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
  const res = await axios.delete(`${apiUrl}/api/comment/${commentId}`, headers);
  console.log(res);
  return {
    commentDeleted: res.data.res,
  };
});

const newComment = createAsyncThunk("newComment", async (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
  const res = await axios.post(`${apiUrl}/api/comment`, data, headers);
  return { 
    commentCreated: res.data.response
  }
});

const commentActions = {
  getComments,
  clearComments,
  deleteComment,
  newComment,
};

export default commentActions;
