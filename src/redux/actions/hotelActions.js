import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";

const getHotels = createAsyncThunk("getHotels", async () => {
  const apiGet = await axios.get(`${apiUrl}/api/hotel`);
  return {
    hotels: apiGet.data.response,
  };
});

const getHotelsByUserId = createAsyncThunk(
  "getHotelsByUserId",
  async (userId) => {
    const hotelsByUserId = await axios.get(
      `${apiUrl}/api/hotel?userId=${userId}`
    );
    return {
      hotelsByUserId: hotelsByUserId.data.response,
    };
  }
);

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
  let token = JSON.parse(localStorage.getItem("token"));
  let headers = { headers: { Authorization: `Bearer ${token.token.user}` } };
  const res = await axios.delete(`${apiUrl}/api/hotel/${hotelId}`, headers);
  return { hotelId: res.data.hotelId };
});

const hotelActions = {
  getHotels,
  getHotelsByUserId,
  getHotelsByNameAndSorted,
  deleteHotel,
};

export default hotelActions;
