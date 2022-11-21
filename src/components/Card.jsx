import React from "react";
import CallToAction from "./CallToAction";

export default function Card(props) {
  let { element, type } = props;
  let photo = element.photo
  if (Array.isArray(photo)) {
    photo = photo[0];
  }
  return (
    <div className="card_CH">
      <img
        className="img_card_CH"
        src={photo}
        alt={element.name + " picture"}
      />
      <div className="content_card_CH">
        <div className="title_card_CH">
          <h3>{element.name}</h3>
          <span>{element.continent}</span>
        </div>
        <div className="text_CH">
          <p>{props.children}</p>
        </div>
        <div className="container_btn_CH">
          <CallToAction path={"/details/" + type + "/" + element._id}>View more</CallToAction>
        </div>
      </div>
    </div>
  );
}
