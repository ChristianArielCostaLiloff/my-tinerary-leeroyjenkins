import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiUrl from "../url";
import Card from "../components/Card";
import NoElementsFound from "../components/NoElementsFound";
import { useDispatch, useSelector } from "react-redux";
import cityActions from "../redux/actions/cityActions";
import Swal from "sweetalert2";

export default function MyCities() {
  const navigate = useNavigate();
  const { userId } = useParams();
  let [cities, setCities] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.userReducer);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/city?userId=${userId}`)
      .then((res) => {
        setCities(res.data.response);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClickDelete = (id) => {
    let data = {
      token: token,
      cityId: id,
    }
    Swal.fire({
      title: "Do you want delete this city?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4C4C",
      cancelButtonColor: "#A4a4a4",
      confirmButtonText: "Delete city",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cityActions.deleteCity(data)).then(navigate(0));
      }
    });
  };

  const handleClickEdit = (id) => {
    navigate(`/cities/edit/${id}`);
  };

  return (
    <div className="base-cities">
      <div className="card-container" id="container-card">
        {cities.length > 0 ? (
          cities.map((city) => (
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
