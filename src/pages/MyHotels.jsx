import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import NoElementsFound from "../components/NoElementsFound";
import { useDispatch, useSelector } from "react-redux";
import hotelActions from "../redux/actions/hotelActions";
import Swal from "sweetalert2";

export default function MyHotels() {
  const navigate = useNavigate();
  const { userId } = useParams();
  let { hotelsByUserId } = useSelector((store) => store.hotelReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hotelActions.getHotelsByUserId(userId));
    // eslint-disable-next-line
  }, []);

  const handleClickDelete = (hotelId) => {
    Swal.fire({
      title: "Do you want delete this hotel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4C4C",
      cancelButtonColor: "#A4a4a4",
      confirmButtonText: "Delete hotel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(hotelActions.deleteHotel(hotelId));
      }
    });
  };

  const handleClickEdit = (id) => {
    navigate(`/hotels/edit/${id}`);
  };

  return (
    <div className="base-cities">
      <div className="card-container" id="container-card">
        {hotelsByUserId.length > 0 ? (
          hotelsByUserId.map((hotel) => (
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
