import { createReducer } from "@reduxjs/toolkit";
import hotelActions from "../actions/hotelActions";

const { getHotels, getHotelsByUserId, getHotelsByNameAndSorted, deleteHotel } =
  hotelActions;

const initialState = {
  hotels: [],
  filter: {
    name: "",
    sort: "",
  },
  hotelsByUserId: [],
};

const hotelReducer = createReducer(initialState, (builder) => {
  builder.addCase(getHotels.fulfilled, (state, action) => {
    return {
      ...state,
      hotels: action.payload.hotels,
    };
  });

  builder.addCase(getHotelsByUserId.fulfilled, (state, action) => {
    return {
      ...state,
      hotelsByUserId: action.payload.hotelsByUserId,
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
      hotelsByUserId: state.hotelsByUserId.filter(
        (hotel) => hotel._id !== action.payload.hotelId._id
      ),
    };
  });
});

export default hotelReducer;
