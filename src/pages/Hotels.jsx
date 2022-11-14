import React, { useEffect, useState, useRef } from 'react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import NoElementsFound from '../components/NoElementsFound';
import axios from 'axios';
import apiUrl from "../url";


export default function Hotels() {
  let searchBar = useRef();
  let [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/hotel`)
      .then((res) => {
        setHotels(res.data.response);
      })
      .catch((error) => console.log(error));
  }, []);

  let sortCard = () => {
    let selectSort = document.getElementById("format").value.toLowerCase();
    axios
      .get(
        `${apiUrl}/api/hotel?order=${selectSort}&name=${searchBar.current.value}`
      )
      .then((res) => setHotels(res.data.response))
      .catch((error) => console.log(error));
  };


  return (
    <>
      <div className="base-cities">
        <div className="cities-nav" id="hotels-nav">
          <form className="nav_form" onChange={sortCard}>
            <div className="select">
              <select name="format" id="format">
                <option defaultValue>Order by capacity</option>
                <option value="desc">From high to low</option>
                <option value="asc">From low to high</option>
              </select>
            </div>
            <SearchBar reference={searchBar} onChange={sortCard} />
          </form>
        </div>
        <div className="card-container">
          {hotels.length > 0 ? (
            hotels.map((hotel) => {
              return (
                <Card type='hotel' element={hotel} key={hotel.id}>
                  Capacity: {hotel.capacity}
                </Card>
              );
            })
          ) : (
            <NoElementsFound />
          )}
        </div>
      </div>
    </>
  )
}
