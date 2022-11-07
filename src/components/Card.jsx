import React from "react";
import CallToAction from "./CallToAction";

export default function Card(props) {
  let { city } = props;
  return (
    <div className="card_CH">
      <img
        className="img_card_CH"
        src={city.photo}
        alt={city.name + " picture"}
      />
      <div className="content_card_CH">
        <div className="title_card_CH">
          <h3>{city.name}</h3>
          <span>{city.continent}</span>
        </div>
        <div className="text_CH">
          <p>{props.children}</p>
        </div>
        <div className="container_btn_CH">
          <CallToAction path={"/details/" + city.id}>View more</CallToAction>
        </div>
      </div>
    </div>
  );
}
