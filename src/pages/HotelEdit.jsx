import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";

export default function HotelEdit() {
  const navigate = useNavigate();
  const name = useRef(null);
  const photo = useRef(null);
  const capacity = useRef(null);
  const { id } = useParams();
  let [hotelDb, setHotelDb] = useState([]);
  const { token } = useSelector((store) => store.userReducer);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/hotel/${id}`)
      .then((res) => setHotelDb(res.data.response))
      .catch((error) => console.log(error));
  });

  const handleClick = async () => {
    let hotel = {
      name: name.current.value,
      photo: photo.current.value,
      capacity: capacity.current.value,
      cityId: "63701f25d10c25267b79e291",
      userId: "6370096b26cecde13c02e04c",
    };

    let headers = { headers: { Authorization: `Bearer ${token}`}}
    const res = await axios.patch(`${apiUrl}/api/hotel/${id}`, hotel, headers);

    if (res.data.success) {
      Swal.fire("Success!", "Your hotel has been updated", "success").then(
        (result) => {
          if (result.isConfirmed) {
            navigate(`/details/hotel/${res.data.data._id}`);
          }
        }
      );
    } else {
      Swal.fire(
        "Something went wrong!",
        res.data.message.join("<br>"),
        "error"
      );
    }
  };

  return (
    <div className="body new-city">
      <div className="container">
        <div className="title">Update City</div>
        <div className="content">
          <form>
            <div className="user-details">
              <InputFormSign
                type="text"
                reference={name}
                defaultValue={hotelDb.name}
              >
                Hotel Name
              </InputFormSign>
              <InputFormSign
                type="text"
                reference={photo}
                defaultValue={hotelDb.photo}
              >
                Photo URL
              </InputFormSign>
              <div className="input-box">
                <span className="details">Capacity</span>
                <input
                  type="number"
                  ref={capacity}
                  placeholder="Enter capacity"
                  required
                  min="0"
                  defaultValue={hotelDb.capacity}
                />
              </div>
            </div>
            <div className="button">
              <input type="button" onClick={handleClick} value="Update hotel" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
