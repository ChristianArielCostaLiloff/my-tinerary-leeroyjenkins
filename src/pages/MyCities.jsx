import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import NoElementsFound from "../components/NoElementsFound";
import { useDispatch, useSelector } from "react-redux";
import cityActions from "../redux/actions/cityActions";
import Swal from "sweetalert2";

export default function MyCities() {
  const navigate = useNavigate();
  const { userId } = useParams();
  let { citiesByUserId } = useSelector((store) => store.cityReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cityActions.getCitiesByUserId(userId));
    // eslint-disable-next-line
  }, []);

  const handleClickDelete = (cityId) => {
    Swal.fire({
      title: "Do you want delete this city?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4C4C",
      cancelButtonColor: "#A4a4a4",
      confirmButtonText: "Delete city",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cityActions.deleteCity(cityId));
      }
    });
  };

  const handleClickEdit = (id) => {
    navigate(`/cities/edit/${id}`);
  };

  return (
    <div className="base-cities">
      <div className="card-container" id="container-card">
        {citiesByUserId.length > 0 ? (
          citiesByUserId.map((city) => (
            <Card
              type="city"
              element={city}
              key={city._id}
              editMode={true}
              handlers={{ handleClickDelete, handleClickEdit }}
            >
              Population: {city.population}
            </Card>
          ))
        ) : (
          <NoElementsFound />
        )}
      </div>
    </div>
  );
}
