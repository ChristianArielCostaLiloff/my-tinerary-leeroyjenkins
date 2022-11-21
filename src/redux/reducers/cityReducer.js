import { createReducer } from "@reduxjs/toolkit";
import cityActions from "../actions/cityActions";

const { getCities, getCitiesByNameAndContinent } = cityActions;

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
});

export default cityReducer;
