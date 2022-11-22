import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Event from "../components/Event";
import NoElementsFound from "../components/NoElementsFound";
import showActions from "../redux/actions/showActions";
import apiUrl from "../url";

export default function MyShows() {
  const { userId } = useParams();
  let [show, setShow] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/show?userId=${userId}`)
      .then((res) => {
        setShow(res.data.response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClickDelete = (id) => {
    Swal.fire({
      title: "Do you want delete this show?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4C4C",
      cancelButtonColor: "#A4a4a4",
      confirmButtonText: "Delete show",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(showActions.deleteShow(id)).then(
          window.location.reload(true)
        );
      }
    });
  };

  const handleClickEdit = (id) => {
    window.location.href = `/shows/edit/${id}`;
  };

  return (
    <div className="base-cities">
      <div className="card-container" id="container-card">
        {show.length > 0 ? (
          show.map((e) => (
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
