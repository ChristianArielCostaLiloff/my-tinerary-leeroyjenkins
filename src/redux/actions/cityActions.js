import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";

const getCities = createAsyncThunk("getCities", async () => {
  const apiGet = await axios.get(`${apiUrl}/api/city`);
  return {
    cities: apiGet.data.response,
    continent: [...new Set(apiGet.data.response.map((city) => city.continent))],
  };
});

const getCitiesByNameAndContinent = createAsyncThunk(
  "getCitiesByNameAndContinent",
  async (filters) => {
    const continent = filters.continent
      .map((continent) => "continent=" + continent)
      .join("&");

    const citiesFiltered = await axios.get(
      `${apiUrl}/api/city?${continent}&name=${filters.name}`
    );
    return {
      cities: citiesFiltered.data.response,
      filter: filters,
    };
  }
);

const cityActions = {
  getCities,
  getCitiesByNameAndContinent,
};

export default cityActions;
