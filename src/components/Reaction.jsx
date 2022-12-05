import React from "react";
import { useDispatch, useSelector } from "react-redux";
import reactionActions from "../redux/actions/reactionActions";

export default function Reaction({ reaction }) {
  let userId = useSelector((store) => store.userReducer._id);
  const dispatch = useDispatch();

  const handleClick = () => {
    let data = {
      name: reaction.name,
      itineraryId: reaction.itineraryId,
    };
    console.log(typeof reaction.itineraryId);
    dispatch(reactionActions.addReaction(data));
  };

  return (
    <button className="btn-reaction" onClick={handleClick}>
      <img
        id="figure-reaction"
        src={
          reaction.userId.includes(userId) ? reaction.icon : reaction.iconBack
        }
        alt={reaction.name}
      />
      <p>{reaction.quantity}</p>
    </button>
  );
}
