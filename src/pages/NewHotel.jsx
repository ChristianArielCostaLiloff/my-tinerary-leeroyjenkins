import React from 'react'
import InputFormSign from '../components/InputFormSign'
import apiUrl from '../url';
import axios from 'axios';

export default function NewHotel() {
    let newHotel = () => {
        let newHotel = {
          name: document.getElementById("name").value,
          photo: document.getElementById("photo").value,
          capacity: document.getElementById("capacity").value,
          cityId: "63701f25d10c25267b79e295",
          userId: "6370096b26cecde13c02e04c",
        };
        try {
          axios.post(`${apiUrl}/api/hotel`, newHotel);
          alert("Hotel created in BD");
        } catch (error) {
          alert("Error with axios");
          console.log(error.message);
        }
        window.location.reload(true);
      };
    return (
        <div className="body new-hotel">
            <div className="container">
                <div className="title">New Hotel</div>
                <div className="content">
                    <form>
                        <div className="user-details">
                            <InputFormSign type="text" id="name" text="Enter hotel name">
                                Hotel name
                            </InputFormSign>
                            <InputFormSign type="text" id="photo" text="Enter photo url">
                                Photo URL
                            </InputFormSign>
                            <div className="input-box">
                                <span className="details">Capacity</span>
                                <input
                                    type="number"
                                    id="capacity"
                                    placeholder="Enter capacity"
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="button">
                            <input
                                type="button"
                                onClick={newHotel}
                                value="Register new hotel"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
