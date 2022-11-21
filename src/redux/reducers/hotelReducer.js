import { createReducer } from "@reduxjs/toolkit";
import hotelActions from "../actions/hotelActions";

const { getHotels, getHotelsByNameAndSorted } = hotelActions;

const initialState = {
  hotels: [],
  filter: {
    name: "",
    sort: "",
  },
};

const hotelReducer = createReducer(initialState, (builder) => {
  builder.addCase(getHotels.fulfilled, (state, action) => {
    return {
      ...state,
      hotels: action.payload.hotels,
    };
  });

  builder.addCase(getHotelsByNameAndSorted.fulfilled, (state, action) => {
    return {
      ...state,
      hotels: action.payload.hotels,
      filter: action.payload.filter,
    };
  });
});

export default hotelReducer;