import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Card from "../components/Card";
import CheckboxCities from "../components/CheckboxCities";
import NoElementsFound from "../components/NoElementsFound";
import SearchBar from "../components/SearchBar";
import apiUrl from "../url";

export default function Cities() {
  let searchBar = useRef();
  let [cities, setCities] = useState([]);
  let [citiesData, setCitiesData] = useState([])
  let continents;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/city`)
      .then((res) => {
        setCities(res.data.response);
        setCitiesData(res.data.response);
      })
      .catch((error) => console.log(error));
  }, []);

  continents = [...new Set(citiesData.map((city) => city.continent))];

  let sortCard = () => {
    let continentsCheck = Array.from(
      document.querySelectorAll("input[name='continent']:checked")
    )
      .map((node) => "continent=" + node.value)
      .join("&");

    axios
      .get(
        `${apiUrl}/api/city?${continentsCheck}&name=${searchBar.current.value}`
      )
      .then((res) => setCities(res.data.response));
  };

  return (
    <div className="base-cities">
      <div className="cities-nav" id="cities-nav">
        <form className="nav_form" onChange={sortCard}>
          <div className="container_checkbox">
            <div className="form_checkbox">
              <div className="checkboxes">
                <h2>Search by continent</h2>
                {continents.map((continent, index) => (
                  <CheckboxCities key={index} continent={continent} onChange={sortCard} />
                ))}
              </div>
            </div>
          </div>
          <SearchBar reference={searchBar} />
        </form>
      </div>
      <div className="card-container" id="container-card">
        {cities.length > 0 ? (
          cities.map((city) => (
            <Card element={city} key={city.id}>
              Population: {city.population}
            </Card>
          ))
        ) : (
          <NoElementsFound />
        )}
      </div>
    </div>
  );
}
