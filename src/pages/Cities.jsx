import React, { useEffect } from "react";
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
  let { cities, continent, filter } = useSelector((store) => store.cityReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cities.length < 1) {
      dispatch(cityActions.getCities());
    } else {
      dispatch(cityActions.getCitiesByNameAndContinent(filter));
    }
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
                {continent.map((continent, index) => (
                  <CheckboxCities
                    key={index}
                    continent={continent}
                    reference={(checkbox) =>
                      (checkboxRef.current[index] = checkbox)
                    }
                    check={filter.continent.includes(continent)}
                  />
                ))}
              </div>
            </div>
          </div>
          <SearchBar reference={searchRef} value={filter.name} />
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
