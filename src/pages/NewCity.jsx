import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import InputFormSign from "../components/InputFormSign";
import apiUrl from "../url";

export default function NewCity() {
  const navigate = useNavigate();
  const name = useRef(null);
  const continent = useRef(null);
  const photo = useRef(null);
  const population = useRef(null);

  let newCity = () => {
    let newCity = {
      name: name.current.value,
      continent: continent.current.value,
      photo: photo.current.value,
      population: population.current.value,
      userId: "6370096b26cecde13c02e04c",
    };
    try {
      Swal.fire({
        title: "Do you want create this city?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#006466",
        cancelButtonColor: "#212F45",
        confirmButtonText: "Create city",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let res = await axios.post(`${apiUrl}/api/city`, newCity);
          if (res.data.success) {
            Swal.fire("Builded!", "Your city has been raised", "success").then(
              (result) => {
                if (result.isConfirmed) {
                  navigate(`/details/city/${res.data.id}`);
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
        }
      });
    } catch (error) {
      alert("Error with axios");
      console.log(error.message);
    }
  };

  return (
    <div className="body new-city">
      <div className="container">
        <div className="title">New City</div>
        <div className="content">
          <form>
            <div className="user-details">
              <InputFormSign
                type="text"
                reference={name}
                text="Enter city name"
              >
                City Name
              </InputFormSign>
              <InputFormSign
                type="text"
                reference={continent}
                text="Enter continent"
              >
                Continent
              </InputFormSign>
              <InputFormSign
                type="text"
                reference={photo}
                text="Enter photo url"
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
                />
              </div>
            </div>
            <div className="button">
              <input
                type="button"
                onClick={newCity}
                value="Register new city"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
