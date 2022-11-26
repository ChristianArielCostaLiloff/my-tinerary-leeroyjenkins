import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";

export default function ShowEdit() {
  const navigate = useNavigate();
  const name = useRef(null);
  const description = useRef(null);
  const photo = useRef(null);
  const price = useRef(null);
  const date = useRef(null);
  const { id } = useParams();
  let [showDb, setShowDb] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/show/${id}`)
      .then((res) => setShowDb(res.data.response))
      .catch((error) => console.log(error));
  });

  const handleClick = async () => {
    console.log(new Date(date.current.value));
    let show = {
      name: name.current.value,
      description: description.current.value,
      photo: photo.current.value,
      price: price.current.value,
      date: new Date(date.current.value),
      userId: "6370096b26cecde13c02e04c",
    };
    const res = await axios.patch(`${apiUrl}/api/show/${id}`, show);
    if (res.data.success) {
      Swal.fire("Success!", "Your show has been updated", "success").then(
        (result) => {
          if (result.isConfirmed) {
            navigate(`/details/hotel/${res.data.data.hotelId}`);
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
        <div className="title">Update Show</div>
        <div className="content">
          <form>
            <div className="user-details">
              <InputFormSign
                type="text"
                reference={name}
                defaultValue={showDb.name}
              >
                Show Name
              </InputFormSign>
              <InputFormSign
                type="text"
                reference={description}
                defaultValue={showDb.description}
              >
                Description
              </InputFormSign>
              <InputFormSign
                type="text"
                reference={photo}
                defaultValue={showDb.photo}
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
                  defaultValue={showDb.price}
                />
              </div>
              <div className="input-box">
                <span className="details">Date</span>
                <input
                  type="date"
                  ref={date}
                  placeholder="Enter date"
                  required
                  min="0"
                  defaultValue={showDb.date}
                />
              </div>
            </div>
            <div className="button">
              <input type="button" onClick={handleClick} value="Update show" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
