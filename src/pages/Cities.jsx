import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import CheckboxCities from "../components/CheckboxCities";
import NoElementsFound from "../components/NoElementsFound";
import SearchBar from "../components/SearchBar";
import cityActions from "../redux/actions/cityActions";

export default function Cities() {
  const checkboxRef = useRef([]);
  const searchRef = useRef();
  let cities = useSelector((store) => store.cityReducer.cities);
  let continents = useSelector((store) => store.cityReducer.continent);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cityActions.getCities());
  }, []);

  const handleChange = () => {
    let filters = {
      continent: checkboxRef.current
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value),
      name: searchRef.current.value,
    };
    dispatch(cityActions.getCitiesByNameAndContinent(filters));
  };

  return (
    <div className="base-cities">
      <div className="cities-nav" id="cities-nav">
        <form className="nav_form" onChange={handleChange}>
          <div className="container_checkbox">
            <div className="form_checkbox">
              <div className="checkboxes">
                <h2>Search by continent</h2>
                {continents.map((continent, index) => (
                  <CheckboxCities
                    key={index}
                    continent={continent}
                    reference={(checkbox) =>
                      (checkboxRef.current[index] = checkbox)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <SearchBar reference={searchRef} />
        </form>
      </div>
      <div className="card-container" id="container-card">
        {cities.length > 0 ? (
          cities.map((city) => (
            <Card type="city" element={city} key={city._id}>
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
