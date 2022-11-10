import React, { useEffect, useState } from "react";
import { cities } from "../data/cities.js";
import { hotel } from "../data/hotels.js";

export default function Carousel() {
  let [index, setIndex] = useState(0);
  let [idInterval, setIdInterval] = useState(0);
  let photos = [
    ...cities.map((city) => {
      return {
        name: city.name,
        photo: city.photo,
      };
    }),
    ...hotel.map((hotel) => {
      let aux;
      if (Array.isArray(hotel.photo)) {
        aux = hotel.photo[0];
      } else {
        aux = hotel.photo;
      }
      return {
        name: hotel.name,
        photo: aux,
      };
    }),
  ];

  let next = () => {
    if (index < 2) {
      setIndex(++index);
    } else {
      setIndex(0);
    }
    clearInterval(idInterval);
  };

  let back = () => {
    if (index > 0) {
      setIndex(--index);
    } else {
      setIndex(2);
    }
    clearInterval(idInterval);
  };

  useEffect(() => {
    let interval = setInterval(next, 5000);
    setIdInterval(interval);
    return clearInterval(idInterval);
  }, [index]);

  return (
    <>
      <div className="container_carouselandarrows">
        <div>
          <button onClick={back} className="btn_carousel_back">
            PREVIOUS
          </button>
        </div>
        <div>
          <div className="container_title__carousel">
            <p className="title_carousel">¡Popular MYtineraries!</p>
          </div>
          <div className="container_card">
            <div className="card">
              <figure className="container_img">
                <img className="card_img" src={photos[index].photo} alt="" />
              </figure>
              <span className="card_name">{photos[index].name}</span>
            </div>
            <div className="card">
              <figure className="container_img">
                <img
                  className="card_img"
                  src={photos[4 * 1 + index].photo}
                  alt=""
                />
              </figure>
              <span className="card_name">{photos[4 * 1 + index].name}</span>
            </div>
            <div className="card">
              <figure className="container_img">
                <img
                  className="card_img"
                  src={photos[4 * 2 + index].photo}
                  alt=""
                />
              </figure>
              <span className="card_name">{photos[4 * 2 + index].name}</span>
            </div>
            <div className="card">
              <figure className="container_img">
                <img
                  className="card_img"
                  src={photos[4 * 3 + index].photo}
                  alt=""
                />
              </figure>
              <span className="card_name">{photos[4 * 3 + index].name}</span>
            </div>
          </div>
        </div>
        <div>
          <button onClick={next} className="btn_carousel_forward">
            NEXT
          </button>
        </div>
      </div>
    </>
  );
}
