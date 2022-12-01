import { createReducer } from "@reduxjs/toolkit";
import itineraryActions from "../actions/itineraryActions";

const { getItinerary, postItinerary, deleteItinerary } = itineraryActions;

const initialState = {
  itineraries: [],
};

const itineraryReducer = createReducer(initialState, (builder) => {
  builder.addCase(getItinerary.fulfilled, (state, action) => {
    return {
      ...state,
      itineraries: action.payload.itineraries,
    };
  });

  builder.addCase(postItinerary.fulfilled, (state, action) => {
    if (action.payload.success) {
      return {
        ...state,
        itineraries: [...state.itineraries, action.payload.itineraryCreated],
      };
    }
  });

  builder.addCase(deleteItinerary.fulfilled, (state, action) => {
    return {
      ...state,
      itineraries: state.itineraries.filter(
        (itinerary) => itinerary._id !== action.payload.itineraryId._id
      ),
    };
  });
});

export default itineraryReducer;
