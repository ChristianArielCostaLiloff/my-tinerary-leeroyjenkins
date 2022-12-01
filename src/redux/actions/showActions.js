import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";
import Swal from "sweetalert2";

const getShow = createAsyncThunk("getShow", async (userId) => {
  const shows = await axios.get(`${apiUrl}/api/show?userId=${userId}`);
  return { shows: shows.data.response };
});

const postShow = createAsyncThunk("postShow", async (newShow) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
  const showCreated = await axios.post(`${apiUrl}/api/show`, newShow, headers);
  if (showCreated.data.success) {
    return {
      showCreated: showCreated.data.response,
      success: true,
    };
  } else {
    Swal.fire(
      "Something went wrong!",
      showCreated.data.message.join("<br>"),
      "error"
    );
    return { success: false };
  }
});

const deleteShow = createAsyncThunk("deleteShow", async (showId) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
  const res = await axios.delete(`${apiUrl}/api/show/${showId}`, headers);
  return { showId: res.data.showId };
});

const showActions = {
  getShow,
  postShow,
  deleteShow,
};
export default showActions;
