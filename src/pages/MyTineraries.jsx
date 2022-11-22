import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Event from "../components/Event";
import NoElementsFound from "../components/NoElementsFound";
import itineraryActions from "../redux/actions/itineraryActions";
import apiUrl from "../url";

export default function MyTineraries() {
  const { userId } = useParams();
  let [itinerary, setItinerary] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/itinerary?userId=${userId}`)
      .then((res) => {
        setItinerary(res.data.response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClickDelete = (id) => {
    Swal.fire({
      title: "Do you want delete this itinerary?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4C4C",
      cancelButtonColor: "#A4a4a4",
      confirmButtonText: "Delete itinerary",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(itineraryActions.deleteItinerary(id)).then(
          window.location.reload(true)
        );
      }
    });
  };

  const handleClickEdit = (id) => {
    window.location.href = `/itinerary/edit/${id}`;
  };

  return (
    <div className="base-cities">
      <div className="card-container" id="container-card">
        {itinerary.length > 0 ? (
          itinerary.map((e) => (
            <Event
              key={e.id}
              event={e}
              editMode={true}
              handlers={{ handleClickDelete, handleClickEdit }}
            />
          ))
        ) : (
          <NoElementsFound />
        )}
      </div>
    </div>
  );
}
