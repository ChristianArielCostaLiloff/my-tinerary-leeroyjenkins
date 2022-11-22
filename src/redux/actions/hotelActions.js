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

const deleteHotel = createAsyncThunk("deleteHotel", async (hotelId) => {
  const res = await axios.delete(`${apiUrl}/api/hotel/${hotelId}`);
  return { hotelId: res.data.hotelId };
});

const hotelActions = {
  getHotels,
  getHotelsByNameAndSorted,
  deleteHotel
};

export default hotelActions;