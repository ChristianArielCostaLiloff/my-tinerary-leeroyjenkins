import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";

export default function NewShow() {
  const name = useRef(null);
  const photo = useRef(null);
  const description = useRef(null);
  const price = useRef(null);
  const date = useRef(null);
  const hotel = useRef(null);
  let [viewForm, setViewForm] = useState(false);
  let [hotels, setHotels] = useState([]);
  let { _id } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${apiUrl}/api/hotel`).then((res) => setHotels(res.data.response));
  }, []);

  const showForm = () => {
    setViewForm(!viewForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newShow = {
      hotelId: hotel.current.value,
      name: name.current.value,
      photo: photo.current.value,
      description: description.current.value,
      price: price.current.value,
      date: date.current.value,
      userId: _id,
    };
    await axios.post(`${apiUrl}/api/show`, newShow).then(() => {
      Swal.fire("Success", "Show Created", "success").then((result) => {
        if (result.isConfirmed) {
          navigate(`/shows/${_id}`)
        }
      });
    });
  };
  return (
    <div className="content-form">
      <button className="button custom-btn btn-2" onClick={showForm}>
        New Show
      </button>
      {viewForm && (
        <div className="container">
          <div className="title">New Show</div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="user-details">
                <InputFormSign type="text" reference={name}>
                  Show Name
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
                <InputFormSign type="date" reference={date}>
                  Date
                </InputFormSign>
                <div className="input-box">
                  <span className="details">Hotel</span>
                  <select ref={hotel} className="select-new">
                    <option defaultValue> Select hotel </option>
                    {hotels.map((hotel) => (
                      <option value={hotel._id} key={hotel._id}>
                        {" "}
                        {hotel.name}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="button">
                <input type="submit" value="Update show" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
