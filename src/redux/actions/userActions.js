import { createAsyncThunk } from "@reduxjs/toolkit";
import apiUrl from "../../url";
import axios from "axios";

const login = createAsyncThunk("login", async (data) => {
  await axios
    .post(`${apiUrl}/api/auth/signin`, data)
    .then((res) => {
      return {
        success: true,
        response: res.data.response,
        data: res.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        response: error.response.data.message,
      };
    });
});

const reLogin = createAsyncThunk("reLogin", async (token) => {
  let headers = { header: { Authorization: `Bearer ${token}` } };
  await axios
    .post(`${apiUrl}/api/auth/token`, null, headers)
    .then((res) => {
      return {
        success: true,
        response: {
          user: res.data.response,
          token,
        },
      };
    })
    .catch((error) => {
      return {
        success: false,
        response: error.response.data.message,
      };
    });
});

const userActions = {
    login,
    reLogin,
}

export default userActions