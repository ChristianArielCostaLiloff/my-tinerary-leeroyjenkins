import { createReducer } from "@reduxjs/toolkit";
import commentActions from "../actions/commentActions";

const { getComments, clearComments, deleteComment, newComment } = commentActions;

const initialState = {
  comments: [],
};

const commentReducer = createReducer(initialState, (builder) => {
  builder.addCase(getComments.fulfilled, (state, action) => {
    return {
      ...state,
      comments: [...state.comments, ...action.payload.comments],
    };
  });
  builder.addCase(clearComments.fulfilled, (state, action) => {
    return { comments: action.payload.comments };
  });
  builder.addCase(deleteComment.fulfilled, (state, action) => {
    return {
      comments: state.comments.filter(
        (comment) => comment._id !== action.payload.commentDeleted._id
      ),
    };
  });
  builder.addCase(newComment.fulfilled, (state, action) => {
    return {
      comments: [...state.comments, action.payload.commentCreated],
    };
  });
});

export default commentReducer;
