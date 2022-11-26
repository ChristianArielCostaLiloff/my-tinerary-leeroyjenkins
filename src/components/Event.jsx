import React from "react";

export default function Event(props) {
  let { event, editMode, handlers } = props;
  if (Array.isArray(event.photo)) {
    event.photo = event.photo[0];
  }
  return (
    <div>
      <div className="container_card_IS">
        <div className="card_IS">
          {editMode && (
            <div className="container_img_admin">
              <button
                className="img_delete btn-event-delete"
                onClick={() => {
                  handlers.handleClickDelete(event._id);
                }}
              >
                <div className="editMode-img-container background-delete" />
              </button>
              <button
                className="img_edit btn-event-edit"
                onClick={() => {
                  handlers.handleClickEdit(event._id);
                }}
              >
                <div className="editMode-img-container background-edit" />
              </button>
            </div>
          )}
          <figure>
            <img src={event.photo} alt={event.name + " picture"} />
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
