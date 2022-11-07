import React from "react";
import { useParams } from "react-router-dom";
import { cities as citiesData } from "../data/cities";
import { cityActivities } from "../data/cityActivities";
import Card from "./Card";
import Event from "./Event";
import NoElementsFound from "./NoElementsFound";

export default function DetailsCard() {
  let { id } = useParams();
  let city = citiesData.find((city) => city.id == id);
  let event = cityActivities.filter((activty) => activty.citiId == id);
  console.log(event);

  return (
    <div className="base-cities details">
      <div className="detail-element">
        <Card city={city} key={city.id}>
          Population: {city.population}
        </Card>
      </div>
      <div className="detail-shows">
        {event.length > 0 ? (
          event.map((e) => <Event key={e.id} event={e} />)
        ) : (
          <NoElementsFound />
        )}
      </div>
    </div>
  );
}
