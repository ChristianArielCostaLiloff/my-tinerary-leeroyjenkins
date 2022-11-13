import React from "react";
import { useParams } from "react-router-dom";
import { cities as citiesData } from "../data/cities";
import { cityActivities } from "../data/cityActivities";
import Card from "../components/Card";
import Event from "../components/Event";
import NoElementsFound from "../components/NoElementsFound";
import { hotel as hotelsData } from "../data/hotels";
import { showsHotels } from "../data/showsHotels";
import { useEffect } from "react";
import axios from "axios";
import apiUrl from "../url";
import { useState } from "react";

export default function DetailsCard() {
  let { id } = useParams();
  let [place, setPlace] = useState([]);
  let [event, setEvent] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/city/${id}`)
      .then((res) => setPlace(res.data.response))
      .catch((error) => console.log(error));
    axios
      .get(`${apiUrl}/api/itinerary/?cityId=${id}`)
      .then((res) => setEvent(res.data.response))
      .catch((error) => console.log(error));
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
