import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";

const getHotels = createAsyncThunk("getHotels", async () => {
  const apiGet = await axios.get(`${apiUrl}/api/hotel`);
  return {
    hotels: apiGet.data.response,
  };
});

const getHotelsByNameAndSorted = createAsyncThunk(
  "getHotelsByNameAndSorted",
  async (filters) => {
    const hotelsFiltered = await axios.get(
      `${apiUrl}/api/hotel?order=${filters.sort}&name=${filters.name}`
    );
    return {
      hotels: hotelsFiltered.data.response,
      filter: filters,
    };
  }
);

const hotelActions = {
  getHotels,
  getHotelsByNameAndSorted,
};

export default hotelActions;