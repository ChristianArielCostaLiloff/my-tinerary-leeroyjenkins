import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";

export default function ItineraryEdit() {
  const name = useRef(null);
  const description = useRef(null);
  const photo = useRef(null);
  const price = useRef(null);
  const duration = useRef(null);
  const { id } = useParams();
  let [itineraryDb, setitineraryDb] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/itinerary/${id}`)
      .then((res) => setitineraryDb(res.data.response))
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    let itinerary = {
      name: name.current.value,
      description: description.current.value,
      photo: photo.current.value,
      price: price.current.value,
      duration: duration.current.value,
    };
    let token = JSON.parse(localStorage.getItem("token"));
    let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
    const res = await axios.put(
      `${apiUrl}/api/itinerary/${id}`,
      itinerary,
      headers
    );
    if (res.data.success) {
      Swal.fire("Success!", "Your itinerary has been updated", "success").then(
        (result) => {
          if (result.isConfirmed) {
            navigate(`/details/city/${res.data.data.cityId}`);
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
        <div className="title">Update Itinerary</div>
        <div className="content">
          <form>
            <div className="user-details">
              <InputFormSign
                type="text"
                reference={name}
                defaultValue={itineraryDb.name}
              >
                Itinerary Name
              </InputFormSign>
              <InputFormSign
                type="text"
                reference={description}
                defaultValue={itineraryDb.description}
              >
                Description
              </InputFormSign>
              <InputFormSign
                type="text"
                reference={photo}
                defaultValue={itineraryDb.photo}
              >
                Photo URL
              </InputFormSign>
              <div className="input-box">
                <span className="details">Price</span>
                <input
                  type="number"
                  ref={price}
                  placeholder="Enter price"
                  required
                  min="0"
                  defaultValue={itineraryDb.price}
                />
              </div>
              <div className="input-box">
                <span className="details">Duration</span>
                <input
                  type="number"
                  ref={duration}
                  placeholder="Enter duration"
                  required
                  min="0"
                  defaultValue={itineraryDb.duration}
                />
              </div>
            </div>
            <div className="button">
              <input
                type="button"
                onClick={handleClick}
                value="Update itinerary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
