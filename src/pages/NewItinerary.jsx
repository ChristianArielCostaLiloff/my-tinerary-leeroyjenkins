import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";

export default function NewItinerary() {
  const name = useRef(null);
  const photo = useRef(null);
  const description = useRef(null);
  const price = useRef(null);
  const duration = useRef(null);
  const city = useRef(null);
  let [viewForm, setViewForm] = useState(false);
  let [cities, setCities] = useState([]);
  let { _id } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiUrl}/api/city`).then((res) => setCities(res.data.response));
  }, []);

  const showForm = () => {
    setViewForm(!viewForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newItinerary = {
      cityId: city.current.value,
      name: name.current.value,
      photo: photo.current.value,
      description: description.current.value,
      price: price.current.value,
      duration: duration.current.value,
      userId: _id,
    };
    await axios.post(`${apiUrl}/api/itinerary`, newItinerary).then(() => {
      Swal.fire("Success", "Itinerary Created", "success").then((result) => {
        if (result.isConfirmed) {
          navigate(`/itinerary/${_id}`)
        }
      });
    });
  };
  return (
    <div className="content-form">
      <button className="button custom-btn btn-2" onClick={showForm}>
        New Itienerary
      </button>
      {viewForm && (
        <div className="container">
          <div className="title">New Itinerary</div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="user-details">
                <InputFormSign type="text" reference={name}>
                  Itinerary Name
                </InputFormSign>
                <InputFormSign type="text" reference={photo}>
                  Photo
                </InputFormSign>
                <InputFormSign type="text" reference={description}>
                  Description
                </InputFormSign>
                <InputFormSign type="number" reference={price}>
                  Price
                </InputFormSign>
                <InputFormSign type="number" reference={duration}>
                  Duration
                </InputFormSign>
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
                <input type="submit" value="Update city" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
