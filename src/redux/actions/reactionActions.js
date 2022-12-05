import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";
import { Action } from "@remix-run/router";

const getReactions = createAsyncThunk("getReactions", async (itineraryId) => {
  const reactionsGet = await axios.get(
    `${apiUrl}/api/reaction?itineraryId=${itineraryId}`
  );
  return {
    itineraryId: itineraryId,
    reactions: reactionsGet.data.response,
  };
});

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
    console.log(reactionPut);
    return { reaction: reactionPut.data.reaction, itineraryId };
  }
);

const reactionActions = { getReactions, clearReactions, addReaction };

export default reactionActions;
