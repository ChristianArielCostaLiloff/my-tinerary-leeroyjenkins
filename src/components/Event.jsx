import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import itineraryActions from "../redux/actions/itineraryActions";
import reactionActions from "../redux/actions/reactionActions";
import showActions from "../redux/actions/showActions";
import Reaction from "./Reaction";

export default function Event(props) {
  let { event, editMode, eventType } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let itineraryReactions = useSelector((store) =>
    store.reactionReducer.reactions.find(
      (reaction) => reaction.itineraryId === event._id
    )
  );

  useEffect(() => {
    dispatch(reactionActions.clearReactions());
    dispatch(reactionActions.getReactions(event._id));
  }, []);

  const handleClickDelete = (id) => {
    Swal.fire({
      title: `Do you want delete this ${eventType}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4C4C",
      cancelButtonColor: "#A4a4a4",
      confirmButtonText: `Delete ${eventType}`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (eventType === "itinerary") {
          dispatch(itineraryActions.deleteItinerary(id));
        }
        if (eventType === "show") {
          dispatch(showActions.deleteShow(id));
        }
      }
    });
  };

  const handleClickEdit = (id) => {
    navigate(`/${eventType}/edit/${id}`);
  };

  let photo = event.photo;
  if (Array.isArray(event.photo)) {
    photo = photo[0];
  }

  return (
    <div>
      <div className="container_card_IS">
        <div className="card_IS">
          <div className="reactions-container">
            {itineraryReactions &&
              itineraryReactions.reactions.map((reaction) => (
                <Reaction reaction={reaction} />
              ))}
          </div>
          {editMode && (
            <div className="container_img_admin">
              <button
                className="img_delete btn-event-delete"
                onClick={() => {
                  handleClickDelete(event._id);
                }}
              >
                <div className="editMode-img-container background-delete" />
              </button>
              <button
                className="img_edit btn-event-edit"
                onClick={() => {
                  handleClickEdit(event._id);
                }}
              >
                <div className="editMode-img-container background-edit" />
              </button>
            </div>
          )}
          <figure>
            <img src={photo} alt={event.name + " picture"} />
          </figure>
          <div className="contain_IS">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <div className="price-button">
              <p>
                {event.duration
                  ? "Duration: " + event.duration + "h"
                  : "Date: " + event.date}
              </p>
              <p>Price ${event.price}</p>
              <div id="outer">
                <div className="button_slide slide_down">Coments: </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
