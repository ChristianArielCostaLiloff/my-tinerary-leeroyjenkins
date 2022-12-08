import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";

const getReactions = createAsyncThunk(
  "getReactions",
  async ({ eventId, eventType }) => {
    const reactionsGet = await axios.get(
      `${apiUrl}/api/reaction?${eventType}Id=${eventId}`
    );
    return {
      reactions: reactionsGet.data.response,
    };
  }
);

const clearReactions = createAsyncThunk("clearReactions", async () => {
  return { reactions: [] };
});

const addReaction = createAsyncThunk(
  "addReaction",
  async ({ name, itineraryId }) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
    const reactionPut = await axios.put(
      `${apiUrl}/api/reaction?name=${name}&itineraryId=${itineraryId}`,
      null,
      headers
    );
    return {
      reaction: reactionPut.data.reaction,
    };
  }
);

const addReactionByUserId = createAsyncThunk(
  "addReactionByUserId",
  async (userId) => {
    const reactionsGet = await axios.get(
      `${apiUrl}/api/reaction?userId=${userId}`
    );
    return { reactionsByUser: reactionsGet.data.response };
  }
);

const deleteReaction = createAsyncThunk(
  "deleteReaction",
  async (reactionId) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
    const reactionDeleted = await axios.put(
      `${apiUrl}/api/reaction/${reactionId}`,
      null,
      headers
    );
    return { reactionDeleted: reactionDeleted.data.response };
  }
);

const reactionActions = {
  getReactions,
  clearReactions,
  addReaction,
  addReactionByUserId,
  deleteReaction,
};

export default reactionActions;
