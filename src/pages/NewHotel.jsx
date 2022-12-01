import React from "react";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";
import axios from "axios";
import { useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function NewHotel() {
  const navigate = useNavigate();
  const name = useRef(null);
  const photo = useRef(null);
  const capacity = useRef(null);
  const city = useRef(null);
  let [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/api/city`).then((res) => setCities(res.data.response));
  }, []);

  let handleSubmit = () => {
    let newHotel = {
      name: name.current.value,
      photo: photo.current.value,
      capacity: capacity.current.value,
      cityId: city.current.value,
    };
    try {
      Swal.fire({
        title: "Do you want create this hotel?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#006466",
        cancelButtonColor: "#212F45",
        confirmButtonText: "Create hotel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let token = JSON.parse(localStorage.getItem("token"));
          let headers = {
            headers: { Authorization: `Bearer ${token.token.user}` },
          };
          const res = await axios.post(`${apiUrl}/api/hotel`, newHotel, headers);
          if (res.data.success) {
            Swal.fire(
              "Builded!",
              "Your hotel has been created",
              "success"
            ).then((result) => {
              if (result.isConfirmed) {
                navigate(`/details/hotel/${res.data.id}`);
              }
            });
          } else {
            Swal.fire(
              "Something went wrong!",
              res.data.message.join("<br>"),
              "error"
            );
          }
        }
      });
    } catch (error) {
      alert("Error with axios");
      console.log(error.message);
    }
  };
  return (
    <div className="body new-hotel">
      <div className="container">
        <div className="title">New Hotel</div>
        <div className="content">
          <form>
            <div className="user-details">
              <InputFormSign
                type="text"
                reference={name}
                text="Enter hotel name"
              >
                Hotel name
              </InputFormSign>
              <InputFormSign
                type="text"
                reference={photo}
                text="Enter photo url"
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
                />
              </div>
              <div className="input-box">
                  <span className="details">City</span>
                  <select ref={city} className="select-new">
                    <option defaultValue> Select city </option>
                    {cities.map((city) => (
                      <option value={city._id} key={city._id}>
                        {" "}
                        {city.name}{" "}
                      </option>
                    ))}
                  </select>
                </div>
            </div>
            <div className="button">
              <input
                type="button"
                onClick={handleSubmit}
                value="Register new hotel"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
