import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";

const deleteShow = createAsyncThunk(
  "deleteShow",
  async (showId) => {
    const res = await axios.delete(`${apiUrl}/api/show/${showId}`);
    return { showId: res.data.showId };
  }
);

const showActions = {
  deleteShow,
};
export default showActions;
