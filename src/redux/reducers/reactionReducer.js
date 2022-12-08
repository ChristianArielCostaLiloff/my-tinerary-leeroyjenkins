import { createReducer } from "@reduxjs/toolkit";
import reactionActions from "../actions/reactionActions";

const { getReactions, clearReactions, addReactionByUserId, deleteReaction } =
  reactionActions;

const initialState = {
  reactions: [],
  reactionsByUser: [],
};

const reactionReducer = createReducer(initialState, (builder) => {
  builder.addCase(getReactions.fulfilled, (state, action) => {
    return {
      ...state,
      reactions: [...state.reactions, ...action.payload.reactions],
    };
  });

  builder.addCase(clearReactions.fulfilled, (state, action) => {
    return { reactions: action.payload.reactions };
  });

  builder.addCase(addReactionByUserId.fulfilled, (state, action) => {
    return { ...state, reactionsByUser: action.payload.reactionsByUser };
  });

  builder.addCase(deleteReaction.fulfilled, (state, action) => {
    return {
      ...state,
      reactionsByUser: state.reactionsByUser.filter(
        (reaction) => reaction._id !== action.payload.reactionDeleted._id
      ),
    };
  });
});

export default reactionReducer;
