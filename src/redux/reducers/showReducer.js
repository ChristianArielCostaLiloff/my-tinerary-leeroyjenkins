import { createReducer } from "@reduxjs/toolkit";
import showActions from "../actions/showActions";

const { getShow, postShow, deleteShow } = showActions;

const initialState = {
  shows: [],
};

const showReducer = createReducer(initialState, (builder) => {
  builder.addCase(getShow.fulfilled, (state, action) => {
    return {
      ...state,
      shows: action.payload.shows,
    };
  });

  builder.addCase(postShow.fulfilled, (state, action) => {
    if (action.payload.success) {
      return {
        ...state,
        shows: [...state.shows, action.payload.showCreated],
      };
    }
  });

  builder.addCase(deleteShow.fulfilled, (state, action) => {
    return {
      ...state,
      shows: state.shows.filter(
        (show) => show._id !== action.payload.showId._id
      ),
    };
  });
});

export default showReducer;
