import { createReducer } from "@reduxjs/toolkit";
import itineraryActions from "../actions/itineraryActions";

const { deleteItinerary } = itineraryActions;

const initialState = {
  itineraries: [],
};

const itineraryReducer = createReducer(initialState, (builder) => {
  builder.addCase(deleteItinerary.fulfilled, (state, action) => {
    return {
      ...state,
      cities: state.itineraries.filter(
        (itinerary) => itinerary._id !== action.payload.itineraryId
      ),
    };
  });
});

export default itineraryReducer;