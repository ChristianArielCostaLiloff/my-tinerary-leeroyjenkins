import { createReducer, current } from "@reduxjs/toolkit";
import reactionActions from "../actions/reactionActions";

const { getReactions, clearReactions, addReaction } = reactionActions;

const initialState = {
  reactions: [],
};

const reactionReducer = createReducer(initialState, (builder) => {
  builder.addCase(getReactions.fulfilled, (state, action) => {
    return {
      ...state,
      reactions: [...state.reactions, action.payload],
    };
  });
  builder.addCase(clearReactions.fulfilled, (state, action) => {
    return { reactions: action.payload.reactions };
  });
  builder.addCase(addReaction.fulfilled, (state, action) => {
    const { reaction, itineraryId } = action.payload;
    //current(state.reactions).forEach(elem=>console.log(elem))
    //console.log(state.reactions);
    console.log(current(state))
    let data = current(state.reactions).map((reactionsByItinerary) => {
      if (reactionsByItinerary.itineraryId === itineraryId) {
        reactionsByItinerary.reactions.map(react =>{
          console.log(react._id === reaction._id)
          if (react._id === reaction._id) {
            console.log(react)
            react = reaction
            console.log(react)
          }
          return react
        })
      }
      return reactionsByItinerary
    });
    console.log((data));
    return {
      ...state,
      reactions: data
    };
  });
});

export default reactionReducer;
