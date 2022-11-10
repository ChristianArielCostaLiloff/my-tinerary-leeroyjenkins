import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CheckboxCities from "../components/CheckboxCities";
import NoElementsFound from "../components/NoElementsFound";
import SearchBar from "../components/SearchBar";
import { cities as citiesData } from "../data/cities";

export default function Cities() {
  let [cities, setCities] = useState(citiesData);
  useEffect(() => {
    let mainNavBar = document.getElementById("cities-nav");
    mainNavBar.addEventListener("input", showSortedCard);
  }, []);

  let showSortedCard = () => {
    let continent = Array.from(
      document.querySelectorAll("input[name='continent']:checked")
    ).map((node) => node.value);
    let searchText = document.getElementById("search-text").value.toLowerCase();
    let citiesSorted = cities.filter(
      (city) =>
        city.name.toLowerCase().includes(searchText) &&
        (continent.includes(city.continent.toLowerCase()) ||
          continent.length < 1)
    );
    setCities(citiesSorted);
    console.log("Filtered by: Checkbox: " + continent + " Text: " + searchText);
    localStorage.setItem(
      "filterCity",
      JSON.stringify({ text: searchText, checkbox: continent })
    );
  };

  let continents = [...new Set(citiesData.map((city) => city.continent))];

  return (
    <div className="base-cities">
      <div className="cities-nav" id="cities-nav">
        <div className="container_checkbox">
          <form action="" className="form_checkbox">
            <div className="checkboxes">
              <h2>Search by continent</h2>
              {continents.map(continent => (<CheckboxCities continent={continent}/>))}
            </div>
          </form>
        </div>
        <SearchBar/>
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
