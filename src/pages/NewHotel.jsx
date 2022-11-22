import React from 'react'
import InputFormSign from '../components/InputFormSign'
import apiUrl from '../url';
import axios from 'axios';
import { useRef } from 'react';
import Swal from 'sweetalert2';

export default function NewHotel() {

      const name = useRef(null);
      const photo = useRef(null);
      const capacity = useRef(null);
    
      let handleSubmit = () => {
        let newHotel = {
          name: name.current.value,
          photo: photo.current.value,
          capacity: capacity.current.value,
          cityId: "63701f25d10c25267b79e294",
          userId: "6370096b26cecde13c02e04c",
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
              let res = await axios.post(`${apiUrl}/api/hotel`, newHotel);
              console.log(res);
              if (res.data.success) {
                Swal.fire("Builded!", "Your hotel has been created", "success").then(
                  (result) => {
                    if (result.isConfirmed) {
                      window.location.href =`/details/hotel/${res.data.id}`;
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
        <div className="body new-hotel">
            <div className="container">
                <div className="title">New Hotel</div>
                <div className="content">
                    <form>
                        <div className="user-details">
                            <InputFormSign type="text" reference={name} text="Enter hotel name">
                                Hotel name
                            </InputFormSign>
                            <InputFormSign type="text" reference={photo} text="Enter photo url">
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
    )
}
