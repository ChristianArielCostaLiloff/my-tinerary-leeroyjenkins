import axios from "axios";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";

export default function NewReaction() {
  const name = useRef(null);
  const icon = useRef(null);
  const iconBack = useRef(null);
  const itinerary = useRef(null);
  let [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/itinerary`)
      .then((res) => setItineraries(res.data.response));
    //eslint-disable-next-line
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newReaction = {
      name: name.current.value,
      icon: icon.current.value,
      iconBack: iconBack.current.value,
      itineraryId: itinerary.current.value,
    };
    try {
      Swal.fire({
        title: "Do you want create this reaction?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#006466",
        cancelButtonColor: "#212F45",
        confirmButtonText: "Create reaaction",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let token = JSON.parse(localStorage.getItem("token"));
          let headers = {
            headers: { Authorization: `Bearer ${token.token.user}` },
          };
          const res = await axios.post(
            `${apiUrl}/api/reaction`,
            newReaction,
            headers
          );
          if (res.data.success) {
            Swal.fire("Created!", "Your reaction has been created", "success");
            event.target.reset();
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
    <div className="body new-city">
      <div className="content-form">
        <div className="container">
          <div className="title">New Itinerary</div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="user-details">
                <InputFormSign type="text" reference={name}>
                  Name
                </InputFormSign>
                <InputFormSign type="text" reference={icon}>
                  Icon
                </InputFormSign>
                <InputFormSign type="text" reference={iconBack}>
                  Icon Back
                </InputFormSign>
                <div className="input-box">
                  <span className="details">Itinerary</span>
                  <select ref={itinerary} className="select-new">
                    <option defaultValue> Select itinerary </option>
                    {itineraries.map((itinerary) => (
                      <option value={itinerary._id} key={itinerary._id}>
                        {itinerary.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="button">
                <input type="submit" value="New Itinerary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
