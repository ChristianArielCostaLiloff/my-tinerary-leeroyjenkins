import React from "react";

export default function Event(props) {
  let { event } = props;
  if (Array.isArray(event.photo)) {
    event.photo = event.photo[0];
  }
  return (
    <div>
      <div className="container_card_IS">
        <div className="card_IS">
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
                  : "Date: " + event.date.toDateString()}
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
