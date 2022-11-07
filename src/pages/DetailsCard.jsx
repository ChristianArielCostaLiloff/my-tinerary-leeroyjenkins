import React from "react";
import { useParams } from "react-router-dom";
import { cities as citiesData } from "../data/cities";
import { cityActivities } from "../data/cityActivities";
import Card from "../components/Card";
import Event from "../components/Event"
import NoElementsFound from "../components/NoElementsFound";
import { hotel as hotelsData } from "../data/hotels";
import { showsHotels } from "../data/showsHotels";

export default function DetailsCard() {
  let { id } = useParams();
  let city = citiesData.find((city) => city.id == id);
  let hotel = hotelsData.find((hotel) => hotel.id == id);
  let event, place;
  if (city !== undefined) {
    event = cityActivities.filter((activty) => activty.citiId == id)
    place = city
  } else {
    event = showsHotels.filter((show) => show.hotelId == id)
    place = hotel
  }



  return (
    <div className="base-cities details-page">
      <div className="detail-element">
        <Card city={place} key={place.id}>
          {place.population ? "Population: " + place.population : "Capacity: " + place.capacity}
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
