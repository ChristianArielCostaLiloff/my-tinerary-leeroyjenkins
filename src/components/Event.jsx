import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import itineraryActions from "../redux/actions/itineraryActions";
import reactionActions from "../redux/actions/reactionActions";
import showActions from "../redux/actions/showActions";
import Reaction from "./Reaction";
import Comment from "./Comment";
import commentActions from "../redux/actions/commentActions";
import { useRef } from "react";
import axios from "axios";
import apiUrl from "../url";

export default function Event(props) {
  let { event, editMode, eventType } = props;
  let [showComments, setShowComments] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [toggleNew, setToggleNew] = useState(false)
  let commentText = useRef(null)

  let itineraryReactions = useSelector((store) =>
    store.reactionReducer.reactions.filter((reaction) =>
      reaction.itineraryId
        ? reaction.itineraryId === event._id
        : reaction.showId === event._id
    )
  );
  let comments = useSelector((store) =>
    store.commentReducer.comments.filter((comment) =>
      comment.itineraryId
        ? comment.itineraryId === event._id
        : comment.showId === event._id
    ))
  useEffect(() => {
    let data = {
      eventId: event._id,
      eventType,
    };
    dispatch(reactionActions.clearReactions());
    dispatch(reactionActions.getReactions(data));
    dispatch(commentActions.clearComments());
    dispatch(commentActions.getComments(data))
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

  const handleClickCommentToggle = () => {
    setShowComments(!showComments)
  }

  const toggleNewComment = () => {
    setToggleNew(!toggleNew)
  }

  const handleClickNewComment = async () => {
    let data = {}
    const currentDate = Date.now()
    if (eventType === "show") {
      data = {
        showId: event._id,
        comment: commentText.current.value,
        date: (new Date(currentDate))
      }
    }
    if (eventType === "itinerary") {
      data = {
        itineraryId: event._id,
        comment: commentText.current.value,
        date: (new Date(currentDate))
      }
    }
    dispatch(commentActions.newComment(data))
  }

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
              itineraryReactions.map((reaction) => (
                <Reaction reaction={reaction} eventType={eventType} />
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
                <div className="button_slide slide_down" onClick={handleClickCommentToggle}>Coments: </div>
              </div>
            </div>
          </div>
          {showComments && <div className="comment_container">
            {comments && comments.map(comment => <Comment comment={comment} />)
            }
            {!toggleNew && <button onClick={() => toggleNewComment()} className="btn-add-comment">
              +
            </button>}
            {toggleNew && <div className="container-new-comment">
              <input className="text-new-comment" type="text" ref={commentText} />
              <button onClick={() => handleClickNewComment()} className="send-new-comment">
                SEND
              </button>
            </div>}
          </div>}

        </div>
      </div>
    </div>
  );
}
