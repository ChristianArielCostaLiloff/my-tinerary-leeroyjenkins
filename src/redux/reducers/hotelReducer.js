import { createReducer } from "@reduxjs/toolkit";
import hotelActions from "../actions/hotelActions";

const { getHotels, getHotelsByNameAndSorted, deleteHotel } = hotelActions;

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

  builder.addCase(deleteHotel.fulfilled, (state, action) => {
    return {
      ...state,
      hotels: state.hotels.filter((hotel) => hotel._id !== action.payload.hotelId),
    };
  });
});

export default hotelReducer;