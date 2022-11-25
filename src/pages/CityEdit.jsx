import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";

export default function CityEdit() {
  const navigate = useNavigate();
  const name = useRef(null);
  const continent = useRef(null);
  const photo = useRef(null);
  const population = useRef(null);
  const { id } = useParams();
  let [cityDb, setCityDb] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/city/${id}`)
      .then((res) => setCityDb(res.data.response))
      .catch((error) => console.log(error));
  });

  const handleClick = async () => {
    let city = {
      name: name.current.value,
      continent: continent.current.value,
      photo: photo.current.value,
      population: population.current.value,
      userId: "6370096b26cecde13c02e04c",
    };
    const res = await axios.put(`${apiUrl}/api/city/${id}`, city);
    if (res.data.success) {
      Swal.fire("Success!", "Your city has been updated", "success").then(
        (result) => {
          if (result.isConfirmed) {
            navigate(`/details/city/${res.data.data._id}`);
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
                defaultValue={cityDb.name}
              >
                City Name
              </InputFormSign>
              <InputFormSign
                type="text"
                reference={continent}
                defaultValue={cityDb.continent}
              >
                Continent
              </InputFormSign>
              <InputFormSign
                type="text"
                reference={photo}
                defaultValue={cityDb.photo}
              >
                Photo URL
              </InputFormSign>
              <div className="input-box">
                <span className="details">Population</span>
                <input
                  type="number"
                  ref={population}
                  placeholder="Enter population"
                  required
                  min="0"
                  defaultValue={cityDb.population}
                />
              </div>
            </div>
            <div className="button">
              <input type="button" onClick={handleClick} value="Update city" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
