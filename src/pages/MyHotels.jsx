import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiUrl from "../url";
import Card from "../components/Card";
import NoElementsFound from "../components/NoElementsFound";
import { useDispatch } from "react-redux";
import hotelActions from "../redux/actions/hotelActions";
import Swal from "sweetalert2";

export default function MyHotels() {
  const { userId } = useParams();
  let [hotels, setHotels] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/hotel?userId=${userId}`)
      .then((res) => {
        setHotels(res.data.response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClickDelete = (id) => {
    Swal.fire({
      title: "Do you want delete this hotel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4C4C",
      cancelButtonColor: "#A4a4a4",
      confirmButtonText: "Delete hotel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(hotelActions.deleteHotel(id)).then(window.location.reload(true));
      }
    });
  };

  const handleClickEdit = (id) => {
    window.location.href = `/hotels/edit/${id}`;
  };

  return (
    <div className="base-cities">
      <div className="card-container" id="container-card">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <Card
              type="hotel"
              element={hotel}
              key={hotel._id}
              editMode={true}
              handlers={{ handleClickDelete, handleClickEdit }}
            >
              capacity: {hotel.capacity}
            </Card>
          ))
        ) : (
          <NoElementsFound />
        )}
      </div>
    </div>
  );
}