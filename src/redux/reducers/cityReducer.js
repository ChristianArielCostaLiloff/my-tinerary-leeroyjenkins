import { createReducer } from "@reduxjs/toolkit";
import cityActions from "../actions/cityActions";

const {
  getCities,
  getCitiesByUserId,
  getCitiesByNameAndContinent,
  deleteCity,
} = cityActions;

const initialState = {
  cities: [],
  continent: [],
  filter: {
    name: "",
    continent: [],
  },
  citiesByUserId: [],
};

const cityReducer = createReducer(initialState, (builder) => {
  builder.addCase(getCities.fulfilled, (state, action) => {
    return {
      ...state,
      cities: action.payload.cities,
      continent: action.payload.continent,
    };
  });

  builder.addCase(getCitiesByUserId.fulfilled, (state, action) => {
    return {
      ...state,
      citiesByUserId: action.payload.citiesByUserId,
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
      citiesByUserId: state.citiesByUserId.filter(
        (city) => city._id !== action.payload.cityId._id
      ),
    };
  });
});

export default cityReducer;
