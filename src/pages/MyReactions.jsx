import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactionCard from "../components/ReactionCard";
import reactionActions from "../redux/actions/reactionActions";

export default function MyReactions() {
  const dispatch = useDispatch();
  let { reactionsByUser } = useSelector((store) => store.reactionReducer);
  let { _id } = useSelector((store) => store.userReducer);

  useEffect(() => {
    dispatch(reactionActions.addReactionByUserId(_id));
  }, []);
  
  return (
    <div className="body">
      <div className="card-container ">
        <div className="myreactions-container">
          {reactionsByUser &&
            reactionsByUser.map((reaction) => (
              <ReactionCard reaction={reaction} />
            ))}
        </div>
      </div>
    </div>
  );
}
