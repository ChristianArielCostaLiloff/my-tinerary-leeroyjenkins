import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Event from "../components/Event";
import NoElementsFound from "../components/NoElementsFound";
import { useEffect } from "react";
import axios from "axios";
import apiUrl from "../url";
import { useState } from "react";

export default function DetailsCard() {
  let { id, type } = useParams();
  let [place, setPlace] = useState([]);
  let [event, setEvent] = useState([]);

  useEffect(() => {
    if (type === 'hotel') {
      axios
        .get(`${apiUrl}/api/hotel/${id}`)
        .then((res) => setPlace(res.data.response))
        .catch((error) => console.log(error));
      axios
        .get(`${apiUrl}/api/show?hotelId=${id}`)
        .then((res) => setEvent(res.data.response))
        .catch((error) => console.log(error));
    }
    if (type === 'city') {
      axios
        .get(`${apiUrl}/api/city/${id}`)
        .then((res) => setPlace(res.data.response))
        .catch((error) => console.log(error));
      axios
        .get(`${apiUrl}/api/itinerary/?cityId=${id}`)
        .then((res) => setEvent(res.data.response))
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className="base-cities details-page">
      <div className="detail-element">
        <Card element={place} key={place.id}>
          {place.population
            ? "Population: " + place.population
            : "Capacity: " + place.capacity}
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