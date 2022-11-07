import React from "react";
import InputFormSign from "../components/InputFormSign";

export default function NewCity() {
  let newCity = () => {
    let newCity = {
      name: document.getElementById("name").value,
      continent: document.getElementById("continent").value,
      photo: document.getElementById("photo").value,
      population: document.getElementById("population").value,
    };
    localStorage.setItem("newCity", JSON.stringify(newCity));
    window.location.reload(true);
  };
  return (
    <div className="body new-city">
      <div className="container">
        <div className="title">New City</div>
        <div className="content">
          <form>
            <div className="user-details">
              <InputFormSign type="text" id="name" text="Enter city name">
                City Name
              </InputFormSign>
              <InputFormSign type="text" id="continent" text="Enter continent">
                Continent
              </InputFormSign>
              <InputFormSign type="text" id="photo" text="Enter photo url">
                Photo URL
              </InputFormSign>
              <div className="input-box">
                <span className="details">Population</span>
                <input
                  type="number"
                  id="population"
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
