import React from "react";
import { useDispatch } from "react-redux";
import reactionActions from "../redux/actions/reactionActions";

export default function ReactionCard({ reaction }) {
  const dispatch = useDispatch();
  
  let name, photo;
  if (reaction.itineraryId) {
    name = reaction.itineraryId.name
    photo = reaction.itineraryId.photo;
  } else {
    name = reaction.showId.name
    photo = reaction.showId.photo;
  }
  if (Array.isArray(photo)) {
    photo = photo[0];
  }

  const handleClick = () => {
    dispatch(reactionActions.deleteReaction(reaction._id));
  };

  return (
    <div className="container_fav">
      <img className="img_fav" src={photo} alt="img" />
      <div className="data_fav">
        <p className="name_fav">{name}</p>
        <div className="fav_icon">
          <p>You {reaction.name} that itinerary</p>
          <img className="img_reaction_fav" src={reaction.icon} alt="like" />
        </div>
      </div>
      <button
        className="trash_reaction_fav"
        src="/img/trash_icon.svg"
        alt="delete"
        onClick={handleClick}
      />
    </div>
  );
}
