import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Event from "../components/Event";
import NoElementsFound from "../components/NoElementsFound";
import itineraryActions from "../redux/actions/itineraryActions";
import NewItinerary from "./NewItinerary";

export default function MyTineraries() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  let { itineraries } = useSelector((store) => store.itineraryReducer);

  useEffect(() => {
    dispatch(itineraryActions.getItinerary(userId));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="base-cities">
      <NewItinerary key={"formItinerary"} />
      <div className="card-container" id="container-card">
        {itineraries.length > 0 ? (
          itineraries.map((e) => (
            <Event
              key={e._id}
              event={e}
              editMode={true}
              eventType={"itinerary"}
            />
          ))
        ) : (
          <NoElementsFound key={"NoElements"} />
        )}
      </div>
    </div>
  );
}
