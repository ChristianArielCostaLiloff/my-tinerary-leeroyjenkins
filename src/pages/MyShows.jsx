import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Event from "../components/Event";
import NoElementsFound from "../components/NoElementsFound";
import showActions from "../redux/actions/showActions";
import NewShow from "./NewShow";

export default function MyShows() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  let { shows } = useSelector((store) => store.showReducer);

  useEffect(() => {
    dispatch(showActions.getShow(userId));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="base-cities">
      <NewShow key={"formShow"} />
      <div className="card-container" id="container-card">
        {shows.length > 0 ? (
          shows.map((e) => (
            <Event key={e.id} event={e} editMode={true} eventType={"show"} />
          ))
        ) : (
          <NoElementsFound key={"NoElements"} />
        )}
      </div>
    </div>
  );
}
