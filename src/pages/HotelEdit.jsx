import axios from "axios";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";

export default function HotelEdit() {
  const navigate = useNavigate();
  const name = useRef(null);
  const photo = useRef(null);
  const capacity = useRef(null);
  const city = useRef(null);
  const { id } = useParams();
  let [hotelDb, setHotelDb] = useState([]);
  let [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/hotel/${id}`)
      .then((res) => setHotelDb(res.data.response))
      .catch((error) => console.log(error));
    axios.get(`${apiUrl}/api/city`).then((res) => setCities(res.data.response));
    // eslint-disable-next-line
  }, []);

  const handleClick = async () => {
    let hotel = {
      name: name.current.value,
      photo: photo.current.value,
      capacity: capacity.current.value,
      cityId: city.current.value,
    };
    let token = JSON.parse(localStorage.getItem("token"));
    let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
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
              <div className="input-box">
                <span className="details">City</span>
                <select ref={city} className="select-new">
                  <option defaultValue> Select city </option>
                  {cities.map((city) => (
                    <option value={city._id} key={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
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
