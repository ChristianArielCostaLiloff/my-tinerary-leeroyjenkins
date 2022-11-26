import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";

const deleteItinerary = createAsyncThunk(
  "deleteItinerary",
  async (itineraryId) => {
    const res = await axios.delete(`${apiUrl}/api/itinerary/${itineraryId}`);
    return { itineraryId: res.data.itineraryId };
  }
);

const itineraryActions = {
  deleteItinerary,
};
export default itineraryActions;
