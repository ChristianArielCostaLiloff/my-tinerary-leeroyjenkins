import { createReducer } from "@reduxjs/toolkit";
import showActions from "../actions/showActions";

const { deleteShow } = showActions;

const initialState = {
  show: [],
};

const showReducer = createReducer(initialState, (builder) => {
  builder.addCase(deleteShow.fulfilled, (state, action) => {
    return {
      ...state,
      show: state.show.filter(
        (show) => show._id !== action.payload.showId
      ),
    };
  });
});

export default showReducer;