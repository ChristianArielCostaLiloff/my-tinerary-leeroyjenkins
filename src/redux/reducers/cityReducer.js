import { createReducer } from "@reduxjs/toolkit";
import { cities } from "../../data/cities";
import cityActions from "../actions/cityActions";

const { getCities, getCitiesByNameAndContinent, deleteCity } = cityActions;

const initialState = {
  cities: [],
  continent: [],
  filter: {
    name: "",
    continent: [],
  },
};

const cityReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCities.fulfilled, (state, action) => {
    return {
      ...state,
      cities: action.payload.cities,
      continent: action.payload.continent,
    };
  });

  builder.addCase(getCitiesByNameAndContinent.fulfilled, (state, action) => {
    return {
      ...state,
      cities: action.payload.cities,
      filter: action.payload.filter,
    };
  });

  builder.addCase(deleteCity.fulfilled, (state, action) => {
    return {
      ...state,
      cities: state.cities.filter((city) => city._id !== action.payload.cityId),
    };
  });
});

export default cityReducer;
