import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";
import Swal from "sweetalert2";

const getItinerary = createAsyncThunk("getItinerary", async (userId) => {
  const itineraries = await axios.get(
    `${apiUrl}/api/itinerary?userId=${userId}`
  );
  return { itineraries: itineraries.data.response };
});

const postItinerary = createAsyncThunk(
  "postItinerary",
  async (newItinerary) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
    const itineraryCreated = await axios.post(
      `${apiUrl}/api/itinerary`,
      newItinerary,
      headers
    );
    if (itineraryCreated.data.success) {
      return {
        itineraryCreated: itineraryCreated.data.response,
        success: true,
      };
    } else {
      Swal.fire(
        "Something went wrong!",
        itineraryCreated.data.message.join("<br>"),
        "error"
      );
      return { success: false };
    }
  }
);

const deleteItinerary = createAsyncThunk(
  "deleteItinerary",
  async (itineraryId) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
    const res = await axios.delete(
      `${apiUrl}/api/itinerary/${itineraryId}`,
      headers
    );
    return { itineraryId: res.data.itineraryId };
  }
);

const itineraryActions = {
  getItinerary,
  postItinerary,
  deleteItinerary,
};
export default itineraryActions;
