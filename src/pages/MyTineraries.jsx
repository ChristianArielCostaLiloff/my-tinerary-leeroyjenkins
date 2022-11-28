import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Event from "../components/Event";
import NoElementsFound from "../components/NoElementsFound";
import itineraryActions from "../redux/actions/itineraryActions";
import apiUrl from "../url";
import NewItinerary from "./NewItinerary";

export default function MyTineraries() {
  const { userId } = useParams();
  let [itinerary, setItinerary] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { _id } = useSelector((store) => store.userReducer);

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
          navigate(`/itinerary`)
        );
      }
    });
  };

  const handleClickEdit = (id) => {
    navigate(`/itinerary/edit/${id}`);
  };

  return (
    <div className="base-cities">
      <NewItinerary key={"formItinerary"} />
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
          <NoElementsFound key={"NoElements"} />
        )}
      </div>
    </div>
  );
}
